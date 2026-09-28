import type { Metadata } from "next";
import { headers } from "next/headers";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nihal Samavedam",
  description:
    "Computer Science student at UW-Madison. Research on vision-language models, plus an AI support agent and runnable API documentation from a Cyware internship.",
  authors: [{ name: "Nihal Samavedam" }],
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Opt into a per-request render so Next can stamp script nonces that match the CSP.
  await headers();
  return (
    <html lang="en">
      <body className="antialiased">
        <a href="#work" className="skip-link">
          Skip to work
        </a>
        {children}
      </body>
    </html>
  );
}
