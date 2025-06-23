"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section2() {
    const sectionRef = useRef(null);
    const imgLeftRef = useRef(null);
    const imgRightRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
          // Timeline for images and text
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 35%",
              end: "top+=1000",
              scrub: true,
              markers: false,
            }
          });
      
          tl.fromTo(imgLeftRef.current,
            { x: "-100%", opacity: 0 },
            { x: "0%", opacity: 1, duration: 0.4, ease: "power3.out" }
          )
          .fromTo(imgRightRef.current,
            { x: "100%", opacity: 0 },
            { x: "0%", opacity: 1, duration: 0.4, ease: "power3.out" },
            "<" // sync with left image
          )
          .fromTo(textRef.current,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1.2, duration:0.7, ease: "power2.out" },
            "<" // after images
          );
          // .to({}, { duration: 0.5 });
        }, sectionRef);
      
        return () => ctx.revert();
      }, []);

    return (
        <section ref={sectionRef} className="section2 h-full">
            <div className="s2-overlay-wrapper">
                <img ref={imgLeftRef} src="/images/1 (1).png" alt="Left" className="s2-image-left" />
                {/* <img ref={imgRightRef} src="/images/s2-r.png" alt="Right" className="s2-image-right" /> */}
            </div>
            <div ref={textRef} className="section2-text">
                <h2>Why Power</h2>
                <h2>Tracks</h2>
            </div>
        </section>
    );
}
