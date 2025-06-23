"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";

declare global {
    interface Window {
        navLogoVisible: boolean;
    }
}

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const baseRef = useRef(null);
    const overlay1Ref = useRef(null);
    const overlay2Ref = useRef(null);
    const textRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery("(max-width: 768px)");

    const mobileAnimations = () => {
        const mobileTl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=800vh",
                scrub: true,
                pin: true,
            },
        });

        mobileTl
            .to({}, { duration: 0.5 })
            .to(rightRef.current, {
                backgroundColor: "#1c1c1c",
                duration: 0.2,
                ease: "power1.inOut"
            }, 0.5)
            .to(textRef.current, {
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            }, 0.5)
            .from(textRef.current?.querySelector('h2')!, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            }, 0.7)
            .from(textRef.current?.querySelector('p')!, {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            }, 0.9)

            .to(baseRef.current, {
                x: "0%",
                // y: "0%",
                duration: 1.5,
                ease: "power2.inOut"
            }, 1.3)

            .to(leftRef.current, {
                height: "60vh",
                duration: 1,
                ease: "power2.inOut"
            }, 1.5)

            // .fromTo(rightRef.current, 
            //     { height: "100vh" },
            //     {height: "40vh",
            //     duration: 1,
            //     ease: "power2.inOut"}
            // , 1.0)
            .to(rightRef.current,
                {
                    height: "40vh",
                    duration: 1,
                    ease: "power2.inOut"
                }
                , 1.8)
            .to(overlay1Ref.current, {
                y: "0%",
                duration: 1.2,
                ease: "power2.inOut"
            }, 2.5)
            .to(overlay1Ref.current, {
                y: "-100%",
                duration: 1.2,
                ease: "power2.inOut"
            }, "+=0.5")

            .to(overlay2Ref.current, {
                y: "0%",
                duration: 1.2,
                ease: "power2.inOut"
            }, "<")
            .to(leftRef.current,
                {
                    height: "100vh",
                    duration: 1,
                    ease: "power2.inOut"
                }
                , ">")
            .to(rightRef.current,
                {
                    height: "0vh",
                    duration: 1,
                    ease: "power2.inOut"
                }
                , "+=0.5")
            .to({},{duration:1});
            

    };

    const desktopAnimations = () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=2400",
                scrub: true,
                pin: true,
                markers: false,
            },
        });

        tl
            .to(baseRef.current, {
                x: "0%",
                duration: 1.2,
                ease: "power2.inOut"
            }, 0)

            // Then: Background fades in subtly after image is mostly in
            .to(rightRef.current, {
                backgroundColor: "#1c1c1c",
                duration: 0.8,
                ease: "power1.inOut"
            }, 0.6) // Starts after image has begun moving

            // Text animations after background is visible
            .to(textRef.current, {
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            }, 1)
            .from(textRef.current?.querySelector('h2')!, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            }, 1.1)
            .from(textRef.current?.querySelector('p')!, {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            }, 1.2)

            // Vertical image transitions
            .to(overlay1Ref.current, {
                y: "0%",
                duration: 1.5,
                ease: "none"
            }, 1.5)
            .to(overlay1Ref.current, {
                y: "-100%",
                duration: 1.5,
                ease: "none"
            }, "+=0.5")
            .to(overlay2Ref.current, {
                y: "0%",
                duration: 1.5,
                ease: "none"
            }, "<")
            .to({}, { duration: 0.5 }) // Add pause
            .to(leftRef.current, {
                width: "100vw",
                duration: 1,
                ease: "power2.inOut"
            }, "<")
            .to(rightRef.current, {
                width: 0,
                opacity: 0,
                duration: 1,
                ease: "power2.inOut"
            }, "+=0.1")
            .to({}, { duration: 0.5 });


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
            gsap.set(baseRef.current, {
                x: "-100%"  // Start base image from left edge
            });

            gsap.set([overlay1Ref.current, overlay2Ref.current], {
                y: "100%"
            });

            gsap.set(textRef.current, {
                opacity: 0
            });

            // Set initial background color of right div to transparent
            gsap.set(rightRef.current, {
                backgroundColor: "transparent"
            });
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

    // useEffect(() => {
    //     if (!sectionRef.current) return;

    //     const ctx = gsap.context(() => {
    //         // Set initial states
    //         gsap.set(baseRef.current, {
    //             x: "-100%"  // Start base image from left edge
    //         });

    //         gsap.set([overlay1Ref.current, overlay2Ref.current], {
    //             y: "100%"
    //         });

    //         gsap.set(textRef.current, {
    //             opacity: 0
    //         });

    //         // Set initial background color of right div to transparent
    //         gsap.set(rightRef.current, {
    //             backgroundColor: "transparent"
    //         });

    //         const tl = gsap.timeline({
    //             scrollTrigger: {
    //                 trigger: sectionRef.current,
    //                 start: "top top",
    //                 end: "+=2000",
    //                 scrub: true,
    //                 pin: true,
    //                 markers: false,
    //             },
    //         });

    //         tl
    //             .to(baseRef.current, {
    //                 x: "0%",
    //                 duration: 1.2,
    //                 ease: "power2.inOut"
    //             }, 0)

    //             // Then: Background fades in subtly after image is mostly in
    //             .to(rightRef.current, {
    //                 backgroundColor: "#1c1c1c",
    //                 duration: 0.8,
    //                 ease: "power1.inOut"
    //             }, 0.6) // Starts after image has begun moving

    //             // Text animations after background is visible
    //             .to(textRef.current, {
    //                 opacity: 1,
    //                 duration: 0.8,
    //                 ease: "power2.out"
    //             }, 1)
    //             .from(textRef.current?.querySelector('h2')!, {
    //                 y: 30,
    //                 opacity: 0,
    //                 duration: 0.6,
    //                 ease: "power2.out"
    //             }, 1.1)
    //             .from(textRef.current?.querySelector('p')!, {
    //                 y: 20,
    //                 opacity: 0,
    //                 duration: 0.6,
    //                 ease: "power2.out"
    //             }, 1.2)

    //             // Vertical image transitions
    //             .to(overlay1Ref.current, {
    //                 y: "0%",
    //                 duration: 1.5,
    //                 ease: "none"
    //             }, 1.5)
    //             .to(overlay1Ref.current, {
    //                 y: "-100%",
    //                 duration: 1.5,
    //                 ease: "none"
    //             }, "+=0.5")
    //             .to(overlay2Ref.current, {
    //                 y: "0%",
    //                 duration: 1.5,
    //                 ease: "none"
    //             }, "<")
    //             .to({}, { duration: 0.5 }) // Add pause
    //             .to(leftRef.current, {
    //                 width: "100vw",
    //                 duration: 1.5,
    //                 ease: "power2.inOut"
    //             }, ">")
    //             .to(rightRef.current, {
    //                 width: 0,
    //                 opacity: 0,
    //                 duration: 1,
    //                 ease: "power2.inOut"
    //             }, "<")
    //             .to({}, { duration: 3 });
    //     }, sectionRef);

    //     return () => ctx.revert();
    // }, []);

    return (
        <section ref={sectionRef} className="section3 relative flex w-full h-screen overflow-hidden ">
            {/* Background GIF Layer */}
            <div className="absolute inset-0 z-5">
                <Image
                    src="/gif.gif"
                    alt="Background GIF"
                    fill
                    priority
                    unoptimized
                    className="object-cover w-full h-full"
                />
            </div>

            <div ref={leftRef} className="s3-left relative z-10 w-1/2 h-full">
                <div className="image-stack">
                    <Image
                        src="https://eubiq.b-cdn.net/saga/Surface%20track.png"
                        alt="Base"
                        width={800}
                        height={600}
                        className="s3-base-image"
                        ref={baseRef}
                    />
                    <Image
                        src="https://eubiq.b-cdn.net/saga/Rec%204.png"
                        alt="Overlay 1"
                        width={800}
                        height={600}
                        className="s3-overlay-image"
                        ref={overlay1Ref}
                    />
                    <Image
                        src="https://eubiq.b-cdn.net/saga/SAGA_FullProductShot2.png"
                        alt="Overlay 2"
                        width={800}
                        height={600}
                        className="s3-overlay-image"
                        ref={overlay2Ref}
                    />
                </div>
            </div>

            <div ref={rightRef} className="s3-right z-10 " style={{ height: '100vh' }}>
                <div ref={textRef} className="s3-overlay-text text-white max-w-md">
                    <h2 className="text-3xl font-bold mb-4">Power Redefined</h2>
                    <p className="text-sm mb-2">
                        In the realm of modern living, power delivery should be as refined as it is functional...
                    </p>
                    <p className="text-sm">
                        Each element is crafted with precision, meeting the highest standards of both aesthetics...
                    </p>
                </div>
            </div>
        </section>


    );
};

