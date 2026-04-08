import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RouteFocusManager } from "@/components/a11y/RouteFocusManager";
import { RouteLiveAnnouncer } from "@/components/a11y/RouteLiveAnnouncer";
import { AppHeader } from "@/components/layout/AppHeader";
import { Container } from "@/components/ui/Container";
import { AppProviders } from "@/providers/AppProviders";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rick and Morty Explorer",
  description: "Next.js implementation of the Rick and Morty explorer project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AppProviders>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <RouteFocusManager />
          <RouteLiveAnnouncer />
          <AppHeader />
          <main id="main-content" tabIndex={-1}>
            <Container>{children}</Container>
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
