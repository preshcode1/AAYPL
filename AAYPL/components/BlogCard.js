import Link from "next/link";
import { formatDate } from "../lib/utils";

export default function BlogCard({ post }) {
  return (
    <div className="bg-white rounded shadow hover:shadow-lg transition p-4 flex flex-col">
      <img src={post.thumbnail_url || "/blog-placeholder.png"} alt={post.title} className="w-full h-48 object-cover rounded" />
      <div className="flex-1 flex flex-col mt-2">
        <h3 className="font-bold text-lg mb-1"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
        <div className="text-sm text-gray-600 mb-2">
          {post.author} • {formatDate(post.created_at)}
        </div>
        <p className="flex-1 text-gray-700 mb-2">{post.content.replace(/<[^>]+>/g, '').slice(0, 150)}...</p>
        <Link href={`/blog/${post.slug}`} className="text-blue-700 hover:underline font-medium">Read More</Link>
      </div>
    </div>
  );
}