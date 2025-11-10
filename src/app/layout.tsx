
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";

const siteConfig = {
  name: "Aramy Anahata",
  url: "https://www.aramyanahata.com.ar",
  description: "Espacio de sanación y bienestar. Terapias energéticas, lecturas intuitivas, masajes y talleres para equilibrar tu cuerpo, mente y espíritu.",
  author: "Stella",
  keywords: ["terapias holísticas", "reiki", "sanación energética", "lecturas de tarot", "masajes holísticos", "bienestar espiritual", "meditación", "cristales"],
};


export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Sanación y Bienestar`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/perfil.jpg",
        width: 600,
        height: 600,
        alt: `Perfil de ${siteConfig.author}, terapeuta en ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/perfil.jpg`],
    creator: "@aramy.anahata",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background font-sans")}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
