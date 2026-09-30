import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LUXURY REAL ESTATE | Premium Property Agency",
  description: "Trải nghiệm không gian sống thượng lưu. Bất động sản cao cấp, biệt thự, nhà phố và căn hộ hàng đầu.",
  openGraph: {
    title: "LUXURY REAL ESTATE | Premium Property Agency",
    description: "Trải nghiệm không gian sống thượng lưu. Bất động sản cao cấp, biệt thự, nhà phố và căn hộ hàng đầu.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} ${cormorant.variable} antialiased fluid-bg text-foreground min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
