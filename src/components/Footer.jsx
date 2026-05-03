import Link from "next/link";
import { MdEmail }from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
export default function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-cream/70 pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          
          {/* Brand */}
          <div>
            <h3 className="font-heading text-cream text-xl mb-3">
              Tiles<span className="text-terracotta">Gallery</span>
            </h3>
            <p className="text-sm leading-relaxed text-cream/50">
              Curating the world&apos;s finest tiles for architects, designers, and homeowners who refuse to compromise on beauty.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-cream text-xs uppercase tracking-widest mb-4 font-medium">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/all-tiles", label: "All Tiles" },
                { href: "/my-profile", label: "My Profile" },
                { href: "/login", label: "Login" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-clay transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-cream text-xs uppercase tracking-widest mb-4 font-medium">
              Contact Us
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
          
                <span className="text-lg"><MdEmail /></span>
                <Link href="email" className="hover:text-clay transition-colors">
                  tilesgallery@gmail.com
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span> <IoCall /> </span>
                <span>+88018686-88107</span>
              </li>
              <li className="flex items-center gap-2">
                <span><FaLocationDot /></span>
                <span>chittagong,hathazari</span>
              </li>
            </ul>

          
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/30">
          <p>© {new Date().getFullYear()} TilesGallery. All rights reserved.</p>
          <p>Crafted with ♥ for beautiful interiors</p>
        </div>
      </div>
    </footer>
  );
}
