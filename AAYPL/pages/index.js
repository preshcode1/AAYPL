import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import NewsletterSignup from "../components/NewsletterSignup";
import WhatsAppButton from "../components/WhatsAppButton";
import { supabase } from "../lib/supabaseClient";

export async function getStaticProps() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);
  return { props: { posts: posts || [] }, revalidate: 60 };
}

export default function Home({ posts }) {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mt-8 mb-12">
          <img src="/aaypl-logo.png" alt="AAYPL Logo" className="mx-auto h-24 mb-3" />
          <h1 className="text-3xl md:text-5xl font-bold text-blue-800 mb-3">All Africa Young Political Leaders</h1>
          <p className="mb-4 text-lg max-w-2xl mx-auto">
            Uniting, empowering, and amplifying Africa’s emerging political leaders for a brighter, democratic future.
          </p>
          <a href="/register" className="inline-block mt-4 px-8 py-3 bg-gold-600 text-white rounded-full font-semibold shadow hover:bg-gold-700 transition">Join Now</a>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Featured Blog Posts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map(post => <BlogCard key={post.id} post={post} />)}
          </div>
        </section>
        <NewsletterSignup />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}