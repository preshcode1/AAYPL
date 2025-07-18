import Header from "../components/Header";
import Footer from "../components/Footer";
import { states } from "../data/dropdownStates";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { whatsappGroups } from "../data/whatsappGroups";

export default function Register() {
  const [form, setForm] = useState({
    full_name: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    country: "Nigeria",
    state: "",
    lga: "",
    location: "",
    interest: ""
  });
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Save registration
    const { error } = await supabase.from("registrations").insert([form]);
    if (!error) {
      setSuccess(true);
      // Redirect to WhatsApp group
      const groupLink = whatsappGroups[form.state];
      if (groupLink) {
        window.location.href = groupLink;
      }
    } else {
      alert("Registration failed. Try again.");
    }
  }

  return (
    <>
      <Header />
      <main className="container mx-auto py-12 px-4">
        {success ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-blue-800">Registration Successful!</h1>
            <p className="mb-4">Thank you for joining AAYPL. You have been redirected to your WhatsApp group.</p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6 text-blue-800">Membership Registration</h1>
            <form className="max-w-2xl mx-auto bg-white rounded shadow p-8" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <input name="full_name" required placeholder="Full Name" value={form.full_name} onChange={handleChange} className="border rounded p-2" />
                <input name="dob" type="date" required placeholder="Date of Birth" value={form.dob} onChange={handleChange} className="border rounded p-2" />
                <select name="gender" required value={form.gender} onChange={handleChange} className="border rounded p-2">
                  <option value="">Gender</option><option>Male</option><option>Female</option><option>Other</option>
                </select>
                <input name="phone" required placeholder="Phone Number" value={form.phone} onChange={handleChange} className="border rounded p-2" />
                <input name="email" type="email" required placeholder="Email Address" value={form.email} onChange={handleChange} className="border rounded p-2" />
                <input name="country" required placeholder="Country" value={form.country} onChange={handleChange} className="border rounded p-2" />
                <select name="state" required value={form.state} onChange={handleChange} className="border rounded p-2">
                  <option value="">Select State</option>
                  {states.map(s => <option key={s}>{s}</option>)}
                </select>
                <input name="lga" required placeholder="Local Government Area" value={form.lga} onChange={handleChange} className="border rounded p-2" />
              </div>
              <input name="location" required placeholder="Location/Address" value={form.location} onChange={handleChange} className="border rounded p-2 w-full my-2" />
              <textarea name="interest" required placeholder="Interest in Politics" value={form.interest} onChange={handleChange} className="border rounded p-2 w-full my-2" rows={3} />
              <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded font-semibold mt-2">Register</button>
            </form>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}