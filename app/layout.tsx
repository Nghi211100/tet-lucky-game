import type { Metadata } from "next";
import { Dancing_Script } from "next/font/google";
import "./globals.css";
const dancingScript = Dancing_Script({ subsets: ['vietnamese'], weight: '400' })

export const metadata: Metadata = {
  title: "Quay Lì Xì May Mắn",
  description: "Cùng thử may mắn bằng cách phó mặc cho thiên mệnh nào bạn ơi <3",
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
      </head>
      <body
        className={dancingScript.className}
      >
        {children}
      </body>
    </html>
  );
}
