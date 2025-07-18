import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp, FaTwitter, FaFacebook, FaInstagram, FaBars } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/aims", label: "Aims" },
  { href: "/objectives", label: "Objectives" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [menu, setMenu] = useState(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/aaypl-logo.png" alt="AAYPL Logo" className="h-10 w-10" />
          <span className="font-bold text-xl text-blue-800">AAYPL</span>
        </Link>
        <div className="hidden md:flex space-x-6 font-medium items-center">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="hover:text-blue-700">{link.label}</Link>
          ))}
          <Link href="/register" className="bg-gold-600 text-white px-5 py-2 rounded-full ml-3 hover:bg-gold-700 font-semibold shadow transition">Join Now</Link>
        </div>
        <div className="hidden md:flex space-x-3 text-blue-800">
          <a href="https://wa.me/2348012345678" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={22} /></a>
          <a href="https://twitter.com/aaypl" target="_blank" rel="noopener noreferrer"><FaTwitter size={22} /></a>
          <a href="https://facebook.com/aaypl" target="_blank" rel="noopener noreferrer"><FaFacebook size={22} /></a>
          <a href="https://instagram.com/aaypl" target="_blank" rel="noopener noreferrer"><FaInstagram size={22} /></a>
        </div>
        {/* Mobile */}
        <button className="md:hidden text-blue-800" aria-label="Open menu" onClick={() => setMenu(!menu)}>
          <FaBars size={28} />
        </button>
      </nav>
      {/* Mobile Menu */}
      {menu && (
        <div className="md:hidden bg-white px-6 pb-4 pt-2 shadow">
          <ul className="flex flex-col space-y-3 font-medium">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setMenu(false)}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/register" className="bg-gold-600 text-white px-5 py-2 rounded-full shadow hover:bg-gold-700 transition w-full inline-block text-center" onClick={() => setMenu(false)}>Join Now</Link>
            </li>
          </ul>
          <div className="flex space-x-4 mt-4 text-blue-800 justify-center">
            <a href="https://wa.me/2348012345678" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={22} /></a>
            <a href="https://twitter.com/aaypl" target="_blank" rel="noopener noreferrer"><FaTwitter size={22} /></a>
            <a href="https://facebook.com/aaypl" target="_blank" rel="noopener noreferrer"><FaFacebook size={22} /></a>
            <a href="https://instagram.com/aaypl" target="_blank" rel="noopener noreferrer"><FaInstagram size={22} /></a>
          </div>
        </div>
      )}
    </header>
  );
}