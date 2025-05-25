import NextAuth, { AuthOptions, User as NextAuthUser, Session as NextAuthSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient, User as PrismaAppUser } from "@/generated/prisma";
import bcrypt from "bcrypt";
import { Adapter } from "next-auth/adapters";

const prisma = new PrismaClient();

// Define custom properties for User and Session
interface CustomUserProperties {
  companyId?: string;
  id?: string; // next-auth User already has id, but ensuring it for session.user
}

declare module "next-auth" {
  interface User extends CustomUserProperties {}
  interface Session {
    user?: NextAuthUser & CustomUserProperties; // Combine NextAuthUser with custom props
  }
}

declare module "next-auth/jwt" {
  interface JWT extends CustomUserProperties {}
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<NextAuthUser | null> {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const dbUser: PrismaAppUser | null = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!dbUser || !dbUser.password) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          dbUser.password
        );

        if (!isValidPassword) {
          return null;
        }

        // Return an object that conforms to NextAuthUser & includes custom props
        return {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name,
          companyId: dbUser.companyId, // Custom property
        } as NextAuthUser; // next-auth will handle this correctly if types are augmented
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser /* Use base NextAuthUser here */ }): Promise<JWT> {
      // 'user' object is available on first sign-in
      if (user) {
        token.id = user.id;
        if ((user as any).companyId) { // Access companyId, cast if not directly on type
            token.companyId = (user as any).companyId;
        }
      }
      return token;
    },
    async session({ session, token }: { session: NextAuthSession; token: JWT }): Promise<NextAuthSession> {
      if (session.user) {
        if (token.id) {
            session.user.id = token.id;
        }
        if (token.companyId) {
            // Augment session.user directly here or ensure Session type includes it
            (session.user as any).companyId = token.companyId;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 