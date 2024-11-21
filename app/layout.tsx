/* eslint-disable @next/next/no-sync-scripts */
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "@/components/ui/toast/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { siteConfig } from "config/site";

export const metadata = {
  title: siteConfig.name,
  description:siteConfig.description,
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        {children}
        <Toaster />
        <script src="https://assets.lemonsqueezy.com/lemon.js" defer></script>
      </ThemeProvider>
      </body>
    </html>
  );
}
