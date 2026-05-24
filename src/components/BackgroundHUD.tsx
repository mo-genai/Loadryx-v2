/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export default function BackgroundHUD() {
  return (
    <div id="bg-hud-container" className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none">
      {/* 1. NO DOT GRID - Removed to prevent noise matching the pure screenshot look */}

      {/* 2. Giant subtle angular outline/chevron graphics behind left content */}
      <svg 
        id="hud-giant-ang-shapes"
        className="absolute left-[3%] top-[15%] w-[49%] h-[65%] opacity-[0.06] text-[#0383F4]"
        viewBox="0 0 800 600"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        {/* Large abstract brackets/lines supporting the technical vibe */}
        <path d="M 50,80 L 150,80" />
        <path d="M 50,80 L 50,450 L 400,450" />
        <path d="M 400,450 L 480,380 L 700,380" />
        <path d="M 120,180 L 320,180" strokeWidth="1.5" strokeDasharray="10 5" />
        {/* Faint polygon */}
        <polygon points="50,150 180,150 250,220 50,220" opacity="0.4" />
      </svg>

      {/* 3. Glowing diagonal cyan/blue bar strictly behind the soldier's back upper-right head area */}
      <div 
        id="hud-blue-diagonal-panel"
        className="absolute right-[8%] top-[-10%] w-[380px] h-[70%] bg-gradient-to-b from-[#0383F4]/20 via-[#005CC2]/10 to-transparent origin-top-left -rotate-45 transform blur-[8px]"
        style={{
          clipPath: "polygon(0 0, 100% 0, 75% 100%, 0% 100%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Diagonal laser stripe matching the intense blue light strip in the screenshot */}
      <div 
        id="hud-blue-laser-stripe"
        className="absolute right-[18%] top-[-5%] w-[90px] h-[60%] bg-[#0383F4]/25 mix-blend-color-dodge -rotate-45 transform blur-[12px]"
        style={{
          clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)"
        }}
      />

      {/* 4. Giant subtle X element on the right background behind the operator */}
      <svg 
        id="hud-giant-x-backdrop"
        className="absolute right-[2%] top-[8%] w-[50%] h-[75%] opacity-[0.03] text-[#0383F4]"
        viewBox="0 0 600 600"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <line x1="50" y1="50" x2="550" y2="550" />
        <line x1="550" y1="550" x2="450" y2="550" />
        <line x1="50" y1="50" x2="150" y2="50" />
        <line x1="550" y1="50" x2="50" y2="550" strokeDasharray="3 3" />
      </svg>

      {/* 5. Left Edge Dotted & Indicator HUD ticks (exact match to screenshot) */}
      <div id="hud-left-edge-ticks" className="absolute left-[24px] top-[150px] flex flex-col gap-1 opacity-[0.85]">
        <div className="w-[3px] h-[3px] bg-[#0383F4] rounded-full shadow-[0_0_6px_#0383F4]" />
        <div className="w-[4px] h-[1px] bg-[#0383F4]" />
        <div className="w-[4px] h-[1px] bg-[#0383F4]" />
        <div className="w-[4px] h-[1px] bg-[#0383F4]" />
        <div className="w-[4px] h-[1px] bg-[#0383F4]" />
        <div className="w-[4px] h-[1px] bg-[#0383F4]/40" />
        <div className="w-[1px] h-[25px] bg-[#0383F4]/30 ml-0.5" />
      </div>

      {/* 6. Right Edge HUD Indicator tracks (exact match to screenshot) */}
      <div id="hud-right-edge-track" className="absolute right-[24px] top-[55%] flex flex-col items-center gap-1.5 opacity-[0.85]">
        <div className="w-[1px] h-[25px] bg-[#0383F4]/30 mr-0.5" />
        <div className="w-[4px] h-[1px] bg-[#0383F4]/40" />
        <div className="w-[4px] h-[1px] bg-[#0383F4]" />
        <div className="w-[4px] h-[1px] bg-[#0383F4]" />
        <div className="w-[4px] h-[1px] bg-[#0383F4]" />
        <div className="w-[4px] h-[1px] bg-[#0383F4]" />
        <div className="w-[3px] h-[3px] bg-[#0383F4] rounded-full shadow-[0_0_6px_#0383F4]" />
      </div>

      {/* Subtle corner brackets for the page layout */}
      <div id="hud-top-bracket-l" className="absolute top-[110px] left-[35px] w-2.5 h-2.5 border-t border-l border-[#0B1A25]" />
      <div id="hud-top-bracket-r" className="absolute top-[110px] right-[35px] w-2.5 h-2.5 border-t border-r border-[#0B1A25]" />
      <div id="hud-bottom-bracket-l" className="absolute bottom-[35px] left-[35px] w-2.5 h-2.5 border-b border-l border-[#0B1A25]" />
      <div id="hud-bottom-bracket-r" className="absolute bottom-[35px] right-[35px] w-2.5 h-2.5 border-b border-r border-[#0B1A25]" />

      {/* Small tech coordinate label */}
      <div id="hud-lat-lng-label" className="absolute bottom-[40px] left-[45px] font-mono text-[9px] text-[#0383F4]/25 tracking-[0.2em]">
        L-DRX // SECURE_CON_09
      </div>
    </div>
  );
}
