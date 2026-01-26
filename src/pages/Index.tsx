import { useEffect } from 'react';
import { ScrollProgress } from '@/components/ScrollProgress';
import { HeroSection } from '@/components/HeroSection';
import { EmploymentSection } from '@/components/EmploymentSection';
import { SalarySection } from '@/components/SalarySection';
import { InsightSection } from '@/components/InsightSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  // Enable dark mode by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      
      <main>
        <HeroSection />
        <EmploymentSection />
        <SalarySection />
        <InsightSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
