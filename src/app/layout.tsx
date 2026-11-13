import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const description =
  "Game designer and developer working in Unity. Commercial games on Steam, iOS and Android, plus a decade of game jams and experiments.";

export const metadata: Metadata = {
  metadataBase: new URL("https://fureli-design-homepage-lamp.vercel.app"),
  title: {
    default: "Steffen Fureli · Game Designer & Developer",
    template: "%s · Steffen Fureli",
  },
  description,
  openGraph: {
    type: "website",
    siteName: "Steffen Fureli",
    title: "Steffen Fureli · Game Designer & Developer",
    description,
    images: [{ url: "/projects/fruitbus/main.png", width: 1920, height: 1080, alt: "Fruitbus" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Steffen Fureli · Game Designer & Developer",
    description,
    images: ["/projects/fruitbus/main.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable}`}>
      <body className="min-h-screen bg-ink font-sans text-text antialiased">
        {children}
      </body>
    </html>
  );
}
