import type { Metadata } from "next";
import "@fontsource/anybody/800.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nihal Samavedam",
  description:
    "CS student at UW–Madison. Vision-language model research at madAbility and the Wisconsin Institute for Discovery.",
  authors: [{ name: "Nihal Samavedam" }],
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-lime focus:px-3 focus:py-2 focus:text-ink"
        >
          Skip to work
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
