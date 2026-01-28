import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Calendar, BarChart3, TrendingUp } from 'lucide-react';
import { StoryChart } from './StoryChart';
import { TimelineChart } from './TimelineChart';
import { NarrativeCallout } from './NarrativeCallout';
import { YearSelector } from './YearSelector';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { employmentData, employmentNarratives, formatNumber } from '@/lib/data';

export const EmploymentSection = () => {
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-20%' });

  // Stats
  const startValue = 23.0;
  const endValue = employmentData[employmentData.length - 1].data[employmentData[employmentData.length - 1].data.length - 1].value;
  const totalGrowth = ((endValue - startValue) / startValue) * 100;
  const peakValue = 33.1;

  return (
    <section
      ref={sectionRef}
      id="employment-section"
      className="relative py-24 md:py-32"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-year-2022/10 border border-year-2022/20 mb-6">
            <Users className="w-4 h-4 text-year-2022" />
            <span className="text-sm font-medium text-year-2022">Employment Trends</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            The Workforce Journey
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From 23,000 to {formatNumber(endValue, 1)}K employees—a story of rapid growth, stabilization, and the emergence of a mature tech sector.
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
            <div className="text-xs text-muted-foreground">Total Growth</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-2xl md:text-3xl font-display font-bold text-year-2022">
              {peakValue}K
            </div>
            <div className="text-xs text-muted-foreground">Peak (Dec 2022)</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-card/50 border border-border/50">
            <div className="text-2xl md:text-3xl font-display font-bold text-year-2025">
              {formatNumber(endValue, 1)}K
            </div>
            <div className="text-xs text-muted-foreground">Current</div>
          </div>
        </motion.div>

        {/* Controls: Year selector + Timeline toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          {!showTimeline && (
            <YearSelector
              years={[2022, 2023, 2024, 2025]}
              activeYear={activeYear}
              onYearChange={setActiveYear}
            />
          )}
          
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm">
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
            <Label htmlFor="timeline-toggle-emp" className="text-sm text-muted-foreground cursor-pointer">
              Full Timeline
            </Label>
            <Switch
              id="timeline-toggle-emp"
              checked={showTimeline}
              onCheckedChange={setShowTimeline}
            />
          </div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Narrative column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1 space-y-4"
          >
            <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Year by Year
            </h3>
            {employmentNarratives.map((narrative) => (
              <NarrativeCallout
                key={narrative.year}
                narrative={narrative}
                isActive={activeYear === narrative.year}
              />
            ))}
          </motion.div>

          {/* Chart column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            {showTimeline ? (
              <TimelineChart
                data={employmentData}
                unit="K people"
                yAxisDomain={[20, 35]}
              />
            ) : (
              <StoryChart
                data={employmentData}
                activeYear={activeYear}
                highlightedYear={null}
                unit="K people"
                yAxisDomain={[20, 35]}
              />
            )}
            
            {/* Context note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 p-4 rounded-xl bg-muted/30 border border-border/30"
            >
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Key insight:</strong> The dramatic 2022 growth (+44%) was largely driven by tech professionals relocating to Armenia during regional geopolitical shifts. Favorable tax policies and a welcoming tech ecosystem accelerated this trend.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
