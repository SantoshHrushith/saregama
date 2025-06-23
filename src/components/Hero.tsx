"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;

      const progress = Math.min(scrollY / maxScroll, 1); // 0 to 1
      const scale = 1 + progress * 2;                    // 1 to 3
      const opacity = 1 - progress * 1.2;                // Fade out slightly faster

      if (logoRef.current) {
        logoRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
        logoRef.current.style.opacity = `${Math.max(0, opacity)}`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="h-screen relative overflow-hidden bg-transparent">
      <div
        ref={logoRef}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform ease-out duration-100"
      >
        <Image
          src="https://eubiq.b-cdn.net/saga/S%20white.png"
          alt="Oval Logo"
          width={120}
          height={120}
          priority
        />
        <h1 className="text-white text-4xl text-center mt-4">SAGA</h1>
      </div>

      <div className="absolute bottom-10 w-full text-center">
        <p className="text-white text-sm">SCROLL DOWN TO DISCOVER</p>
        <div className="h-[2px] w-10 bg-white mx-auto mt-2" />
      </div>
    </section>
  );
}
