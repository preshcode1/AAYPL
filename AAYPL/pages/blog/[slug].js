import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { supabase } from "../../lib/supabaseClient";

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).single();
  if (!data) return { notFound: true };
  return { props: { post: data } };
}

export default function BlogSingle({ post }) {
  return (
    <>
      <Header />
      <main className="container mx-auto py-12 px-4">
        <article className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
          <h1 className="text-3xl font-bold mb-2 text-blue-800">{post.title}</h1>
          <div className="text-gray-600 mb-4">by {post.author} • {new Date(post.created_at).toLocaleDateString()}</div>
          <img src={post.thumbnail_url || "/blog-placeholder.png"} alt={post.title} className="w-full h-60 object-cover rounded mb-4" />
          <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
      <Footer />
    </>
  );
}