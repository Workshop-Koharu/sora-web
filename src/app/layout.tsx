import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sora (소라) — KCS 공식 디스코드 봇 & 웹 대시보드",
  description: "Koharu Coding Server 전용 차세대 Discord Components V2 기반 올인원 관리 서비스",
  icons: {
    icon: "/assets/sora-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body className="min-h-screen bg-[#0d0e10] text-[#dbdee1] antialiased selection:bg-[#5865f2] selection:text-white">
        {children}
      </body>
    </html>
  );
}