export default Section3;

// <section ref={sectionRef} className="section3 flex w-full h-screen bg-black">
//     <div ref={leftRef} className="s3-left relative w-1/2 h-full">
//         <div className="image-stack">
//             <Image
//                 src="https://eubiq.b-cdn.net/saga/Surface%20track.png"
//                 alt="Base"
//                 width={800}
//                 height={600}
//                 className="s3-base-image"
//                 ref={baseRef}
//             />
//             <Image
//                 src="https://eubiq.b-cdn.net/saga/Rec%204.png"
//                 alt="Overlay 1"
//                 width={800}
//                 height={600}
//                 className="s3-overlay-image"
//                 ref={overlay1Ref}
//             />
//             <Image
//                 src="https://eubiq.b-cdn.net/saga/SAGA_FullProductShot2.png"
//                 alt="Overlay 2"
//                 width={800}
//                 height={600}
//                 className="s3-overlay-image"
//                 ref={overlay2Ref}
//             />
//         </div>
//     </div>
//     <div ref={rightRef} className="s3-right w-1/2 h-full flex items-center justify-center">
//         <div ref={textRef} className="s3-overlay-text">
//             <h2>Power Redefined</h2>
//             <p>
//                 In the realm of modern living, power delivery should be as refined as it is functional.
//                 Our innovative track system redefines spatial interaction, seamlessly integrating into
//                 your environment while providing unmatched versatility and performance.
//             </p>
//             <p>
//                 Each element is crafted with precision, meeting the highest standards of both aesthetics
//                 and utility. This isn't just a power solution – it's an embodiment of sophisticated living,
//                 where form and function achieve perfect harmony.
//             </p>
//         </div>
//     </div>
// </section>
