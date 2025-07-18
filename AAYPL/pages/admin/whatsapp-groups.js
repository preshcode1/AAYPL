import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { states } from "../../data/dropdownStates";

function isAdmin() {
  return typeof document !== "undefined" && document.cookie.includes("adminSession=true");
}

export default function AdminWhatsAppGroups() {
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [form, setForm] = useState({ state:"", link:"" });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (!isAdmin()) router.push("/admin/login");
    fetchGroups();
  }, []);

  async function fetchGroups() {
    const { data } = await supabase.from("whatsapp_groups").select("*").order("state");
    setGroups(data || []);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editing) {
      await supabase.from("whatsapp_groups").update(form).eq("id", editing);
    } else {
      await supabase.from("whatsapp_groups").insert([form]);
    }
    setForm({ state:"", link:"" });
    setEditing(null);
    fetchGroups();
  }

  async function handleDelete(id) {
    if (confirm("Delete this WhatsApp group?")) {
      await supabase.from("whatsapp_groups").delete().eq("id", id);
      fetchGroups();
    }
  }

  function handleEdit(group) {
    setEditing(group.id);
    setForm({ state: group.state, link: group.link });
  }

  return (
    <>
      <Header />
      <main className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Manage WhatsApp Groups</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <select name="state" required value={form.state} onChange={e=>setForm(f=>({...f,state:e.target.value}))} className="border rounded p-2">
              <option value="">Select State</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <input name="link" required placeholder="WhatsApp Group Link" value={form.link} onChange={e=>setForm(f=>({...f,link:e.target.value}))} className="border rounded p-2" />
          </div>
          <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded font-semibold mt-2">
            {editing ? "Update" : "Add Group"}
          </button>
          {editing && <button type="button" className="ml-4 text-red-700" onClick={()=>{setEditing(null);setForm({ state:"", link:"" })}}>Cancel</button>}
        </form>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="p-3 border-b text-left">State</th>
                <th className="p-3 border-b text-left">Group Link</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.map(group => (
                <tr key={group.id}>
                  <td className="p-3 border-b">{group.state}</td>
                  <td className="p-3 border-b">
                    <a href={group.link} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Open</a>
                  </td>
                  <td className="p-3 border-b">
                    <button className="text-blue-700 mr-3" onClick={() => handleEdit(group)}>Edit</button>
                    <button className="text-red-600" onClick={() => handleDelete(group.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
}