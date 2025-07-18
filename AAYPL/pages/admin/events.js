import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function isAdmin() {
  return typeof document !== "undefined" && document.cookie.includes("adminSession=true");
}

export default function AdminEvents() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title:"", description:"", location:"", date:"", image_url:"" });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (!isAdmin()) router.push("/admin/login");
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data } = await supabase.from("events").select("*").order("date", { ascending: false });
    setEvents(data || []);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editing) {
      await supabase.from("events").update(form).eq("id", editing);
    } else {
      await supabase.from("events").insert([form]);
    }
    setForm({ title:"", description:"", location:"", date:"", image_url:"" });
    setEditing(null);
    fetchEvents();
  }

  async function handleDelete(id) {
    if (confirm("Delete this event?")) {
      await supabase.from("events").delete().eq("id", id);
      fetchEvents();
    }
  }

  function handleEdit(event) {
    setEditing(event.id);
    setForm(event);
  }

  return (
    <>
      <Header />
      <main className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Manage Events</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <input name="title" required placeholder="Title" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} className="border rounded p-2" />
            <input name="location" required placeholder="Location" value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} className="border rounded p-2" />
            <input name="date" type="date" required placeholder="Date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))} className="border rounded p-2" />
            <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={e=>setForm(f=>({...f,image_url:e.target.value}))} className="border rounded p-2" />
          </div>
          <textarea name="description" required placeholder="Description" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} className="border rounded p-2 w-full my-2" rows={3} />
          <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded font-semibold mt-2">
            {editing ? "Update" : "Add Event"}
          </button>
          {editing && <button type="button" className="ml-4 text-red-700" onClick={()=>{setEditing(null);setForm({ title:"", description:"", location:"", date:"", image_url:"" })}}>Cancel</button>}
        </form>
        <div className="grid md:grid-cols-2 gap-4">
          {events.map(event => (
            <div key={event.id} className="bg-gray-50 p-4 rounded shadow mb-2">
              <h3 className="font-bold text-lg">{event.title}</h3>
              <p className="text-sm">{event.location} • {event.date}</p>
              <div className="mt-2">
                <button className="text-blue-700 mr-3" onClick={() => handleEdit(event)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(event.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}