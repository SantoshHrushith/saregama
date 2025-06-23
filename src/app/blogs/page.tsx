import Link from "next/link";
import blogs from "@/data/blogs.json";
import Footer from "@/components/Footer";
import Header2 from "@/components/header2";

export default function BlogsPage() {
    // Sort blogs by date descending (latest first)
    const sortedBlogs = [...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <>
            <Header2 />

            <div className="bg-black text-white min-h-screen">
                <section className="max-w-6xl mx-auto py-16 px-4">
                    <h1 className="text-4xl font-bold mb-8">Blogs</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {sortedBlogs.map((blog) => (
                            <div key={blog.id} className="bg-[#181818] rounded-lg shadow p-4 flex flex-col h-full border border-gray-800">
                                {blog.images && blog.images.length > 0 && (
                                    <img
                                        src={blog.images[0]}
                                        alt={blog.title}
                                        className="w-full h-48 object-cover rounded mb-4"
                                    />
                                )}
                                <h2 className="text-2xl font-semibold mb-2">
                                    <Link href={`/blogs/${blog.slug}`} className="hover:underline">
                                        {blog.title}
                                    </Link>
                                </h2>
                                <p className="text-gray-400 mb-2 line-clamp-3">{blog.excerpt}</p>
                                <span className="text-xs text-gray-500 mt-auto">{blog.date}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}