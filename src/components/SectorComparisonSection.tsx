import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ZAxis } from 'recharts';
import { sectorData, getSectorColor, formatSalary, formatEmployees, SectorData } from '@/lib/sectorData';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface NarrativeState {
  phase: 'initial' | 'high-paying' | 'mass-employment' | 'full';
  title: string;
  description: string;
}

const narrativeStates: NarrativeState[] = [
  {
    phase: 'initial',
    title: 'The Premium Sector',
    description: 'Information and communication—combining IT and telecommunications—stands as the highest-paying sector in Armenia\'s economy. At 850K AMD average salary, it leads by a significant margin.',
  },
  {
    phase: 'high-paying',
    title: 'High-Paying Specialists',
    description: 'Finance, Mining, Public Administration, and Transport follow—sectors requiring specialized skills. Together with IT & Telecom, these represent Armenia\'s economic premium tier.',
  },
  {
    phase: 'mass-employment',
    title: 'The Mass Employers',
    description: 'Trade, Education, Manufacturing, and Healthcare employ the bulk of the workforce—over 400,000 workers combined—but at significantly lower salary levels.',
  },
  {
    phase: 'full',
    title: 'Specialization vs. Scale',
    description: 'The pattern is clear: Information and communication excels in compensation, not headcount. Its position reflects productivity and specialization rather than employment volume.',
  },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as SectorData;
    return (
      <div className="glass-card p-4 rounded-lg border border-border/50 shadow-xl">
        <p className="font-display font-semibold text-foreground mb-2">{data.shortName}</p>
        <p className="text-sm text-muted-foreground">{data.sector}</p>
        <div className="mt-3 space-y-1">
          <p className="text-sm">
            <span className="text-muted-foreground">Avg. Salary: </span>
            <span className="font-semibold text-foreground">{data.avgSalary.toLocaleString()} AMD</span>
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">Employees: </span>
            <span className="font-semibold text-foreground">{data.employees.toLocaleString()}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const SectorComparisonSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [showAllEqual, setShowAllEqual] = useState(false);
  const [manualPhaseIndex, setManualPhaseIndex] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const [scrollPhase, setScrollPhase] = useState<NarrativeState['phase']>('initial');
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      if (value < 0.25) {
        setScrollPhase('initial');
      } else if (value < 0.4) {
        setScrollPhase('high-paying');
      } else if (value < 0.55) {
        setScrollPhase('mass-employment');
      } else {
        setScrollPhase('full');
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Use manual phase if set, otherwise use scroll-based phase
  const currentPhase = manualPhaseIndex !== null 
    ? narrativeStates[manualPhaseIndex].phase 
    : scrollPhase;
  const currentNarrative = narrativeStates.find(n => n.phase === currentPhase) || narrativeStates[0];
  
  const handleNextInsight = () => {
    const currentIndex = manualPhaseIndex !== null 
      ? manualPhaseIndex 
      : narrativeStates.findIndex(n => n.phase === scrollPhase);
    const nextIndex = (currentIndex + 1) % narrativeStates.length;
    setManualPhaseIndex(nextIndex);
  };
  
  const handlePrevInsight = () => {
    const currentIndex = manualPhaseIndex !== null 
      ? manualPhaseIndex 
      : narrativeStates.findIndex(n => n.phase === scrollPhase);
    const prevIndex = currentIndex === 0 ? narrativeStates.length - 1 : currentIndex - 1;
    setManualPhaseIndex(prevIndex);
  };

  const visibleSectors = useMemo(() => {
    return sectorData.map(sector => {
      let visible = false;
      let opacity = 0.15;

      if (showAllEqual) {
        visible = true;
        opacity = 1;
      } else {
        switch (currentPhase) {
          case 'initial':
            visible = sector.category === 'highlight';
            opacity = sector.category === 'highlight' ? 1 : 0;
            break;
          case 'high-paying':
            visible = sector.category === 'highlight' || sector.category === 'high-paying';
            opacity = visible ? (sector.category === 'highlight' ? 1 : 0.85) : 0;
            break;
          case 'mass-employment':
            visible = sector.category !== 'other';
            opacity = visible ? (sector.category === 'highlight' ? 1 : 0.75) : 0;
            break;
          case 'full':
            visible = true;
            opacity = sector.category === 'highlight' ? 1 : 0.6;
            break;
        }
      }

      return { ...sector, visible, opacity };
    });
  }, [currentPhase, showAllEqual]);

  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.2], [30, 0]);

  // Calculate bubble sizes - normalize employees to reasonable visual range
  const maxEmployees = Math.max(...sectorData.map(s => s.employees));
  const getBubbleSize = (employees: number) => {
    const minSize = 200;
    const maxSize = 2000;
    return minSize + (employees / maxEmployees) * (maxSize - minSize);
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-[200vh] relative py-32"
      id="sector-comparison"
    >
      {/* Sticky container for the visualization */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 md:px-8">
        {/* Background glow for IT sector emphasis */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="text-center mb-8"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              October 2025 • Cross-Sector Analysis
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              <span className="text-foreground">Positioning in the Economy</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              How does Information and communication compare to other sectors?
              <br />
              <span className="text-xs opacity-70 mt-1 inline-block">
                Note: This category includes IT, telecommunications, and related activities.
              </span>
            </p>
          </motion.div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-[1fr,400px] gap-8 items-center">
            {/* Chart container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-2xl p-4 md:p-6 border border-border/30"
            >
              <div className="h-[400px] md:h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
                    <XAxis
                      type="number"
                      dataKey="avgSalary"
                      name="Salary"
                      domain={[100000, 900000]}
                      tickFormatter={(value) => formatSalary(value)}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                      tickLine={{ stroke: 'hsl(var(--border))' }}
                      label={{ 
                        value: 'Average Salary (AMD)', 
                        position: 'bottom', 
                        offset: 40,
                        fill: 'hsl(var(--muted-foreground))',
                        fontSize: 12
                      }}
                    />
                    <YAxis
                      type="number"
                      dataKey="employees"
                      name="Employees"
                      domain={[0, 150000]}
                      tickFormatter={(value) => formatEmployees(value)}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                      tickLine={{ stroke: 'hsl(var(--border))' }}
                      label={{ 
                        value: 'Employees', 
                        angle: -90, 
                        position: 'insideLeft',
                        offset: -45,
                        fill: 'hsl(var(--muted-foreground))',
                        fontSize: 12
                      }}
                    />
                    <ZAxis
                      type="number"
                      dataKey="employees"
                      range={[200, 2000]}
                      domain={[0, maxEmployees]}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter data={visibleSectors} animationDuration={800}>
                      {visibleSectors.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getSectorColor(entry.category)}
                          fillOpacity={entry.opacity}
                          stroke={entry.category === 'highlight' ? 'hsl(200, 85%, 70%)' : 'transparent'}
                          strokeWidth={entry.category === 'highlight' ? 2 : 0}
                          style={{
                            filter: entry.category === 'highlight' && !showAllEqual 
                              ? 'drop-shadow(0 0 8px hsl(200, 85%, 60%))' 
                              : 'none',
                            transition: 'all 0.5s ease-out',
                          }}
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4 mt-4 pt-4 border-t border-border/30">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[hsl(200,85%,60%)] shadow-[0_0_8px_hsl(200,85%,60%)]" />
                  <span className="text-xs text-muted-foreground">IT & Telecom</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[hsl(160,70%,55%)]" />
                  <span className="text-xs text-muted-foreground">High-Paying</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[hsl(35,95%,60%)]" />
                  <span className="text-xs text-muted-foreground">Mass Employment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[hsl(220,20%,50%)]" />
                  <span className="text-xs text-muted-foreground">Other Sectors</span>
                </div>
              </div>
            </motion.div>

            {/* Narrative panel */}
            <div className="space-y-6">
              {/* Toggle */}
              <div className="flex items-center justify-end gap-3">
                <Label htmlFor="show-equal" className="text-sm text-muted-foreground cursor-pointer">
                  Show all equally
                </Label>
                <Switch
                  id="show-equal"
                  checked={showAllEqual}
                  onCheckedChange={setShowAllEqual}
                />
              </div>

              {/* Dynamic narrative with navigation */}
              <motion.div
                key={currentNarrative.phase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="story-callout"
                style={{ borderLeftColor: 'hsl(200, 85%, 60%)' }}
              >
                <h3 className="font-display font-semibold text-xl mb-3 text-foreground">
                  {currentNarrative.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {currentNarrative.description}
                </p>
                
                {/* Navigation buttons */}
                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border/30">
                  <button
                    onClick={handlePrevInsight}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-muted text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Prev
                  </button>
                  <span className="text-xs text-muted-foreground">
                    {narrativeStates.findIndex(n => n.phase === currentPhase) + 1} / {narrativeStates.length}
                  </span>
                  <button
                    onClick={handleNextInsight}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-muted text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </motion.div>

              {/* Progress indicators - clickable */}
              <div className="flex gap-2">
                {narrativeStates.map((state, index) => (
                  <button
                    key={state.phase}
                    onClick={() => setManualPhaseIndex(index)}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 hover:opacity-80 ${
                      narrativeStates.findIndex(n => n.phase === currentPhase) >= index
                        ? 'bg-primary'
                        : 'bg-border hover:bg-border/80'
                    }`}
                  />
                ))}
              </div>

              {/* Key insight card */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: currentPhase === 'full' ? 1 : 0.5 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-xl p-5 border border-border/30"
              >
                <h4 className="text-sm font-semibold text-primary mb-2">Key Insight</h4>
                <p className="text-sm text-muted-foreground">
                  With ~45,600 employees and 850K AMD average salary, 
                  Information and communication represents{' '}
                  <span className="text-foreground font-medium">high value per worker</span>
                  {' '}rather than volume—a mark of economic specialization.
                </p>
              </motion.div>

              {/* Data note */}
              <p className="text-xs text-muted-foreground/70 italic">
                * "Information and communication" includes telecommunications and related activities, 
                which may explain differences from pure IT employment trends shown earlier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
