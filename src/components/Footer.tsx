import Link from "next/link";

export default function Footer() {
  return (
    <>
      <section id="contact" className="bg-[#1c1c1c] py-20 px-10 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <h3 className="text-2xl mb-6">Luxurious Innovation</h3>
            <p className="text-[#8c8c8c] mb-8 max-w-xs">
              Saga is a premium leather goods brand creating timeless pieces with exceptional craftsmanship. 
              Each product embodies our commitment to quality materials and sustainable practices.
            </p>
            <Link href="#" className="footer-link">
              EXPLORE OUR COLLECTION
            </Link>
          </div>

          <div>
            <h3 className="text-4xl md:text-5xl mb-8">SAGA</h3>
            <p className="text-[#8c8c8c] mb-8 max-w-xs">
              Founded by The Sixty One, Saga represents a confluence of heritage craftsmanship 
              and contemporary design philosophy, creating pieces that transcend trends.
            </p>
            <Link href="#" className="footer-link">
              DISCOVER OUR STORY
            </Link>
          </div>

          <div>
            <h3 className="text-2xl mb-6">Stay Connected</h3>
            <p className="text-[#8c8c8c] mb-8 max-w-xs">
              Join our community to receive updates on new releases, exclusive events, 
              and behind-the-scenes insights from our atelier.
            </p>
            <Link href="#" className="footer-link">
              SUBSCRIBE
            </Link>
            <br/>
            <Link href="/blogs" className="footer-link mt-4">
              Blogs  
            </Link>
            <br/>
            <Link href="/faq" className="footer-link mt-4">
              FAQ's  
            </Link>
          </div>
        </div>
      </section>
      <div className="footer lg:h-[40vh] h-[20vh]">
        <img
          src="https://eubiq.b-cdn.net/saga/sagatext-caption.png"
          alt="image-text"
          className="footer-image-text"
        />
      </div>
    </>
  );
}