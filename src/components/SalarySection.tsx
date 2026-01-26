import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Banknote, TrendingUp, Calendar } from 'lucide-react';
import { StoryChart } from './StoryChart';
import { NarrativeCallout } from './NarrativeCallout';
import { YearSelector } from './YearSelector';
import { salaryData, salaryNarratives, formatNumber } from '@/lib/data';

export const SalarySection = () => {
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [highlightedYear, setHighlightedYear] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-20%' });

  // Scroll-based year highlighting
  useEffect(() => {
    if (!sectionRef.current) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = -rect.top;
      const sectionHeight = rect.height - window.innerHeight;
      
      if (sectionTop < 0 || sectionTop > sectionHeight) {
        setHighlightedYear(null);
        return;
      }

      const progress = sectionTop / sectionHeight;
      const years = [2022, 2023, 2024, 2025];
      const yearIndex = Math.min(Math.floor(progress * years.length), years.length - 1);
      setHighlightedYear(years[yearIndex]);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stats
  const startValue = 731.2;
  const latestData = salaryData[salaryData.length - 1].data;
  const endValue = latestData[latestData.length - 1].value;
  const totalGrowth = ((endValue - startValue) / startValue) * 100;
  const peakValue = 1247.3;
  const avgValue = Math.round((endValue + 1000) / 2);

  return (
    <section
      ref={sectionRef}
      id="salary-section"
      className="relative py-24 md:py-32"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Banknote className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Salary Trends</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            The Compensation Story
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            IT salaries surged and stabilized—from 731K to over 1,000K AMD, making tech the most lucrative sector in Armenia.
          </p>
        </motion.div>

        {/* Key stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12"
        >
          <div className="text-center p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-2xl md:text-3xl font-display font-bold text-foreground">
              +{totalGrowth.toFixed(0)}%
            </div>
            <div className="text-xs text-muted-foreground">Since 2022</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-2xl md:text-3xl font-display font-bold text-accent">
              {formatNumber(peakValue, 0)}K
            </div>
            <div className="text-xs text-muted-foreground">Peak (Dec 2024)</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-2xl md:text-3xl font-display font-bold text-year-2025">
              3-4×
            </div>
            <div className="text-xs text-muted-foreground">vs National Avg</div>
          </div>
        </motion.div>

        {/* Year selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <YearSelector
            years={[2022, 2023, 2024, 2025]}
            activeYear={activeYear}
            onYearChange={setActiveYear}
          />
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Chart column - reversed order for visual variety */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 order-2 lg:order-1"
          >
            <StoryChart
              data={salaryData}
              activeYear={activeYear}
              highlightedYear={highlightedYear}
              unit="K AMD"
              yAxisDomain={[700, 1300]}
            />
            
            {/* Context note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 p-4 rounded-xl bg-muted/30 border border-border/30"
            >
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Pattern:</strong> Notice the December spikes each year—these reflect year-end bonuses typical in the IT sector. The baseline monthly salary has stabilized around 1,000K AMD (~$2,500 USD).
              </p>
            </motion.div>
          </motion.div>

          {/* Narrative column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1 space-y-4 order-1 lg:order-2"
          >
            <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              Wage Evolution
            </h3>
            {salaryNarratives.map((narrative) => (
              <NarrativeCallout
                key={narrative.year}
                narrative={narrative}
                isActive={highlightedYear === narrative.year || activeYear === narrative.year}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
