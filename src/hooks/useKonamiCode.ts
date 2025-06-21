import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA'
];

export const useKonamiCode = () => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent activation when typing in inputs
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      setSequence(prev => {
        const newSequence = [...prev, event.code];
        
        // Keep only the last 10 keys
        if (newSequence.length > KONAMI_CODE.length) {
          newSequence.shift();
        }
        
        // Check if the sequence matches the Konami code
        if (newSequence.length === KONAMI_CODE.length) {
          const matches = newSequence.every((key, index) => key === KONAMI_CODE[index]);
          if (matches) {
            setIsActivated(true);
            // Play activation sound effect (optional)
            console.log('🎮 KONAMI CODE ACTIVATED! Welcome to the Matrix...');
            return [];
          }
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const deactivate = () => {
    setIsActivated(false);
    setSequence([]);
  };

  return { isActivated, deactivate };
};