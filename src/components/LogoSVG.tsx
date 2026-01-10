import React from 'react';

const LogoSVG = () => {
  return (
    <svg width="220" height="50" viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8">
      <defs>
        <filter id="plasma-pulse-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          
          <feFlood flood-color="#06b6d4" flood-opacity="0.8" result="glowColor">
            <animate 
                attributeName="flood-opacity" 
                values="0.9; 0.4; 0.9" 
                dur="2.5s" 
                repeatCount="indefinite" 
                calcMode="spline" 
                keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
            />
          </feFlood>
          
          <feComposite in="glowColor" in2="blur" operator="in" result="softGlow"/>
          <feMerge>
            <feMergeNode in="softGlow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <linearGradient id="ship-gradient-heat" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#e2e8f0"/> 
          <stop offset="100%" stop-color="#475569"/> 
        </linearGradient>
      </defs>

      <g transform="translate(10, 5)">
        
        <path d="M 38 5 Q 48 20 38 35" stroke="#06b6d4" stroke-width="3" stroke-linecap="round" filter="url(#plasma-pulse-glow)"/>
        
        <path d="M 2 12 L 35 20 L 2 28 L 10 20 Z" fill="url(#ship-gradient-heat)" stroke="#0f172a" stroke-width="0.5"/>
        
        <path d="M -2 16 L 6 18" stroke="#06b6d4" stroke-width="1.5" opacity="0.5"/>
        <path d="M -2 24 L 6 22" stroke="#06b6d4" stroke-width="1.5" opacity="0.5"/>
      </g>

      <text x="65" y="32" font-family="ui-sans-serif, system-ui, sans-serif" font-weight="900" font-size="24" letter-spacing="-0.05em">
        <tspan fill="#ffffff">ORBITAL</tspan>
        <tspan dx="4" fill="#22d3ee">PRIME</tspan>
      </text>
    </svg>
  );
};

export default LogoSVG;