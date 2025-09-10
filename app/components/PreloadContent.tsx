'use client';

import { useEffect } from 'react';

export default function PreloadContent() {
  useEffect(() => {
    // Preload content API in the background
    const preloadContent = async () => {
      try {
        const response = await fetch('/api/content');
        if (response.ok) {
          const data = await response.json();
          // Content will be cached in the hook's global cache
          console.log('Content preloaded successfully');
        }
      } catch (error) {
        console.log('Content preload failed:', error);
      }
    };

    // Start preloading immediately but don't block rendering
    preloadContent();
  }, []);

  return null; // This component doesn't render anything
}
