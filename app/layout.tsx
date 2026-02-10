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
  title: "パブリック・ファイナンスサービス開発事業本部 - FPT Software Japan | 金融・公共DXソリューション",
  description: "FPTソフトウェアジャパン パブリック・ファイナンスサービス開発事業本部。金融・公共・Salesforce領域で19年以上の実績。45以上のシステム開発、143名のエンジニアがお客様のDXを支援します。",
  keywords: ["FPT Software", "FSG", "金融DX", "公共DX", "Salesforce", "オフショア開発"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
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
