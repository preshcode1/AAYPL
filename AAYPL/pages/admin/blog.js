import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import { slugify } from "../../lib/utils";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function isAdmin() {
  return typeof document !== "undefined" && document.cookie.includes("adminSession=true");
}

export default function AdminBlog() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title:"", author:"", category:"", thumbnail_url:"", content:"" });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (!isAdmin()) router.push("/admin/login");
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const slug = slugify(form.title);
    if (editing) {
      await supabase.from("posts").update({ ...form, slug }).eq("id", editing);
    } else {
      await supabase.from("posts").insert([{ ...form, slug }]);
    }
    setForm({ title:"", author:"", category:"", thumbnail_url:"", content:"" });
    setEditing(null);
    fetchPosts();
  }

  async function handleDelete(id) {
    if (confirm("Delete this post?")) {
      await supabase.from("posts").delete().eq("id", id);
      fetchPosts();
    }
  }

  function handleEdit(post) {
    setEditing(post.id);
    setForm(post);
  }

  return (
    <>
      <Header />
      <main className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Admin Blog Panel</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <input name="title" required placeholder="Title" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} className="border rounded p-2" />
            <input name="author" required placeholder="Author" value={form.author} onChange={e=>setForm(f=>({...f,author:e.target.value}))} className="border rounded p-2" />
            <input name="category" required placeholder="Category" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} className="border rounded p-2" />
            <input name="thumbnail_url" placeholder="Thumbnail URL" value={form.thumbnail_url} onChange={e=>setForm(f=>({...f,thumbnail_url:e.target.value}))} className="border rounded p-2" />
          </div>
          <div className="mt-4 mb-4">
            <ReactQuill value={form.content} onChange={val=>setForm(f=>({...f,content:val}))} theme="snow" />
          </div>
          <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded font-semibold mt-2">
            {editing ? "Update" : "Post"}
          </button>
          {editing && <button type="button" className="ml-4 text-red-700" onClick={()=>{setEditing(null);setForm({ title:"", author:"", category:"", thumbnail_url:"", content:"" })}}>Cancel</button>}
        </form>
        <div className="grid md:grid-cols-2 gap-4">
          {posts.map(post => (
            <div key={post.id} className="bg-gray-50 p-4 rounded shadow mb-2">
              <h3 className="font-bold text-lg">{post.title}</h3>
              <p className="text-sm">{post.author} • {post.category}</p>
              <div className="mt-2">
                <button className="text-blue-700 mr-3" onClick={() => handleEdit(post)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(post.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}