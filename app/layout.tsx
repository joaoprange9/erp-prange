import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prange ERP",
  description: "Sistema de Gestão Prange",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          background: "#09090b",
          color: "white",
          margin: 0,
          fontFamily: "Arial, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}