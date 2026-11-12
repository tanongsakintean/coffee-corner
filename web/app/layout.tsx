import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-plex-latin",
  display: "swap",
});

const plexThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coffee Corner — สั่งเครื่องดื่มล่วงหน้า",
  description: "เลือกเครื่องดื่มแก้วโปรดและสั่งล่วงหน้ากับ Coffee Corner",
  icons: { icon: "data:," },
};

export const viewport = {
  themeColor: "#f6f3ec",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${plexSans.variable} ${plexThai.variable}`}>
      <body>{children}</body>
    </html>
  );
}
