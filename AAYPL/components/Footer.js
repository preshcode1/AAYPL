import Link from "next/link";
import { FaWhatsapp, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex flex-col items-center md:items-start">
          <img src="/aaypl-logo.png" alt="AAYPL" className="h-10 mb-2" />
          <p className="text-sm">&copy; {new Date().getFullYear()} All Africa Young Political Leaders (AAYPL)</p>
        </div>
        <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-center">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/events">Events</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="flex space-x-4">
          <a href="https://wa.me/2348012345678" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
          <a href="https://twitter.com/aaypl" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://facebook.com/aaypl" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://instagram.com/aaypl" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
      </div>
      <div className="mt-4 text-center">
        <span className="text-xs">Built with ♥ by AAYPL Dev Team</span>
      </div>
    </footer>
  );
}