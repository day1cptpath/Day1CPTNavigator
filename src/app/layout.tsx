import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Day 1 CPT Navigator | Find Top CPT Universities & Visa Advisory",
  description: "Navigate your Day 1 CPT options seamlessly. Search partner universities, compare academic programs, and get professional assistance with student visa status modifications in the USA.",
  keywords: ["Day 1 CPT", "CPT Universities", "F1 Visa Change of Status", "OPT to CPT", "EduTech USA", "H1B to CPT"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
