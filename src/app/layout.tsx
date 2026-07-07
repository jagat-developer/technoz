import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { business, getSeo } from "@/lib/site-data";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const homeSeo = getSeo("home");

export const metadata: Metadata = homeSeo
  ? {
      ...buildMetadata(homeSeo),
      applicationName: business.name,
      category: "Automotive",
      authors: [{ name: business.name }],
      creator: business.name,
      publisher: business.name,
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
    }
  : {};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${cormorant.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-ink-1 text-zinc-100">
        <Header />
        <main className="min-h-screen pt-[var(--header-height)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
