import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};

export const useInView = (threshold: number = 0.3) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, threshold]);

  return { ref: setRef, isInView };
};

export const useScrollTrigger = (sectionId: string) => {
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate how far through the section we are
      const scrolled = viewportHeight - rect.top;
      const totalScrollableHeight = sectionHeight + viewportHeight;
      const sectionProgress = Math.max(0, Math.min(1, scrolled / totalScrollableHeight));
      
      setProgress(sectionProgress);

      // Determine active year based on progress
      const years = [2022, 2023, 2024, 2025];
      const yearIndex = Math.min(
        Math.floor(sectionProgress * years.length),
        years.length - 1
      );
      
      if (sectionProgress > 0.1 && sectionProgress < 0.95) {
        setActiveYear(years[yearIndex]);
      } else {
        setActiveYear(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionId]);

  return { activeYear, progress };
};
