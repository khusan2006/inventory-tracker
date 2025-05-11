import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import QueryClientProvider from "@/providers/QueryClientProvider";

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
          <QueryClientProvider>
            {children}
            <Toaster position="bottom-right" />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
