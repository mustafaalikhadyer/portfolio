import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";

// Typsnitt
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

// 🚀 HÄR ÄR MAGIN FÖR LINKEDIN OCH WEBBLÄSAREN 🚀
export const metadata: Metadata = {
  title: "Mustafa Alikhadyer | Fullstack .NET Engineer",
  description: "Digital portfölj för Mustafa Alikhadyer. Fullstack-utvecklare specialiserad på skalbar .NET-arkitektur och moderna webbgränssnitt.",
  
  // Open Graph är det som skapar det stora snygga kortet på LinkedIn!
  openGraph: {
    title: "Mustafa Alikhadyer | Fullstack .NET Engineer",
    description: "Digital portfölj för Mustafa Alikhadyer. Utforska mina projekt, systemarkitektur och live-appar.",
    url: "portfolio-two-henna-uof6ovr602.vercel.app", // Byt ut när du publicerat sidan!
    siteName: "Mustafa Alikhadyer Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Denna bild skapar vi i nästa steg
        width: 1200,
        height: 630,
        alt: "Mustafa Alikhadyer - Portfolio Preview",
      },
    ],
    locale: "sv_SE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="scroll-smooth">
      <body className={`${inter.variable} ${space.variable} font-sans bg-black text-white antialiased`}>
        {/* HÄR AKTIVERAR VI SMOOTH SCROLL OVER HELA APPEN */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}