import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Hennies Digital Menu OS",
  description:
    "Branch-specific visual digital menu system powered by Supabase and QR codes.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
