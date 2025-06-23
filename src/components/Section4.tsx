'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Section4: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Safety check for browser environment
    if (typeof window === 'undefined') return;
    
    const video = videoRef.current;
    if (!video || !sectionRef.current) return;
    
    // Load video and ensure metadata is available
    video.load();
    
    let scrollTriggerInstance: ScrollTrigger;
    
    const initScrollTrigger = () => {
      // Pause video initially
      video.pause();
      
      // Create ScrollTrigger
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5, // Smooth scrubbing
        pin: true,
        anticipatePin: 1,
        // markers: true,
        onUpdate: (self) => {
          if (video.duration) {
            // Map scroll progress to video time
            const scrollProgress = self.progress;
            video.currentTime = scrollProgress * video.duration;
          }
        },
      });
    };
    
    // Initialize ScrollTrigger once video metadata is loaded
    const handleMetadata = () => {
      initScrollTrigger();
    };
    
    video.addEventListener('loadedmetadata', handleMetadata);
    
    return () => {
      video.removeEventListener('loadedmetadata', handleMetadata);
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef} 
      className="h-screen w-full relative overflow-hidden"
    >
      <div className="video-container h-full w-full">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          preload="auto"
          muted
          playsInline
        >
          <source src="/vid.mp4" type="video/mp4" />
        </video>
      </div>
    
    </section>
  );
};

export default Section4;

// 'use client';

// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// if (typeof window !== 'undefined') {
//   gsap.registerPlugin(ScrollTrigger);
// }

// const Section4: React.FC = () => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (typeof window === 'undefined') return;

//     ScrollTrigger.normalizeScroll(true);

//     const video = videoRef.current;
//     if (!video || !sectionRef.current) return;

//     const isMobile = /Mobi|Android/i.test(navigator.userAgent);

//     video.load();
//     video.pause();

//     let scrollTriggerInstance: ScrollTrigger;

//     const initScrollTrigger = () => {
//       scrollTriggerInstance = ScrollTrigger.create({
//         trigger: sectionRef.current,
//         start: 'top top',
//         end: 'bottom top',
//         scrub: isMobile ? 1 : 0.5,
//         pin: true,
//         anticipatePin: 1,
//         // markers: true,
//         onUpdate: (self) => {
//           if (video.duration) {
//             video.currentTime = self.progress * video.duration;
//           }
//         },
//       });
//     };

//     const handleMetadata = () => {
//       initScrollTrigger();
//     };

//     video.addEventListener('loadedmetadata', handleMetadata);

//     return () => {
//       video.removeEventListener('loadedmetadata', handleMetadata);
//       if (scrollTriggerInstance) {
//         scrollTriggerInstance.kill();
//       }
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="w-full h-screen relative overflow-hidden"
//     >
//       <video
//         ref={videoRef}
//         className="w-full h-full object-cover"
//         preload="metadata"
//         muted
//         playsInline
//         poster="/fallback.jpg"
//       >
//         <source src="/vid.mp4" type="video/mp4" />
//       </video>
//     </section>
//   );
// };

// export default Section4;
