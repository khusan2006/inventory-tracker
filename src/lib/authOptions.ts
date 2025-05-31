import { AuthOptions, User as NextAuthUser, Session as NextAuthSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient, User as PrismaAppUser } from "@/generated/prisma"; // Assuming User is exported from your generated client
import bcrypt from "bcrypt";
import { Adapter } from "next-auth/adapters";

const prisma = new PrismaClient();

// Define custom properties for User and Session
interface CustomUserProperties {
  companyId?: string;
  // id?: string; // REMOVED - id is standard on NextAuthUser and JWT
}

declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends CustomUserProperties {}
  interface Session {
    user?: NextAuthUser & CustomUserProperties;
  }
}

declare module "next-auth/jwt" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
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

        return {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name,
          companyId: dbUser.companyId,
        } as NextAuthUser;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }): Promise<JWT> {
      if (user) {
        token.id = user.id; // user.id is standard
        if (user.companyId) { 
            token.companyId = user.companyId as (string | undefined); // Explicit cast
        }
      }
      return token;
    },
    async session({ session, token }: { session: NextAuthSession; token: JWT }): Promise<NextAuthSession> {
      if (session.user) {
        if (token.id) {
            // @ts-expect-error - TSC sometimes has trouble with the augmented session.user type
            session.user.id = token.id;
        }
        if (token.companyId) {
            session.user.companyId = token.companyId as (string | undefined); // MODIFIED: removed 'as any'
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