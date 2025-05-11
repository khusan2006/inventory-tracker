import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import QueryClientProvider from "@/providers/QueryClientProvider";
import LanguageProvider from "@/i18n/LanguageProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <QueryClientProvider>
              {children}
              <Toaster position="bottom-right" />
            </QueryClientProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
