import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import QueryClientProvider from "@/providers/QueryClientProvider";
import LanguageProvider from "@/i18n/LanguageProvider";
import AuthProvider from "@/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Auto Parts Inventory System",
  description: "Auto parts inventory management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="bg-background" lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <LanguageProvider>
              <QueryClientProvider>
                {children}
                <Toaster position="bottom-right" />
              </QueryClientProvider>
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
