"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully!");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-tiles", label: "All Tiles" },
    { href: "/my-profile", label: "My Profile" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#2C2C2C]/95 backdrop-blur-md shadow-lg"
          : "bg-[#2C2C2C]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-terracotta rounded-sm flex items-center justify-center transition-transform group-hover:rotate-12">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="9" height="9" fill="#F5EFE6" opacity="0.9"/>
                <rect x="13" y="2" width="9" height="9" fill="#C4A882" opacity="0.9"/>
                <rect x="2" y="13" width="9" height="9" fill="#C4A882" opacity="0.9"/>
                <rect x="13" y="13" width="9" height="9" fill="#F5EFE6" opacity="0.9"/>
              </svg>
            </div>
            <span className="text-cream font-heading text-xl font-bold tracking-wide">
              Tiles<span className="text-terracotta">Gallery</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-widest uppercase transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-[#C4A882] border-b border-[#C4A882] pb-0.5"
                    : "text-[#F5EFE6]/70 hover:text-[#C4A882]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {isPending ? (
              <div className="w-6 h-6 loader-ring" />
            ) : session ? (
              <div className="flex items-center gap-3">
                <Link href="/my-profile" className="flex items-center gap-2">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-clay"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center text-cream text-sm font-bold">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="hidden md:block text-cream/80 text-sm">
                    {session.user.name?.split(" ")[0]}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs uppercase tracking-wider text-cream/60 hover:text-terracotta transition-colors border border-cream/20 hover:border-terracotta px-3 py-1.5 rounded-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-xs uppercase tracking-wider bg-terracotta hover:bg-stone text-cream px-4 py-2 rounded-sm transition-colors duration-200 font-medium"
              >
                Login
              </Link>
            )}

            {/* Mobile menu */}
            <div className="md:hidden dropdown dropdown-end">
              <button tabIndex={0} className="text-cream/80 p-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#2C2C2C] border border-clay/30 rounded-box w-48 mt-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-cream/80 hover:text-clay">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
