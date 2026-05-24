/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Menu, X, Terminal, Code, Cpu } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLaunchApp: () => void;
}

export default function Navigation({ activeTab, setActiveTab, onLaunchApp }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const links = ["HOME", "FEATURES", "ROADMAP", "ABOUT", "CONTACT"];

  return (
    <nav 
      id="top-nav-bar"
      className="fixed top-0 left-0 w-full h-[90px] bg-[#02070D]/85 backdrop-blur-md border-b border-[#0B1A25] flex justify-between items-center px-[6%] z-50 transition-all duration-300"
    >
      {/* Brand logo on the far left */}
      <a 
        id="nav-logo-link"
        href="#home" 
        onClick={() => setActiveTab("HOME")}
        className="flex items-center"
      >
        <img 
          id="nav-logo-image"
          src="https://res.cloudinary.com/dmp1fo2j4/image/upload/v1779614344/LOADRYX_logo_transparent_4x_f01fwd.png" 
          alt="LOADRYX LOGO" 
          className="h-[30px] md:h-[35px] w-auto object-contain brightness-110"
          style={{ maxWidth: "210px" }}
          referrerPolicy="no-referrer"
        />
      </a>

      {/* Center navigation links (Desktop) */}
      <ul id="desktop-nav-menu" className="hidden lg:flex items-center gap-10">
        {links.map((link) => {
          const isActive = activeTab === link;
          return (
            <li key={link} className="relative">
              <button
                id={`nav-link-${link.toLowerCase()}`}
                onClick={() => setActiveTab(link)}
                className={`font-rajdhani text-[12px] font-semibold tracking-[0.2em] transition-colors focus:outline-none cursor-pointer py-2 ${
                  isActive ? "text-[#F4F6F8] font-bold" : "text-[#9AA3AA] hover:text-[#F4F6F8]"
                }`}
              >
                {link}
              </button>
              {isActive && (
                <div 
                  id={`active-indicator-${link.toLowerCase()}`}
                  className="absolute bottom-[-10px] left-0 right-0 h-[2.5px] bg-[#0383F4] shadow-[0_0_8px_#0383F4]" 
                />
              )}
            </li>
          );
        })}
      </ul>

      {/* Launch App button on the far right (Desktop) */}
      <div id="desktop-actions" className="hidden lg:block">
        <button
          id="nav-launch-app-btn"
          onClick={onLaunchApp}
          className="w-[165px] h-[44px] border border-[#0383F4] text-[#0383F4] font-rajdhani text-[12.5px] font-bold tracking-[0.12em] uppercase rounded-sm hover:bg-[#0383F4]/10 hover:text-white hover:border-[#F4F6F8] transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer box-glow-blue-hover"
        >
          <span>LAUNCH APP</span>
          <span className="text-[14px]">→</span>
        </button>
      </div>

      {/* Hamburger Menu (Mobile) */}
      <button
        id="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden p-2 text-[#9AA3AA] hover:text-white transition-colors focus:outline-none cursor-pointer"
        aria-label="Toggle Menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-drawer"
          className="absolute top-[90px] left-0 w-full bg-[#02070D]/95 border-b border-[#0B1A25] py-8 px-[6%] flex flex-col gap-6 lg:hidden backdrop-blur-xl animate-fade-in-down z-50"
        >
          <ul id="mobile-nav-list" className="flex flex-col gap-4">
            {links.map((link) => {
              const isActive = activeTab === link;
              return (
                <li key={link} className="border-b border-[#0B1A25]/30 pb-2">
                  <button
                    id={`mobile-nav-link-${link.toLowerCase()}`}
                    onClick={() => {
                      setActiveTab(link);
                      setMobileMenuOpen(false);
                    }}
                    className={`font-rajdhani text-[14px] font-semibold tracking-[0.15em] text-left w-full ${
                      isActive ? "text-[#0383F4]" : "text-[#9AA3AA] hover:text-white"
                    }`}
                  >
                    {isActive && <span className="mr-2">■</span>}
                    {link}
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            id="mobile-launch-app-btn"
            onClick={() => {
              onLaunchApp();
              setMobileMenuOpen(false);
            }}
            className="w-full h-[46px] border border-[#0383F4] text-[#0383F4] font-rajdhani text-[13px] font-bold tracking-[0.1em] uppercase rounded-sm hover:bg-[#0383F4]/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>LAUNCH APP</span>
            <span>→</span>
          </button>
        </div>
      )}
    </nav>
  );
}
