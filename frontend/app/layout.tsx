import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Footer from "./(home)/_components/Footer";
import Provider from "./Provider";

export const metadata: Metadata = {
  title: {
    default: "Docify — Generate OpenAPI from Express code",
    template: "%s | Docify",
  },
  description:
    "Docify lets you paste Express code and instantly generate OpenAPI specifications. Fast, accurate, and built for developers.",
  keywords: [
    "OpenAPI generator",
    "Express to OpenAPI",
    "API documentation",
    "Docify",
    "API spec",
  ],
  openGraph: {
    title: "Docify — Generate OpenAPI from Express code",
    description:
      "Paste Express code and get OpenAPI specs instantly. Designed for developers who value speed and accuracy.",
    type: "website",
    locale: "en_US",
    url: "https://docify-anaw.vercel.app", // замени на реальный домен
    siteName: "Docify",
    images: [
      {
        url: "/logoKit.png", // подготовь картинку 1200×630 px
        width: 1200,
        height: 630,
        alt: "Docify OpenAPI Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Docify — Generate OpenAPI from Express code",
    description: "Generate OpenAPI specs from Express code in seconds.",
    images: ["/logoKit.png"],
  },
  icons: [
    {
      url: "/logoKit.png", // вместо href
      rel: "icon",
    },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

const jost = Jost({
  variable: "--font-jost",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={` ${jost.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Provider> {children}</Provider>
        <Footer />
      </body>
    </html>
  );
}
