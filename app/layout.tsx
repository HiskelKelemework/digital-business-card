import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { card } from "@/lib/card";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roleLine = [card.person.role, card.person.company].filter(Boolean).join(" at ");

export const metadata: Metadata = {
  title: [card.person.name, card.person.company].filter(Boolean).join(" · "),
  description: `${roleLine ? `${roleLine}. ` : ""}Save the card, book a call, or text after we meet.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
