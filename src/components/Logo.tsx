import React from 'react';

const Logo = ({ className = "w-64" }) => {
  return (
    <svg className={className} viewBox="0 0 400 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="blue-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="
              0 0 0 0 0
              0 0 0 0 0.7
              0 1 0 0 1
              0 0 0 1 0" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <linearGradient id="metal-text" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor:'#A0A0A0', stopOpacity:1}} />
          <stop offset="50%" style={{stopColor:'#FFFFFF', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#A0A0A0', stopOpacity:1}} />
        </linearGradient>

        <linearGradient id="metal-arrow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#1a2a6c', stopOpacity:1}} />
          <stop offset="50%" style={{stopColor:'#4286f4', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#00d2ff', stopOpacity:1}} />
        </linearGradient>
      </defs>

      <g transform="translate(10, 15) scale(0.8)">
        <path d="M 10,0 L 60,30 L 10,60 L 25,30 Z" fill="url(#metal-arrow)" stroke="#add8e6" strokeWidth="1"/>
        <path d="M 0,10 L 30,30 L 0,50 L 10,30 Z" fill="#152238" stroke="#4286f4" strokeWidth="0.5"/>

        <circle cx="45" cy="30" r="5" fill="#FFFFFF" filter="url(#blue-glow)" />
        <circle cx="45" cy="30" r="2" fill="#FFFFFF" />
      </g>

      <text x="100" y="48" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontWeight="bold" fontSize="28" letterSpacing="2" fill="url(#metal-text)" style={{textTransform: 'uppercase'}}>
        Orbital Prime
      </text>
    </svg>
  );
};

export default Logo;