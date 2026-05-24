/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import BackgroundHUD from "./components/BackgroundHUD";
import HeroContent from "./components/HeroContent";
import FeatureBar from "./components/FeatureBar";
import ParticleCanvas from "./components/ParticleCanvas";
import { Terminal, Shield, Cpu, Activity, LogIn, Lock, CheckCircle2, AlertCircle } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("HOME");
  const [showSystemModal, setShowSystemModal] = useState<boolean>(false);
  
  // High-performance video background states
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);

  // Tactical access credentials simulator
  const [passcode, setPasscode] = useState<string>("");
  const [simStatus, setSimStatus] = useState<"IDLE" | "AUTHORIZING" | "GRANTED" | "DENIED">("IDLE");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "SEC_CORE_SYS: Initializing secure interface...",
    "SEC_CORE_SYS: Access point established at edge node.",
    "SEC_CORE_SYS: Enter access credentials to establish uplink."
  ]);

  // Handle tactical simulator loop logging
  useEffect(() => {
    if (showSystemModal) {
      const logsSequence = [
        "UPLINK_STATUS: Searching for carrier...",
        "NODE_DETECTED: Region 4 - SECURE",
        "HW_ENCRYPT: ECDSA 384-bit Handshake active",
        "GRID_COORDS: LAT 47.60 // LNG -122.33 loaded",
        "SYNC: Frame rate stable // Delay: 1.4ms"
      ];
      
      let timer: any;
      let currentIndex = 0;
      
      const addNextLog = () => {
        if (currentIndex < logsSequence.length) {
          setTerminalLogs((prev) => [...prev, `SYS_TICK: ${logsSequence[currentIndex]}`]);
          currentIndex++;
          timer = setTimeout(addNextLog, 1500);
        }
      };

      timer = setTimeout(addNextLog, 1200);
      return () => clearTimeout(timer);
    } else {
      setPasscode("");
      setSimStatus("IDLE");
      setTerminalLogs([
        "SEC_CORE_SYS: Initializing secure interface...",
        "SEC_CORE_SYS: Access point established at edge node.",
        "SEC_CORE_SYS: Enter access credentials to establish uplink."
      ]);
    }
  }, [showSystemModal]);

  const handleLaunchApp = () => {
    setShowSystemModal(true);
  };

  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) return;
    
    setSimStatus("AUTHORIZING");
    setTerminalLogs((prev) => [...prev, `UPLINK_REQ: Sending access token '${passcode.substring(0, 3)}****'...`]);
    
    setTimeout(() => {
      if (passcode.toLowerCase() === "admin" || passcode === "1337" || passcode.length >= 4) {
        setSimStatus("GRANTED");
        setTerminalLogs((prev) => [...prev, "SEC_CORE_SYS: ACCESS GRANTED. Initializing system overlay...", "SEC_CORE_SYS: Connection established with 100% telemetry."]);
      } else {
        setSimStatus("DENIED");
        setTerminalLogs((prev) => [...prev, "ERROR: ACCESS DENIED. Hex signature mismatch."]);
      }
    }, 1200);
  };

  const handleActionToast = (actionName: string) => {
    setTerminalLogs((prev) => [...prev, `UI_EVENT: Triggered action '${actionName}'`]);
    alert(`LOADRYX System Console:\nTriggered tactical protocol navigation to [${actionName}].\nThis interactive demo connects perfectly in live preview.`);
  };

  return (
    <div 
      id="main-app" 
      className="relative w-full min-h-screen overflow-x-hidden bg-[#02070D] text-[#F4F6F8] font-rajdhani select-none flex flex-col pt-[90px]"
    >
      {/* Top Navigation Frame */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLaunchApp={handleLaunchApp} 
      />

      {/* Decorative top header neon line */}
      <div id="top-neon-bar" className="fixed top-[90px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0383F4]/40 to-transparent z-40 pointer-events-none" />

      {/* Main viewport */}
      <main 
        id="hero-viewport" 
        className="w-full flex-1 flex flex-col justify-between px-[6%] sm:px-[8%] relative min-h-[calc(100vh-90px)]"
      >
        {/* Layer 1: BOTTOM - Hero Video Background with Poster & Fallback controls */}
        <div id="hero-video-background-layer" className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
          {/* Static fallback image shown as:
              1) loading-state placeholder,
              2) movie/video poster fallback,
              3) mobile performance fallback,
              4) error-state fallback when network/CORS restricts video playback */}
          {(!videoPlaying || videoError) && (
            <img
              id="hero-fallback-image-screen"
              src="https://res.cloudinary.com/dmp1fo2j4/image/upload/v1779615291/X1_ssbgi6.png"
              alt="LOADRYX Video Fallback Soldier"
              className="absolute inset-y-0 right-0 w-full lg:w-[62%] h-full object-cover object-center lg:object-right-bottom opacity-85 contrast-[1.12] brightness-[0.85] transition-opacity duration-700"
              referrerPolicy="no-referrer"
            />
          )}

          {/* Core high-end video asset */}
          {!videoError && (
            <video
              id="hero-core-video"
              src="https://res.cloudinary.com/dmp1fo2j4/video/upload/v1779615308/X_ewvi3o.mp4"
              poster="https://res.cloudinary.com/dmp1fo2j4/image/upload/v1779615291/X1_ssbgi6.png"
              autoPlay
              loop
              muted
              playsInline
              onPlaying={() => setVideoPlaying(true)}
              onError={() => {
                setVideoError(true);
                setVideoPlaying(false);
              }}
              className="absolute inset-y-0 right-0 w-full lg:w-[62%] h-full object-cover object-center lg:object-right-bottom opacity-[0.88] mix-blend-screen transition-opacity duration-700"
              referrerPolicy="no-referrer"
            />
          )}

          {/* Elegant cinematic gradients blending the video/poster assets into primary #02070D background */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-[50%] bg-gradient-to-r from-[#02070D] via-[#02070D]/85 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-[22%] bg-gradient-to-t from-[#02070D] via-[#02070D]/95 to-transparent z-10" />
          <div className="absolute top-0 right-0 w-[15%] h-full bg-gradient-to-l from-[#02070D]/40 to-transparent z-10" />
        </div>

        {/* Layer 2: MIDDLE - Interactive Canvas Particles */}
        <ParticleCanvas />

        {/* Layer 3: Background HUD graphics */}
        <BackgroundHUD />

        {/* Layer 4: TOP - Text & Content Layer */}
        <div 
          id="hero-layout-grid" 
          className="flex-1 w-full flex flex-col lg:flex-row items-center justify-between pt-10 lg:pt-14 pb-8 relative z-10"
        >
          {/* Left Hero Brand Interface */}
          <HeroContent 
            onExploreFeatures={() => handleActionToast("EXPLORE FEATURES")}
            onLearnMore={() => handleActionToast("LEARN MORE")}
          />
          
          {/* Right spacer allowing background video & fallback soldier to display cleanly without masking interactions */}
          <div id="hero-right-spacer" className="hidden lg:block lg:w-[50%] pointer-events-none" />
        </div>

        {/* Bottom embedded Feature Bar */}
        <div id="feature-bar-wrapper" className="w-full flex justify-center pb-12 relative z-30">
          <FeatureBar />
        </div>
      </main>

      {/* Cyber/Tactical security gateway modal (Launch App overlay flow) */}
      {showSystemModal && (
        <div 
          id="tactical-modal" 
          className="fixed inset-0 w-full h-full bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300"
        >
          {/* Modal Container */}
          <div 
            id="tactical-modal-card" 
            className="w-full max-w-[560px] bg-[#071018] border border-[#0B1A25] relative rounded-none shadow-2xl p-6 md:p-8"
          >
            {/* Direct pixel corners to align with futuristic theme */}
            <div className="absolute top-0 left-0 w-3 h-[1px] bg-[#0383F4] shadow-[0_0_8px_#0383F4]" />
            <div className="absolute top-0 left-0 w-[1px] h-3 bg-[#0383F4] shadow-[0_0_8px_#0383F4]" />
            <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-[#0383F4] shadow-[0_0_8px_#0383F4]" />
            <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-[#0383F4] shadow-[0_0_8px_#0383F4]" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#0B1A25] pb-4 mb-5">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-[#0383F4] animate-pulse" />
                <span className="font-orbitron font-bold text-white tracking-widest text-[13px]">SECURE_GATEWAY // ACT_V4</span>
              </div>
              <button 
                id="close-modal-btn"
                onClick={() => setShowSystemModal(false)}
                className="text-[#9AA3AA] hover:text-white transition-colors text-xs font-tech tracking-wider cursor-pointer focus:outline-none"
              >
                [CLOSE_X]
              </button>
            </div>

            {/* Terminal logs readout area */}
            <div id="modal-terminal-screen" className="bg-[#00040A] rounded-none p-4 h-[160px] overflow-y-auto mb-6 border border-[#0B1A25] font-tech text-[11px] leading-[1.6] text-emerald-400 flex flex-col gap-1.5 scrollbar-thin">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-[#0383F4] select-none">&gt;&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>

            {/* Authorization Flow */}
            {simStatus === "IDLE" || simStatus === "DENIED" ? (
              <form id="auth-code-form" onSubmit={handleAuthorize} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs uppercase text-[#9AA3AA] tracking-[0.2em] font-semibold">
                    <label htmlFor="passcode-input">ENTER ACCESS PASSCODE</label>
                    <span className="text-[#0383F4] font-normal lowercase">(hint: admin)</span>
                  </div>
                  <div className="relative">
                    <input
                      id="passcode-input"
                      type="password"
                      placeholder="••••••••"
                      value={passcode}
                      onChange={(e) => {
                        setPasscode(e.target.value);
                        if (simStatus === "DENIED") setSimStatus("IDLE");
                      }}
                      className="w-full bg-[#00040A] border border-[#0B1A25] rounded-none text-white px-4 py-3 text-sm tracking-widest font-mono focus:outline-none focus:border-[#0383F4] transition-colors"
                      required
                      autoFocus
                    />
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9AA3AA]/50" />
                  </div>
                  {simStatus === "DENIED" && (
                    <span className="text-red-500 font-tech text-[10px] tracking-wider mt-1 flex items-center gap-1.5 animate-pulse">
                      <AlertCircle className="w-3.5 h-3.5" /> INVALID SIGNATURE KEY. ACCESS SUSPENDED.
                    </span>
                  )}
                </div>

                <div className="flex gap-4 items-center mt-2">
                  <button
                    id="submit-auth-btn"
                    type="submit"
                    className="flex-1 h-[46px] bg-[#0383F4] hover:bg-[#005CC2] text-white font-orbitron font-bold tracking-[0.16em] text-[11px] uppercase rounded-none transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(3,131,244,0.3)]"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>AUTHORIZE LINK</span>
                  </button>
                  <button
                    id="bypass-auth-btn"
                    type="button"
                    onClick={() => {
                      setPasscode("admin");
                      setSimStatus("GRANTED");
                    }}
                    className="px-4 h-[46px] border border-[#0B1A25] hover:border-[#0383F4] text-[#9AA3AA] hover:text-white font-rajdhani text-[11px] font-bold tracking-widest uppercase rounded-none transition-all cursor-pointer"
                  >
                    BYPASS
                  </button>
                </div>
              </form>
            ) : simStatus === "AUTHORIZING" ? (
              <div id="auth-status-authorizing" className="flex flex-col items-center justify-center py-6 gap-3">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <span className="absolute inset-0 border-4 border-[#0383F4]/20 border-t-2 border-t-[#0383F4] rounded-full animate-spin" />
                  <Cpu className="w-5 h-5 text-[#0383F4]" />
                </div>
                <span className="font-orbitron text-xs text-[#0383F4] tracking-[0.2em] uppercase animate-pulse">CONDUCTING PROTOCOL HANDSHAKE...</span>
              </div>
            ) : (
              <div id="auth-status-granted" className="flex flex-col items-center justify-center py-5 gap-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
                <div className="text-center">
                  <h4 className="font-orbitron font-bold text-white tracking-widest text-[14px] uppercase">SECURE CHANNEL LINKED</h4>
                  <p className="text-[11px] text-[#9AA3AA] font-tech mt-1 tracking-wider max-w-[320px] mx-auto leading-relaxed">
                    LOADRYX telemetry uplink secured. Interface connected.
                  </p>
                </div>
                <button
                  id="success-continue-btn"
                  onClick={() => setShowSystemModal(false)}
                  className="w-full sm:w-[220px] h-[40px] bg-emerald-500 hover:bg-emerald-600 text-[#02070D] text-[11px] font-bold tracking-widest font-orbitron uppercase rounded-none transition-colors cursor-pointer flex items-center justify-center"
                >
                  ENTER ENVIRONMENT
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
