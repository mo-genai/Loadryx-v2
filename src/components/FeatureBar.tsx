/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface FeatureColumn {
  id: string;
  title: string;
  text: string;
  icon: React.ReactNode;
}

export default function FeatureBar() {
  const features: FeatureColumn[] = [
    {
      id: "precision",
      title: "PRECISION",
      text: "Built for accuracy\nin every detail.",
      icon: (
        <svg
          id="feature-icon-precision"
          className="w-8 h-8 text-[#0383F4]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Custom thin crosshair */}
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
          <line x1="12" y1="1" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="23" />
          <line x1="1" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="23" y2="12" />
        </svg>
      ),
    },
    {
      id: "performance",
      title: "PERFORMANCE",
      text: "Optimized for speed\nand stability.",
      icon: (
        <svg
          id="feature-icon-performance"
          className="w-8 h-8 text-[#0383F4]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Custom lightning bolt outline */}
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      id: "reliability",
      title: "RELIABILITY",
      text: "Engineered for\nconsistent results.",
      icon: (
        <svg
          id="feature-icon-reliability"
          className="w-8 h-8 text-[#0383F4]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Custom shield outline */}
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v8" strokeDasharray="1.5 1.5" />
          <path d="M9.5 11l5 2" />
        </svg>
      ),
    },
    {
      id: "community",
      title: "COMMUNITY",
      text: "United by focus.\nDriven to win.",
      icon: (
        <svg
          id="feature-icon-community"
          className="w-8 h-8 text-[#0383F4]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Custom community outline */}
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];

  return (
    <div 
      id="bottom-feature-bar"
      className="w-[84%] max-w-[1200px] h-auto lg:h-[135px] bg-[#071018]/50 backdrop-blur-lg border border-[#0B1A25]/90 rounded-none relative z-30 flex flex-col lg:flex-row items-stretch overflow-hidden transition-all duration-300"
    >
      {/* Tiny corner bracket visual markers on the card to make it look embedded/technical */}
      <div className="absolute top-0 left-0 w-3 h-[1px] bg-[#0383F4]/60" />
      <div className="absolute top-0 left-0 w-[1px] h-3 bg-[#0383F4]/60" />
      <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-[#0383F4]/60" />
      <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-[#0383F4]/60" />

      {features.map((feat, index) => (
        <React.Fragment key={feat.id}>
          {/* Column Container */}
          <div 
            id={`feature-col-${feat.id}`}
            className="flex-1 flex items-center gap-5 px-6 sm:px-8 py-5 lg:py-0 hover:bg-[#0383F4]/[0.02] transition-colors duration-300 group"
          >
            {/* Outline icon */}
            <div id={`feature-icon-wrap-${feat.id}`} className="transition-transform duration-300 group-hover:scale-105">
              {feat.icon}
            </div>

            {/* Typography */}
            <div id={`feature-text-wrap-${feat.id}`} className="flex flex-col gap-1.5">
              <span 
                id={`feature-title-${feat.id}`}
                className="font-rajdhani text-[11px] sm:text-[12px] font-bold tracking-[0.25em] text-[#F4F6F8] group-hover:text-[#0383F4] transition-colors uppercase"
              >
                {feat.title}
              </span>
              <p 
                id={`feature-desc-${feat.id}`}
                className="text-[11.5px] sm:text-[12px] text-[#9AA3AA] leading-[1.6] whitespace-pre-line font-tech tracking-wider"
              >
                {feat.text}
              </p>
            </div>
          </div>

          {/* Separation line between columns (Desktop only) */}
          {index < features.length - 1 && (
            <div 
              id={`feature-divider-${index}`}
              className="hidden lg:block w-[1px] bg-gradient-to-b from-[#0B1A25]/20 via-[#0B1A25] to-[#0B1A25]/20" 
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
