import type { Metadata } from "next";
import { DM_Sans, Lora, Geist_Mono } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/providers/auth-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";

import "./globals.css";

const loraHeading = Lora({ subsets: ["latin"], variable: "--font-heading" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s · ${APP_NAME}`,
  },
  description: "Support ticket management dashboard for customers and staff.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased font-sans",
        dmSans.variable,
        loraHeading.variable,
        geistMono.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>
              <TooltipProvider>
                {children}
                <Toaster />
              </TooltipProvider>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
