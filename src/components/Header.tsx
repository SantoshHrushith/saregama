"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const brandRef = useRef(null);
  const talkRef = useRef(null);

  useEffect(() => {
    // Immediately set initial state of header itself
    gsap.set(headerRef.current, {
      opacity: 0
    });

    // Initial position setup for children
    gsap.set([brandRef.current, talkRef.current], {
      y: "45vh"
    });

    gsap.set(brandRef.current, {
      x: "-100px"
    });

    gsap.set(logoRef.current, {
      opacity: 0,
      scale: 0,
      y: "30px"
    });

    // Reveal header after initial setup
    gsap.to(headerRef.current, {
      opacity: 1,
      duration: 0.1,
      onComplete: () => {
        // Main scroll animation for brand and talk button
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "main",
            start: "top top",
            end: "+=300",
            scrub: 1
          }
        });

        tl.to([brandRef.current, talkRef.current], {
          y: 0,
          duration: 0.5
        });
      }
    });

    // Listen for S logo fade completion
    const handleLogoFade = (event: Event) => {
      const customEvent = event as CustomEvent<{ direction: 'in' | 'out' }>;
      if (customEvent.detail.direction === 'out') {
        gsap.to(logoRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });

        gsap.to(brandRef.current, {
          x: "12px",
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(logoRef.current, {
          opacity: 0,
          scale: 0,
          y: "30px",
          duration: 0.3,
          ease: "power2.in"
        });

        gsap.to(brandRef.current, {
          x: "-100px",
          duration: 0.3,
          ease: "power2.in"
        });
      }
    };

    window.addEventListener('sLogoFadeComplete', handleLogoFade);

    return () => {
      window.removeEventListener('sLogoFadeComplete', handleLogoFade);
    };
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 w-full flex justify-between items-center p-6 z-10 opacity-0">
      <div className="flex items-center gap-0">
        <div ref={logoRef} className="w-[100px]">
          <Image
            src="https://eubiq.b-cdn.net/saga/sagatext-caption.png"
            height={100}
            width={100}
            alt="Saga Logo"
          />
        </div>
        <div ref={brandRef} className="transform">
          <Link href="/" className="text-white font-light uppercase tracking-wider text-xs whitespace-nowrap">
            A BRAND BY THE SIXTY ONE
          </Link>
        </div>
      </div>
      <div ref={talkRef} className="transform">
        <Link href="#contact" className="lets-talk-btn text-white uppercase tracking-wider text-xs">
          LET&apos;S TALK
        </Link>
      </div>
    </header>
  );
}