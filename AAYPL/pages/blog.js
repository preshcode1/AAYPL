import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      let query = supabase.from("posts").select("*").order("created_at", { ascending: false });
      if (search) {
        query = query.ilike("title", `%${search}%`);
      }
      const { data } = await query;
      setPosts(data || []);
    }
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Blog</h1>
        <input
          className="border rounded p-2 mb-4 w-full max-w-md"
          placeholder="Search by title or category"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map(post => <BlogCard key={post.id} post={post} />)}
        </div>
      </main>
      <Footer />
    </>
  );
}