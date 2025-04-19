import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "Create and share short links easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
