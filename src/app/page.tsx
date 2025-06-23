"use client";

import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Section3 from "@/components/Section3";
import Section4 from "@/components/Section4";
import Section5 from "@/components/Section5";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sticky from "@/components/Sticky";
import Catalouge from "@/components/Catalouge";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Sticky />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Catalouge/>
      <Footer />
    </main>
  );
}


