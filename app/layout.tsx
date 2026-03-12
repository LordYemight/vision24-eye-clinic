import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const headingFont = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading" 
});

const bodyFont = Inter({ 
  subsets: ["latin"],
  variable: "--font-body" 
});

export const metadata: Metadata = {
  title: "Vision24 Eye Clinic | Clarity Engineered for Your Life",
  description: "Vision24 Eye Clinic in Lagos provides world-class ophthalmic care using cutting-edge technology and personalized service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}