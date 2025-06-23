"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section5 = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const properties = [
        "Precision engineered for seamless integration",
        "Advanced power delivery technology",
        "Elegant minimal design aesthetics",
        "Premium build quality and finish",
        "Sustainable manufacturing process"
    ];

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                }
            });

            // Animate section and list items
            // tl.from(sectionRef.current, {
            //     y: 100,
            //     opacity: 0,
            //     duration: 1,
            //     ease: "power2.out"
            // });

            // Animate list items
            const items = listRef.current?.querySelectorAll('li');
            items?.forEach((item, index) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom-=50",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    delay: index * 0.1
                });
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section 
            ref={sectionRef}
            className="relative bg-[#1c1c1c] w-full min-h-screen py-20 lg:py-40 px-8 lg:px-16"
        >
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl lg:text-5xl mb-20 font-light tracking-tight font-serif">
                    Product Properties
                </h2>
                <ul ref={listRef} className="grid gap-4">
                    {properties.map((property, index) => (
                        <li 
                            key={index}
                            className="text-lg uppercase tracking-wider py-6 border-b border-white/20 font-light transition-all duration-300 hover:pl-4"
                        >
                            {property}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Section5;