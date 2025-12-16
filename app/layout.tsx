import type { Metadata } from "next";
import { Varela_Round, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ShockCollar } from "../components/ShockCollar";

const varelaRound = Varela_Round({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-varela-round",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cowvert VPN — A lightweight, open‑source VPN",
  description:
    "A lightweight, open‑source VPN that shields your data—no unnecessary overhead, just privacy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${varelaRound.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ShockCollar
          apiKey={process.env.NEXT_PUBLIC_SHOCK_COLLAR_KEY ?? ""}
          dashboardUrl={process.env.NEXT_PUBLIC_SHOCK_COLLAR_DASHBOARD_URL ?? "https://www.shockcollar.dev"}
        />
        <div className="relative min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
