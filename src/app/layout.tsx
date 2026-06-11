import type { Metadata } from "next";
import { Fira_Code, Playfair_Display } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Juaquin | Dev Portfolio",
  description: "Portafolio de desarrollo de Juaquin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${firaCode.variable} ${playfairDisplay.variable}`}>
      <body>{children}</body>
    </html>
  );
}
