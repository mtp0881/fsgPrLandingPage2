import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import ImageOptimizer from "./components/ImageOptimizer";
import PreloadContent from "./components/PreloadContent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FSG事業部 - Finance Technology Solutions",
  description: "FPTソフトウェアジャパンの金融・公共・レガシー・Salesforce専門部門として、19年以上の実績で日本企業のDXを支援します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <PreloadContent />
          <ImageOptimizer 
            criticalImages={[
              '/images/hero-bg.png',
              '/logo.png',
              '/partners/ntt-data--600.png'
            ]}
          />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
