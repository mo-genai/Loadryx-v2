/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";

interface HeroContentProps {
  onExploreFeatures: () => void;
  onLearnMore: () => void;
}

export default function HeroContent({ onExploreFeatures, onLearnMore }: HeroContentProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const container = headingRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect1 = line1Ref.current?.getBoundingClientRect();
      const rect2 = line2Ref.current?.getBoundingClientRect();

      // Proximity configuration
      const maxRadius = 350;
      
      if (rect1 && line1Ref.current) {
        const centerX = rect1.left + rect1.width / 2;
        const centerY = rect1.top + rect1.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxRadius) {
          const factor = 1 - dist / maxRadius; // 0 to 1
          const force = factor * 10; // max 10px translate
          const angle = Math.atan2(dy, dx);
          const tx = Math.cos(angle) * force;
          const ty = Math.sin(angle) * force;

          line1Ref.current.style.transform = `translate(${tx}px, ${ty}px) scale(${1 + factor * 0.015})`;
          line1Ref.current.style.textShadow = `0 0 ${10 + factor * 15}px rgba(244, 246, 248, ${0.1 + factor * 0.35})`;
        } else {
          line1Ref.current.style.transform = "translate(0px, 0px) scale(1)";
          line1Ref.current.style.textShadow = "none";
        }
      }

      if (rect2 && line2Ref.current) {
        const centerX = rect2.left + rect2.width / 2;
        const centerY = rect2.top + rect2.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxRadius) {
          const factor = 1 - dist / maxRadius; // 0 to 1
          const force = factor * 15; // max 15px translate
          const angle = Math.atan2(dy, dx);
          const tx = Math.cos(angle) * force;
          const ty = Math.sin(angle) * force;

          line2Ref.current.style.transform = `translate(${tx}px, ${ty}px) scale(${1 + factor * 0.035})`;
          line2Ref.current.style.textShadow = `0 0 ${15 + factor * 25}px rgba(3, 131, 244, 0.85), 0 0 ${35 + factor * 40}px rgba(3, 131, 244, 0.4)`;
        } else {
          line2Ref.current.style.transform = "translate(0px, 0px) scale(1)";
          line2Ref.current.style.textShadow = "";
        }
      }
    };

    const handleMouseLeave = () => {
      if (line1Ref.current) {
        line1Ref.current.style.transform = "translate(0px, 0px) scale(1)";
        line1Ref.current.style.textShadow = "none";
      }
      if (line2Ref.current) {
        line2Ref.current.style.transform = "translate(0px, 0px) scale(1)";
        line2Ref.current.style.textShadow = "";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (container) {
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div id="hero-left-content" className="w-full lg:max-w-[49%] flex flex-col justify-center text-left relative z-40 pl-2 lg:pl-[4%] select-none">
      {/* Subtle tech HUD line above title */}
      <div id="hero-pre-title-hud" className="flex items-center gap-3 mb-5 opacity-90">
        <span className="w-2.5 h-[2px] bg-[#0383F4]" />
        <span className="font-tech text-[10px] text-[#0383F4] tracking-[0.3em] uppercase">SYSTEM_INIT_LOADED // 0x882</span>
      </div>

      {/* Main Headline */}
      <h1 
        id="hero-main-headline"
        ref={headingRef}
        className="font-orbitron text-[36px] sm:text-[48px] md:text-[56px] lg:text-[68px] xl:text-[80px] uppercase leading-[1.08] select-none flex flex-col items-start gap-1"
      >
        <span 
          id="heading-tuned-for" 
          ref={line1Ref}
          className="text-[#F4F6F8] font-extralight tracking-[0.24em] transition-all duration-200 ease-out inline-block origin-left"
          style={{ willChange: "transform, text-shadow" }}
        >
          TUNED FOR
        </span>
        <span 
          id="heading-response" 
          ref={line2Ref}
          className="text-[#0383F4] font-black tracking-[0.15em] glow-blue-strong transition-all duration-200 ease-out inline-block origin-left"
          style={{ willChange: "transform, text-shadow" }}
        >
          RESPONSE
        </span>
      </h1>

      {/* Subtitle */}
      <p 
        id="hero-subtitle"
        className="mt-8 text-[#9AA3AA] text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7] tracking-[0.14em] max-w-[530px] font-tech text-pretty whitespace-pre-line"
      >
        LOADRYX is a next-gen platform built for{"\n"}
        players who value precision, performance,{"\n"}
        and the winning edge.
      </p>

      {/* Action Buttons */}
      <div id="hero-actions-row" className="mt-9 flex flex-row items-center gap-7">
        {/* EXPLORE FEATURES -> */}
        <button
          id="hero-explore-btn"
          onClick={onExploreFeatures}
          className="w-[230px] h-[48px] border border-[#0383F4] text-[#0383F4] font-rajdhani text-[12.5px] font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-[#0383F4]/10 hover:text-white hover:border-[#F4F6F8] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group"
        >
          {/* Subtle button border corner notches */}
          <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-[#0383F4] group-hover:border-white" />
          <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-[#0383F4] group-hover:border-white" />
          <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-[#0383F4] group-hover:border-white" />
          <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-[#0383F4] group-hover:border-white" />
          
          <span>EXPLORE FEATURES</span>
          <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>

        {/* LEARN MORE -> */}
        <button
          id="hero-learn-more-btn"
          onClick={onLearnMore}
          className="text-[#F4F6F8] hover:text-[#0383F4] font-rajdhani text-[12.5px] font-bold tracking-[0.18em] uppercase transition-colors duration-300 flex items-center gap-2.5 py-2 group cursor-pointer focus:outline-none"
        >
          <span>LEARN MORE</span>
          <span className="text-[#0383F4] text-[14px] font-bold transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </button>
      </div>

      {/* Decorative technical line below buttons */}
      <div id="hero-bottom-tech-marker" className="mt-10 flex items-center gap-2.5 opacity-60">
        <span className="font-tech text-[9px] text-[#9AA3AA] tracking-widest uppercase">CONNECT_ID //</span>
        <span className="text-[9px] text-[#0383F4] font-tech tracking-widest animate-pulse">00:1A:2B:3C:4D:5E</span>
      </div>
    </div>
  );
}
