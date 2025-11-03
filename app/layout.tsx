import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/lib/cart-context";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pottenbakkerij de Graal | Handgemaakt Keramiek",
    template: "%s | Pottenbakkerij de Graal",
  },
  description:
    "Unieke, handgedraaide keramiek uit lokale klei. Mokken, schalen, vazen en borden met ambachtelijke uitstraling. Gemaakt met liefde in kleine oplages.",
  keywords: [
    "pottenbakkerij",
    "keramiek",
    "handgemaakt",
    "lokaal",
    "ambacht",
    "handgedraaid",
    "mokken",
    "schalen",
    "vazen",
  ],
  authors: [{ name: "Pottenbakkerij de Graal" }],
  openGraph: {
    title: "Pottenbakkerij de Graal | Handgemaakt Keramiek",
    description:
      "Unieke, handgedraaide keramiek uit lokale klei. Gemaakt met liefde in kleine oplages.",
    type: "website",
    locale: "nl_NL",
    siteName: "Pottenbakkerij de Graal",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}>
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
