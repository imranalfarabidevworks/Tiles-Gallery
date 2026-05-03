
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Tiles Gallery – Discover Your Perfect Aesthetic",
  description: "Browse premium tiles from around the world. Ceramic, terracotta, marble, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="tiles">
      <body className="grain min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: "'DM Sans', sans-serif",
              background: "#2C2C2C",
              color: "#F5EFE6",
              border: "1px solid #C4A882",
            },
          }}
        />
      </body>
    </html>
  );
}
