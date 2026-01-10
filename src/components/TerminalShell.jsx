'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import '@/styles/terminal.css';

const TerminalShell = () => {
  const { t } = useLanguage();
  const [terminalLines, setTerminalLines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const terminalMessages = [
    { text: "ORB PRIME :: ADMIN OS v2.1.4", type: "header" },
    { text: "INITIALIZING SYSTEM...", type: "info" },
    { text: "LOADING KERNEL MODULES...", type: "info" },
    { text: "NVIDIA GPU DETECTED: RTX A6000", type: "success" },
    { text: "AZURE GOV CONNECTION: SECURE", type: "success" },
    { text: "DATABASE CONNECTION: ESTABLISHED", type: "success" },
    { text: "CAMERA FEEDS: 196/200 ACTIVE", type: "success" },
    { text: "NEURAL-NET CORE: ONLINE", type: "success" },
    { text: "COACTIVE IA: OPERATIONAL", type: "success" },
    { text: "SYSTEM STATUS: ALL GREEN", type: "success" },
    { text: "READY FOR OPERATIONS", type: "ready" }
  ];

  useEffect(() => {
    if (currentIndex < terminalMessages.length) {
      const timer = setTimeout(() => {
        setTerminalLines(prev => [...prev, terminalMessages[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, terminalMessages.length]);

  return (
    <div className="bg-black/90 border-t border-slate-700 p-3 font-mono text-xs h-32 overflow-hidden">
      <div className="text-cyan-400 mb-2 flex items-center">
        <span className="mr-2">{'>'}</span>
        <span className="text-slate-500">{t('admin_os.sys_shell') || 'SYS.SHELL'}</span>
      </div>
      <div className="h-24 overflow-y-auto space-y-1 hide-scrollbar">
        {terminalLines.map((line, index) => (
          <div 
            key={index} 
            className={`${
              line.type === 'header' ? 'text-cyan-400' : 
              line.type === 'success' ? 'text-emerald-400' : 
              line.type === 'ready' ? 'text-green-400 animate-pulse' : 
              'text-slate-300'
            }`}
          >
            {line.text}
          </div>
        ))}
        {currentIndex >= terminalMessages.length && (
          <div className="text-cyan-400 animate-pulse">_</div>
        )}
      </div>
    </div>
  );
};

export default TerminalShell;