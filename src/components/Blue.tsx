// PortfolioBootSequence.js - Fixed version
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ASCIIText from './ascii.tsx';
import SplashCursor from './splash.tsx';
import Dither from './dither.tsx';

const PortfolioBootSequence = ({ setCurrentScene, onBootComplete }) => {
  const [scene, setScene] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);
  
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const biosInputRef = useRef(null);
  const welcomeTextRef = useRef(null);
  const portfolioRef = useRef(null);
  const glitchRef = useRef(null);
  
  // Audio context for beeps and sounds
  const audioContext = useRef(null);
  
  

  const skipAnimation = () => {
    setIsSkipped(true);
    if (onBootComplete) {
      onBootComplete();
    }
  };

  // Scene 1: BSOD Flash
  useEffect(() => {
    if (isSkipped) return;
    
    const timer = setTimeout(() => {
      // Glitch effect
      if (glitchRef.current) {
        gsap.to(glitchRef.current, {
          duration: 0.1,
          repeat: 3,
          yoyo: true,
          skewX: 5,
          scaleX: 0.98,
          ease: "power2.inOut"
        });
      }
      
      // Progress bar animation from 0% to 100% with synced percentage text
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          width: '100%',
          duration: 3,
          ease: "power2.out",
          onUpdate: function() {
            // Get current progress as percentage and update text
            const currentWidth = this.progress() * 100;
            setProgressPercent(Math.floor(currentWidth));
          }
        });
      }
      
      
      
      setTimeout(() => setScene(1), 3500);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isSkipped]);

  // Scene 2: Restart & Update
  useEffect(() => {
    if (scene !== 1 || isSkipped) return;
    
   
    
    const timer = setTimeout(() => {
      if (progressBarRef.current) {
        gsap.fromTo(progressBarRef.current, 
          { width: '0%' },
          { width: '100%', duration: 3, ease: "power2.out" }
        );
      }
      
      setTimeout(() => setScene(2), 3500);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [scene, isSkipped]);

  // Scene 3: Loading Portfolio - THIS WAS MISSING THE COMPLETION LOGIC
  useEffect(() => {
    if (scene !== 2 || isSkipped) return;
    
    
    
    // Auto-complete the loading after 3 seconds
    const timer = setTimeout(() => {
      
      
      // Complete the boot sequence
      setTimeout(() => {
        if (onBootComplete) {
          onBootComplete();
        }
      }, 1000);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [scene, isSkipped, onBootComplete]);

  // Handle ESC key and clicks to skip
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && scene < 3) {
        skipAnimation();
      }
    };
    
    const handleClick = () => {
      if (scene < 3) {
        skipAnimation();
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClick);
    };
  }, [scene]);

  // Don't render if skipped
  if (isSkipped) {
    return null;
  }

  return (
    <div ref={containerRef} className="fixed inset-0 bg-black text-white font-mono overflow-hidden z-50">
      {/* Skip instruction */}
      {scene < 3 && (
        <div className="absolute top-4 right-4 text-sm text-gray-400 animate-pulse">
          Press ESC or click to skip
        </div>
      )}
      
      {/* Glitch overlay */}
      <div 
        ref={glitchRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* Scene 0: BSOD */}
      {scene === 0 && (
        <div className="flex items-center justify-center min-h-screen bg-blue-600 p-8">
          <div className="text-center max-w-2xl">
            <div className="text-8xl mb-8">:(</div>
            <div className="text-2xl mb-4">Your portfolio has run into a problem and needs to restart.</div>
            <div className="text-lg mb-8">We're just collecting some info, and then we'll restart for you.</div>
            <div className="text-xl mb-4">{progressPercent}% complete</div>
            <div className="w-full bg-blue-800 h-2 rounded">
              <div 
                ref={progressBarRef}
                className="bg-white h-2 rounded transition-all duration-300"
                style={{ width: '0%' }}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Scene 1: Restart */}
      {scene === 1 && (
        <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="text-center">
            <div className="text-2xl mb-8">Restarting...</div>
            <div className="text-lg mb-4">Configuring updates</div>
            <div className="text-lg mb-4">Do not turn off your computer</div>
            <div className="text-lg mb-8">Update 1 of 3...</div>
            <div className="w-96 bg-gray-800 h-4 rounded">
              <div 
                ref={progressBarRef}
                className="bg-green-500 h-4 rounded transition-all duration-1000"
                style={{ width: '0%' }}
              />
            </div>
          </div>
          <SplashCursor/>
        </div>
      )}
      
      {/* Scene 2: Loading Portfolio */}
      {scene === 2 && (
  <div className="relative flex items-center justify-center min-h-screen bg-black">
    {/* Background Layer (z-index: -1) */}
    <div style={{ 
      position: 'relative',
      width: '100%',
      height: '1000px',
      
    }}>
      <Dither
        waveColor={[0, 0.5, 0]}
        disableAnimation={false}
        enableMouseInteraction={true}
        mouseRadius={0.3}
        colorNum={4}
        waveAmplitude={0.3}
        waveFrequency={3}
        waveSpeed={0.05}
      />
    </div>

    {/* Content Layer (z-index: 50) */}
    <div className="absolute inset-0 flex w-[500px] items-center justify-center z-50">
      <ASCIIText
        text='Loading Portfolio...'
        enableWaves={false}
        asciiFontSize={5}
      />
    </div>
  </div>
)}
    </div>
  );
};

export default PortfolioBootSequence;