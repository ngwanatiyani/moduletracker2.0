
import { useState, useEffect, useCallback } from 'react';

export const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);

  const updateScrollY = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollY();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial scroll position
    updateScrollY();
    
    window.addEventListener('scroll', handleScroll, { 
      passive: true,
      capture: false 
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateScrollY]);

  return scrollY;
};
