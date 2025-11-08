import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "RecyCool - Student-Led Sustainability Movement",
  description: "RecyCool is a student-led sustainability movement at SMA Pradita Dirgantara, empowering 400+ community members to combat Indonesia's plastic crisis through innovative waste management and circular economy solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
