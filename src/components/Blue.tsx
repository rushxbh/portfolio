// PortfolioBootSequence.js - Fixed version
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ASCIIText from './ascii.tsx';
import SplashCursor from './splash.tsx';
import GradientText from'./gradtext.tsx';



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
  
  const playBeep = (frequency = 800, duration = 100) => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + duration / 1000);
    
    oscillator.start(audioContext.current.currentTime);
    oscillator.stop(audioContext.current.currentTime + duration / 1000);
  };

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
      
      playBeep(400, 200);
      
      setTimeout(() => setScene(1), 3500);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isSkipped]);

  // Scene 2: Restart & Update
  useEffect(() => {
    if (scene !== 1 || isSkipped) return;
    
    playBeep(600, 150);
    
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

  // Scene 3: BIOS Password
  useEffect(() => {
    if (scene !== 2 || isSkipped) return;
    
    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    // Auto-fill password after 1.5s
    const timer = setTimeout(() => {
      let index = 0;
      const name = "Rushist";
      const typeInterval = setInterval(() => {
        if (index < name.length) {
          setPasswordInput(prev => prev + name[index]);
          playBeep(800, 50);
          index++;
        } else {
          clearInterval(typeInterval);
          // Press Enter after typing
          setTimeout(() => {
            playBeep(1000, 100);
            if (glitchRef.current) {
              gsap.to(glitchRef.current, {
                duration: 0.1,
                opacity: 0.8,
                repeat: 1,
                yoyo: true
              });
            }
            setTimeout(() => setScene(3), 1500);
          }, 500);
        }
      }, 200);
    }, 1500);
    
    return () => {
      clearInterval(cursorInterval);
      clearTimeout(timer);
    };
  }, [scene, isSkipped]);

  // Scene 4: Welcome
  useEffect(() => {
    if (scene !== 3 || isSkipped) return;
    
    if (welcomeTextRef.current) {
      gsap.fromTo(welcomeTextRef.current,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 0.5,
          onComplete: () => {
            // Type out welcome message with beeps
            const text = "Welcome back, Rushist.";
            let index = 0;
            const typeInterval = setInterval(() => {
              if (index < text.length) {
                playBeep(900, 80);
                index++;
              } else {
                clearInterval(typeInterval);
                // Hold for 2s then complete boot sequence
                setTimeout(() => {
                  gsap.to(welcomeTextRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                      if (onBootComplete) {
                        onBootComplete();
                      }
                    }
                  });
                }, 2000);
              }
            }, 100);
          }
        }
      );
    }
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

  // Don't render if skipped or boot complete
  if (isSkipped && onBootComplete) {
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
      
      {/* Scene 2: BIOS Password */}


      
      {/* Scene 3: Welcome */}
      {scene === 2 && (
        <div className="flex items-center justify-center min-h-screen bg-black">
          <GradientText
  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={3}
  showBorder={false}
  className="custom-class"
>
  Loading Portfolio...
</GradientText>
         <SplashCursor/>
          
        </div>
      )}
    </div>
  );
};

export default PortfolioBootSequence;