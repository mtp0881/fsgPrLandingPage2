import { useState, useEffect } from 'react';
import { useLanguage } from '../app/contexts/LanguageContext';

interface SlidesData {
  finance: string[];
  legacy: string[];
  public: string[];
  salesforce: string[];
  fpt: string[];
}

interface ContentSection {
  [key: string]: any;
  slides?: SlidesData;
}

interface ContentData {
  ja: ContentSection;
  en: ContentSection;
}

// Global cache to avoid refetching
let globalContentCache: ContentData | null = null;
let isLoading = false;
let loadingPromise: Promise<ContentData> | null = null;

export function useContent() {
  const { language } = useLanguage();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      // If content is already cached, use it immediately
      if (globalContentCache) {
        setContent(globalContentCache[language]);
        return;
      }

      // If already loading, wait for the existing promise
      if (isLoading && loadingPromise) {
        try {
          setLoading(true);
          const cachedContent = await loadingPromise;
          setContent(cachedContent[language]);
          setLoading(false);
        } catch (error) {
          console.error('Error loading cached content:', error);
          setError('Failed to load content');
          setLoading(false);
        }
        return;
      }

      // Start new loading
      isLoading = true;
      setLoading(true);
      
      loadingPromise = fetch('/api/content')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch content');
          }
          return response.json() as Promise<ContentData>;
        })
        .then(data => {
          globalContentCache = data;
          isLoading = false;
          return data;
        })
        .catch(err => {
          console.error('Error fetching content:', err);
          isLoading = false;
          throw err;
        });

      try {
        const data = await loadingPromise;
        setContent(data[language]);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to load content');
        setLoading(false);
      }
    };

    fetchContent();
  }, [language]);

  return { content, loading, error };
}
