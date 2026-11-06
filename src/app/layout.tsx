import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "little tide — Poke Bowl Builder",
  description: "An interactive, build-your-own poke bowl configurator inspired by Make It Yours Playbook.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-teal-200 selection:text-teal-900 bg-[#f7f5f0]">
        {children}
      </body>
    </html>
  );
}
