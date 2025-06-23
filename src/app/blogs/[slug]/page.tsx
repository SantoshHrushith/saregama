import Footer from "@/components/Footer";
import blogs from "@/data/blogs.json";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

type Params = Promise<{ slug: string }>;

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <>
        <div className="bg-black text-white min-h-screen">
          <div className="max-w-2xl mx-auto py-16 px-4">
            <h1 className="text-2xl font-bold mb-4">Blog not found</h1>
            <Link href="/blogs" className="text-blue-500 underline">
              Back to Blogs
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="bg-black text-white min-h-screen">
        <section className="max-w-2xl mx-auto py-16 px-4">
          <Link
            href="/blogs"
            className="text-blue-500 underline mb-4 inline-block"
          >
            ← Back to Blogs
          </Link>
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <span className="text-xs text-gray-500">{blog.date}</span>
          <div className="mt-6 text-lg space-y-4">
            {Array.isArray(blog.content) ? (
              blog.content.map((para: string, idx: number) => (
                <ReactMarkdown key={idx}>{para}</ReactMarkdown>
              ))
            ) : (
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            )}
          </div>
          {blog.images && blog.images.length > 0 && (
            <div className="mt-8 space-y-4">
              {blog.images.map((img: string, idx: number) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Blog image ${idx + 1}`}
                  className="w-full rounded shadow"
                  style={{ maxHeight: 400, objectFit: "cover" }}
                />
              ))}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}