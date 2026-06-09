import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Branch QR Menu Ordering System",
  description: "Mobile-first QR menu and table ordering MVP",
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
