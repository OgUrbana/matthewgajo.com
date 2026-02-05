import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Inter, Roboto } from "next/font/google";
import "./globals.css";
import WipNotification from "@/components/WipNotification";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matthew Gajo",
  description:
    "Builder at heart — constantly learning, solving, and shipping meaningful solutions.",
  openGraph: {
    images: ["/Hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/Hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${montserrat.variable} ${inter.variable} ${roboto.variable} ${geistSans.variable} ${geistMono.variable} antialiased font-montserrat`}
      >
        {children}
        <WipNotification />
      </body>
    </html>
  );
}
