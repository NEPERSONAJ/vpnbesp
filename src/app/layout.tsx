import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SEO_CONFIG } from "@/constants/seo";
import { YandexMetrika } from "@/components/YandexMetrika";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: SEO_CONFIG.defaultTitle,
  description: SEO_CONFIG.description,
  keywords: SEO_CONFIG.keywords,
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.description,
    url: SEO_CONFIG.siteUrl,
    siteName: SEO_CONFIG.openGraph.site_name,
    locale: SEO_CONFIG.openGraph.locale,
    type: "website",
    images: SEO_CONFIG.openGraph.images,
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.description,
    creator: SEO_CONFIG.twitter.handle,
    site: SEO_CONFIG.twitter.site,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
