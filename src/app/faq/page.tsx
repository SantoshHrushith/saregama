"use client";
import { useState } from "react";
import Header2 from "@/components/header2";
import Footer from "@/components/Footer";
import faqs from "@/data/faqs.json";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <>
      <Header2 />
      <div className="bg-gradient-to-b from-black via-[#1C1C1C] to-black text-white min-h-screen pt-24">
        <section className="max-w-3xl mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold mb-10 text-center">Frequently Asked Questions</h1>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#1C1C1C]  border border-white-200 transition-all"
              >
                <button
                  className={`w-full text-left px-6 py-5 text-lg font-semibold flex justify-between items-center rounded-t-xl focus:outline-none transition-colors ${
                    openIndex === idx
                      ? "bg-black text-white-400"
                      : "hover:bg-[#1C1C1C]/90 text-white"
                  }`}
                  onClick={() => toggle(idx)}
                  aria-expanded={openIndex === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span>{faq.question}</span>
                  <span className="ml-4 text-2xl font-bold transition-transform" style={{ transform: openIndex === idx ? "rotate(180deg)" : "rotate(0deg)" }}>
                    {openIndex === idx ? "−" : "+"}
                  </span>
                </button>
                <div
                  id={`faq-answer-${idx}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out px-6 ${
                    openIndex === idx ? "max-h-40 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
                  }`}
                  style={{ background: "#1C1C1C" }}
                >
                  <p className="text-gray-200 text-base border-l-4 border-white-400 pl-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}