"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "@/hooks/useMediaQuery";

declare global {
  interface Window {
    navLogoVisible: boolean;
  }
}

gsap.registerPlugin(ScrollTrigger);

export default function Section1() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const imageRef = useRef(null);
  const imagetextRef = useRef(null);
  const textRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const scrollHintRef = useRef(null);
  const img3Ref = useRef(null);
  const mbg = useRef(null);
  const mbt = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Move mobileAnimations and desktopAnimations above useEffect so they have access to the refs

  const mobileAnimations = () => {
    const mobileTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=800vh",
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          if (self.progress >= 0.398 && !window.navLogoVisible) {
            window.navLogoVisible = true;
            window.dispatchEvent(new CustomEvent('sLogoFadeComplete', {
              detail: { direction: 'out' }
            }));
          }
          else if (self.progress < 0.398 && window.navLogoVisible) {
            window.navLogoVisible = false;
            window.dispatchEvent(new CustomEvent('sLogoFadeComplete', {
              detail: { direction: 'in' }
            }));
          }
        }
      },
    });

    // Logo zoom and fade
    mobileTl
      .to(imageRef.current, {
        scale: 6,
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut"
      }, 0)
      .to(imagetextRef.current, {
        opacity: 0,
        duration: 0.1,
        backgroundColor: "#1c1c1c",
        ease: "power1.out"
      }, 0)
      .to(mbg.current, {
        backgroundColor: "#1c1c1c",
      }, 0)
      .to(scrollHintRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power1.out"
      }, 0.005)

      // Text fade-in
      .fromTo(textRef.current, {
        opacity: 0
      }, {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut"
      }, 0.5)


      // 3. Shrink `.mobile-purpose` to top half of screen
      .to(textRef.current, {
        height: "40vh",
        duration: 1.5,
        ease: "power2.inOut"
      }, 1.5)
      .to(mbt.current, {
        height: "60vh",
        duration: 1.5,
        ease: "power2.inOut",
      }, 1.5)

      // img2 parallax: slides from bottom up
      .fromTo(img2Ref.current, {
        y: "100%"
      }, {
        y: "0%",
        ease: "none",
        duration: 1.5
      }, 3)
      .to(img2Ref.current, {
        y: "-100%",
        ease: "none",
        duration: 1.2
      }, ">")

      // img3 parallax: appears from bottom after img2
      .fromTo(img3Ref.current, {
        y: "100%"
      }, {
        y: "0%",
        ease: "none",
        duration: 1.2
      }, "<")

  };

  const desktopAnimations = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2400",
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          if (self.progress >= 0.398 && !window.navLogoVisible) {
            window.navLogoVisible = true;
            window.dispatchEvent(new CustomEvent('sLogoFadeComplete', {
              detail: { direction: 'out' }
            }));
          }
          else if (self.progress < 0.398 && window.navLogoVisible) {
            window.navLogoVisible = false;
            window.dispatchEvent(new CustomEvent('sLogoFadeComplete', {
              detail: { direction: 'in' }
            }));
          }
        }
      },
    });

    // Initial animations
    tl.to(leftRef.current, {
      width: "50vw",
      backgroundColor: "#1c1c1c",
      ease: "none"
    }, 0)
      .to(imagetextRef.current, {
        opacity: 0,
        duration: 0.1,
        ease: "power1.out"
      }, 0)
      .to(rightRef.current, {
        width: "50vw",
        ease: "none"
      }, 0)
      .to(scrollHintRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power1.out"
      }, 0.005)

      // Modified zoom and fade sequence
      .add("zoomStart")
      // First phase: just zoom
      .to(imageRef.current, {
        scale: 5.3,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
      }, "zoomStart")
      .to(textRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "zoomStart+=0.7")
      .from(textRef.current?.querySelector('h2') as HTMLElement, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "zoomStart+=0.8")
      .from(textRef.current?.querySelector('p') ?? [], {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "zoomStart+=0.9")
      .to(img2Ref.current, {
        y: "0%",
        ease: "none",
        duration: 1.5
      }, "zoomStart+=0.7")
      .to(img2Ref.current, {
        y: "-100%",
        ease: "none",
        duration: 1.5
      }, ">")
      .to(img3Ref.current, {
        y: "0%",
        ease: "none",
        duration: 1.5
      }, "<");
  };

  useEffect(() => {
    let lastIsMobile = window.innerWidth <= 768;

    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile !== lastIsMobile) {
        window.location.reload();
      }
      lastIsMobile = isMobile;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hide overlay text initially
      gsap.set(textRef.current, {
        opacity: 0
      });

      if (isMobile) {
        // Mobile animations
        mobileAnimations();
      } else {
        // Desktop animations
        desktopAnimations();
      }
    }, sectionRef);

    return () => {
      ctx.revert(); // Cleanup GSAP context
      // ScrollTrigger.killAll();
    }
  }, [isMobile]);

  return (
    <section ref={sectionRef} className={`section1 bg-transparent ${isMobile ? 'mobile' : ''}`}>
      {isMobile ? (
        // Mobile layout
        <>
          <div ref={mbg} className="mobile-content">
            <div className="mobile-logo-container">
              <img
                ref={imageRef}
                src="https://eubiq.b-cdn.net/saga/S%20white.png"
                alt="Zooming image"
                className="mobile-logo"
              />
              <img
                ref={imagetextRef}
                src="https://eubiq.b-cdn.net/saga/sagatext.png"
                alt="image-text"
                className="mobile-logo-text"
              />
              <div className="m-scroll-hint w-[100%]" ref={scrollHintRef}>
                Scroll down to discover ↓
              </div>
            </div>
            <div>

              <div ref={textRef} className="mobile-purpose">
                <div className="m-purpose-text">

                  <h2>Purpose Of Existing</h2>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s.
                  </p>
                </div>
              </div>
              <div ref={mbt} className="mobile-images">
                <div className="image-stack">
                  <img ref={img1Ref} src="https://eubiq.b-cdn.net/saga/pexels-steve.jpg" alt="Image 1" className="base-img" />
                  <img ref={img2Ref} src="/images/leather6.jpg" alt="Image 2" className="overlay-img" />
                  <img ref={img3Ref} src="https://eubiq.b-cdn.net/saga/pexels-steve.jpg" alt="Image 3" className="overlay-img" />
                </div>
              </div>
            </div>
          </div>

        </>
      ) : (
        // Desktop layout (unchanged)
        <>
          <div ref={leftRef} className="leftDiv">
            <div className="image-container">
              <img
                ref={imageRef}
                src="https://eubiq.b-cdn.net/saga/S%20white.png"
                alt="Zooming image"
                className="left-image"
              />
              <img
                ref={imagetextRef}
                src="https://eubiq.b-cdn.net/saga/sagatext.png"
                alt="image-text"
                className="left-image-text"
              />
              <div ref={textRef} className="overlay-text">
                <h2>The Art of Leather Craftsmanship</h2>
                <p>
                  At Saga, we believe in the timeless beauty of expertly crafted leather goods.
                  Each piece tells a story of dedication, innovation, and uncompromising quality.
                  Our commitment to excellence is reflected in every stitch, every finish, and
                  every detail that makes our creations truly exceptional.
                </p>
                <p>
                  Born from The Sixty One's legacy of luxury, we transform the finest materials
                  into pieces that transcend trends and become cherished companions in your journey.
                </p>
              </div>
            </div>
            <div className="scroll-hint" ref={scrollHintRef}>
              Scroll down to discover ↓
            </div>
          </div>
          <div ref={rightRef} className="rightDiv">
            <div className="image-stack">
              <img ref={img1Ref} src="https://eubiq.b-cdn.net/saga/pexels-steve.jpg" alt="Image 1" className="base-img" />
              <img ref={img2Ref} src="/images/leather6.jpg" alt="Image 2" className="overlay-img" />
              <img ref={img3Ref} src="https://eubiq.b-cdn.net/saga/pexels-steve.jpg" alt="Image 3" className="overlay-img" />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
