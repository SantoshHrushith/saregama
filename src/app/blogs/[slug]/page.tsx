import Footer from "@/components/Footer";
import Header2 from "@/components/header2";
import blogs from "@/data/blogs.json";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import styles from "./BlogDetail.module.css";

type Params = Promise<{ slug: string }>;

// export default async function Page({ params }: { params: Params }) {
//   const { slug } = await params;
//   const blog = blogs.find((b) => b.slug === slug);

//   if (!blog) {
//     return (
//       <>
//         <Header2 />
//         <div className="bg-black text-white min-h-screen">
//           <div className="max-w-2xl mx-auto py-16 px-4">
//             <h1 className="text-2xl font-bold mb-4">Blog not found</h1>
//             <Link href="/blogs" className="text-blue-500 underline">
//               Back to Blogs
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Header2 />
//       <div className="bg-black text-white min-h-screen">
//         <section className="max-w-2xl mx-auto py-16 px-4">
//           <Link
//             href="/blogs"
//             className="text-blue-500 underline mb-4 inline-block"
//           >
//             ← Back to Blogs
//           </Link>
//           <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
//           <span className="text-xs text-gray-500">{blog.date}</span>
//           <div className="mt-6 text-lg space-y-4">
//             {Array.isArray(blog.content) ? (
//               blog.content.map((para: string, idx: number) => (
//                 <ReactMarkdown key={idx}>{para}</ReactMarkdown>
//               ))
//             ) : (
//               <ReactMarkdown>{blog.content}</ReactMarkdown>
//             )}
//           </div>
//           {blog.images && blog.images.length > 0 && (
//             <div className="mt-8 space-y-4">
//               {blog.images.map((img: string, idx: number) => (
//                 <img
//                   key={idx}
//                   src={img}
//                   alt={`Blog image ${idx + 1}`}
//                   className="w-full rounded shadow"
//                   style={{ maxHeight: 400, objectFit: "cover" }}
//                 />
//               ))}
//             </div>
//           )}
//         </section>
//       </div>
//       <Footer />
//     </>
//   );
// }


export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  const publisher = "Saga Team";

  const relatedBlogs = blogs
    .filter((b) => b.slug !== slug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  if (!blog) {
    return (
      <>
        <Header2 />
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
      <Header2 />
      <div className="bg-black text-white pt-5 min-h-screen">
        <section className="w-full py-16 px-4">
          {/* Title row with back button */}
          <div className={styles.blogTitleRow}>
            <Link
              href="/blogs"
              className={styles.backButton}
              aria-label="Back to Blogs"
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="block"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </Link>
            <h1 className={styles.blogTitle}>{blog.title}</h1>
          </div>
          {/* Caption */}
          <div className={styles.blogCaption}>{blog.excerpt}</div>
          {/* Publisher and date */}
          <div className={styles.blogMeta}>
            {publisher} &middot; {new Date(blog.date).toLocaleDateString()}
          </div>
          {/* Preview image */}
          {blog.previewImage && (
            <div className={styles.previewImageWrapper}>
              <img
                src={blog.previewImage}
                alt="Preview"
                className={styles.previewImage}
              />
            </div>
          )}
          {/* Content */}
          <div className={styles.contentWrapper}>
            <div className="prose prose-invert prose-lg mb-16">
              {Array.isArray(blog.content)
                ? blog.content.map((para: string, idx: number) => (
                    <ReactMarkdown key={idx}>{para}</ReactMarkdown>
                  ))
                : <ReactMarkdown>{blog.content}</ReactMarkdown>
              }
            </div>
          </div>
          {/* Related Blogs */}
          {/* <div className={styles.relatedBlogs}>
            <h2 className={styles.relatedTitle}>Related Blogs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedBlogs.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blogs/${rel.slug}`}
                  className="bg-[#181818] rounded-lg shadow p-4 flex flex-col border border-gray-800 hover:bg-[#23232a] transition"
                >
                  {rel.previewImage && (
                    <img
                      src={rel.previewImage}
                      alt={rel.title}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                  )}
                  <h3 className="text-lg font-semibold mb-1">{rel.title}</h3>
                  <span className="text-xs text-gray-500">{new Date(rel.date).toLocaleDateString()}</span>
                </Link>
              ))}
            </div>
          </div> */}
        </section>
      </div>
      <Footer />
    </>
  );
}