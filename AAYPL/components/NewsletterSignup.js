import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) {
      setMsg("Thank you for subscribing!");
      setEmail("");
    } else {
      setMsg("Subscription failed. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-2 mt-8">
      <input
        type="email"
        placeholder="Your email"
        className="border border-gray-300 px-3 py-2 rounded w-full md:w-auto"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button type="submit" className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded font-medium">
        Subscribe
      </button>
      {msg && <span className="text-sm mt-2 md:mt-0 md:ml-3">{msg}</span>}
    </form>
  );
}