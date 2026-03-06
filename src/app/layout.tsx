import type { Metadata } from "next";
import { DM_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ChatProvider } from "@/context/ChatContext";
import { CompanyPostingsProvider } from "@/context/CompanyPostingsContext";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jeevocation - Vocational Training to Skilled Employment",
  description: "Connect rural youth with SMEs who need skilled workers. Industry-aligned apprenticeship with salary and clear path to employment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${notoSansDevanagari.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <ChatProvider>
            <CompanyPostingsProvider>
              {children}
            </CompanyPostingsProvider>
          </ChatProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
