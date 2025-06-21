import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TerminalInterface from './components/TerminalInterface';
import { useKonamiCode } from './hooks/useKonamiCode';
import PortfolioBootSequence from './components/Blue';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef(null);
  const [showBootSequence, setShowBootSequence] = useState(true);
  const { isActivated: isTerminalActive, deactivate: deactivateTerminal } = useKonamiCode();

  const handleBootComplete = () => {
    setShowBootSequence(false);
  };

  useEffect(() => {
    // Console Easter egg
    console.log(`
    ╔═══════════════════════════════════════════════════╗
    ║  🚀 Welcome to Rushist's Portfolio Console!      ║
    ║  Type 'portfolio.secrets()' for hidden features  ║
    ║  🎮 Try the Konami Code: ↑↑↓↓←→←→BA              ║
    ╚═══════════════════════════════════════════════════╝
    `);
    
    (window as any).portfolio = {
      secrets: () => {
        console.log('🎮 Konami Code: ↑↑↓↓←→←→BA - Try it!');
        
        
        
        console.log('🎯 Easter Eggs: Multiple hidden features throughout');
      },
      terminal: () => {
        console.log('🖥️ Terminal mode can be activated with the Konami Code!');
        console.log('Commands available: help, ls, cat, skills, contact, whoami');
      },
      skipBoot: () => {
        setShowBootSequence(false);
        console.log('🚀 Boot sequence skipped!');
      }
    };

    // Smooth scroll setup
    const handleSmoothScroll = () => {
      gsap.registerPlugin(ScrollTrigger);
      
      // Refresh ScrollTrigger on resize
      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener('resize', handleResize);
      
      return () => window.removeEventListener('resize', handleResize);
    };

    handleSmoothScroll();
  }, []);

  return (
    <div ref={appRef} className="bg-gray-900 text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 pointer-events-none" />
      
      {/* Boot Sequence */}
      {showBootSequence && (
        <PortfolioBootSequence onBootComplete={handleBootComplete} />
      )}
      
      {/* Terminal Interface Overlay */}
      {!showBootSequence && (
        <TerminalInterface 
          isActive={!isTerminalActive} 
          onClose={deactivateTerminal} 
        />
      )}
      
      {/* Main Portfolio Content */}
      {!showBootSequence && (
        <div className={isTerminalActive ? 'hidden' : 'block'}>
          
          
        </div>
      )}
    </div>
  );
}

export default App;


