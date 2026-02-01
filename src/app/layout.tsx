import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PermitPatrol | Proactive STR Compliance",
  description: "The TurboTax for Short Term Rental Permits. Guard your assets from city bans.",
};

import { PortfolioProvider } from "@/context/PortfolioContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}
