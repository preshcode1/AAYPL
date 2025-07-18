import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" }
    });
    setSent(true);
  }

  return (
    <>
      <Header />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Contact Us</h1>
        <div className="max-w-xl bg-white rounded shadow p-8 mx-auto">
          {sent ? (
            <div className="text-center text-green-700 font-semibold">Message sent! Thank you.</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input name="name" required placeholder="Your Name" value={form.name} onChange={handleChange} className="border rounded p-2 w-full mb-3" />
              <input name="email" type="email" required placeholder="Your Email" value={form.email} onChange={handleChange} className="border rounded p-2 w-full mb-3" />
              <textarea name="message" required placeholder="Your Message" value={form.message} onChange={handleChange} className="border rounded p-2 w-full mb-3" rows={4} />
              <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded font-semibold">Send</button>
            </form>
          )}
          <div className="mt-6 text-center">
            <a href="https://wa.me/2348012345678" className="text-green-600 font-bold">WhatsApp Us</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}