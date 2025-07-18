import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton({ link = "https://wa.me/2348012345678" }) {
  return (
    <a
      href={link}
      className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}