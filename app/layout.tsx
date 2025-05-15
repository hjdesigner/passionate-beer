import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../styles/styles-variables.css";
import "../styles/global.css";


const roboto = Roboto({
  variable: "--ui-font-family",
  subsets: ["latin"],
  weight: ['400', '700'],
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Passionate Beer",
  description: "Dynamic web app for beer enthusiasts to catalog and organize their growing collections easily and conveniently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
