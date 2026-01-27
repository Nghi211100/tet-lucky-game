import type { Metadata } from "next";
import { Dancing_Script } from "next/font/google";
import "./globals.css";
import RegisterSW from './providers/register-sw';
const dancingScript = Dancing_Script({ subsets: ['vietnamese'], weight: '400' })

export const metadata: Metadata = {
  title: "Quay Lì Xì May Mắn",
  description: "Cùng thử may mắn bằng cách phó mặc cho thiên mệnh nào bạn ơi <3",
  manifest: '/manifest.json',
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href='/cat-favicon.png' rel="icon" type="image/svg+xml" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Lucky Spin" />
      </head>
      <body
        className={dancingScript.className}
      >
        <RegisterSW />
        {children}
      </body>
    </html>
  );
}
