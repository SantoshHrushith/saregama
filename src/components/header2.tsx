"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header2() {
  return (
    <header className="fixed top-0 w-full flex justify-between items-center p-6 z-10 bg-black bg-opacity-80">
      <div className="flex items-center gap-2">
        <div className="w-[100px]">
          <Link href="/" className="text-white font-light uppercase tracking-wider text-xs whitespace-nowrap">
          <Image
            src="https://eubiq.b-cdn.net/saga/sagatext-caption.png"
            height={100}
            width={100}
            alt="Saga Logo"
          />
          </Link>
        </div>
        <div>
          <Link href="/" className="text-white font-light uppercase tracking-wider text-xs whitespace-nowrap">
            A BRAND BY THE SIXTY ONE
          </Link>
        </div>
      </div>
      <div>
        <Link href="#contact" className="lets-talk-btn text-white uppercase tracking-wider text-xs">
          LET&apos;S TALK
        </Link>
      </div>
    </header>
  );
}