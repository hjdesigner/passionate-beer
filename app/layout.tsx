import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../styles/styles-variables.css";
import "../styles/global.css";
import { Header, Hero } from "@/components";


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
        <Header />
        <Hero />
        <main>
          {children}
        </main>        
      </body>
    </html>
  );
}
