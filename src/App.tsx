import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TerminalInterface from './components/TerminalInterface';
import PortfolioBootSequence from './components/Blue';
import './index.css';


gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef(null);
  const [showBootSequence, setShowBootSequence] = useState(true);

  const handleBootComplete = () => {
    console.log('Boot sequence completed, switching to terminal');
    setShowBootSequence(false);
  };

  useEffect(() => {
    // Console Easter egg
    console.log(`
    ╔═══════════════════════════════════════════════════╗
    ║  🚀 Welcome to Rushist's Portfolio Console!      ║
    ╚═══════════════════════════════════════════════════╝
    `);
    
    (window as any).portfolio = {
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
      
      {/* Terminal Interface - Shows after boot sequence */}
      {!showBootSequence && (
        <>
          <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 9999, color: 'red' }}>
            DEBUG: Terminal should be visible now
          </div>
          <TerminalInterface 
            isActive={true} 
            onClose={() => console.log('Terminal close attempted')} 
          />
        </>
      )}
    </div>
  );
}

export default App;