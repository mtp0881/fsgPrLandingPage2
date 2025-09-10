'use client';

import { useEffect, useState } from 'react';

interface ImageOptimizerProps {
  criticalImages?: string[];
}

export default function ImageOptimizer({ criticalImages = [] }: ImageOptimizerProps) {
  useEffect(() => {
    // Preload critical images
    criticalImages.forEach((src) => {
      if (typeof window !== 'undefined') {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      }
    });
  }, [criticalImages]);

  useEffect(() => {
    // Implement lazy loading for non-critical images
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      });

      // Observe all lazy images
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach((img) => imageObserver.observe(img));

      return () => {
        lazyImages.forEach((img) => imageObserver.unobserve(img));
      };
    }
  }, []);

  return null;
}

// Utility function to create optimized image URLs
export function optimizeImageUrl(url: string, width?: number, quality: number = 75): string {
  // For Cloudinary URLs, add optimization parameters
  if (url.includes('cloudinary.com')) {
    const baseUrl = url.split('/upload/')[0];
    const imagePath = url.split('/upload/')[1];
    
    let transformations = [`q_${quality}`, 'f_auto'];
    if (width) {
      transformations.push(`w_${width}`);
    }
    
    return `${baseUrl}/upload/${transformations.join(',')}/${imagePath}`;
  }
  
  return url;
}

// Hook for progressive image loading
export function useProgressiveImage(lowQualitySrc: string, highQualitySrc: string) {
  const [src, setSrc] = useState(lowQualitySrc);
  
  useEffect(() => {
    const img = new Image();
    img.src = highQualitySrc;
    img.onload = () => {
      setSrc(highQualitySrc);
    };
  }, [highQualitySrc]);
  
  return src;
}
