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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  openGraph: {
    title: "Pottenbakkerij de Graal | Handgemaakt Keramiek",
    description:
      "Unieke, handgedraaide keramiek uit lokale klei. Gemaakt met liefde in kleine oplages.",
    type: "website",
    locale: "nl_NL",
    siteName: "Pottenbakkerij de Graal",
    images: [
      {
        url: "/images/Logo/LogoDeGraal_v2.png",
        width: 1200,
        height: 630,
        alt: "Pottenbakkerij de Graal",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col relative`}>
        {/* Watermark Background */}
        <div 
          className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
          style={{
            backgroundImage: 'url(/images/Logo/logoheaddeGRaal.png)',
            backgroundSize: '900px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        <CartProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
