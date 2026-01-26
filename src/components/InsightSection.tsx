import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lightbulb, ArrowUpRight, CheckCircle2, TrendingUp } from 'lucide-react';

const insights = [
  {
    icon: TrendingUp,
    title: 'Rapid Initial Growth',
    description: 'The 2022 workforce surge (+44%) was unprecedented, driven by regional migration of tech talent to Armenia.',
    color: 'text-year-2022',
    bgColor: 'bg-year-2022/10',
  },
  {
    icon: CheckCircle2,
    title: 'Market Stabilization',
    description: 'From 2023 onwards, employment stabilized around 32K, indicating market maturity and sustainable growth.',
    color: 'text-year-2023',
    bgColor: 'bg-year-2023/10',
  },
  {
    icon: ArrowUpRight,
    title: 'Premium Compensation',
    description: 'IT salaries remain 3-4× higher than national average, maintaining sector attractiveness for skilled workers.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
];

export const InsightSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Key Takeaways</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            What the Data Tells Us
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three years of transformation—from migration-driven boom to sustainable ecosystem
          </p>
        </motion.div>

        {/* Insight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className={`p-3 rounded-xl ${insight.bgColor} w-fit mb-4`}>
                <insight.icon className={`w-6 h-6 ${insight.color}`} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{insight.title}</h3>
              <p className="text-sm text-muted-foreground">{insight.description}</p>
              
              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.05) 0%, transparent 70%)',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Summary block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="insight-block"
        >
          <div className="relative z-10">
            <h3 className="font-display text-2xl font-bold mb-6">
              The Story in Numbers
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Employment Journey</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-year-2022 mt-1.5 flex-shrink-0" />
                    <span><strong className="text-foreground">2022:</strong> Workforce exploded from 23K to 33K (+44%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-year-2023 mt-1.5 flex-shrink-0" />
                    <span><strong className="text-foreground">2023:</strong> Slight correction to ~32K as migration wave settled</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-year-2024 mt-1.5 flex-shrink-0" />
                    <span><strong className="text-foreground">2024:</strong> Steady state maintained around 32K</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-year-2025 mt-1.5 flex-shrink-0" />
                    <span><strong className="text-foreground">2025:</strong> Organic growth resuming, approaching 33K</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-3">Salary Evolution</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-year-2022 mt-1.5 flex-shrink-0" />
                    <span><strong className="text-foreground">2022:</strong> Salaries surged 52% (731K → 1,115K AMD)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-year-2023 mt-1.5 flex-shrink-0" />
                    <span><strong className="text-foreground">2023:</strong> Stabilized around 1,000K with seasonal peaks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-year-2024 mt-1.5 flex-shrink-0" />
                    <span><strong className="text-foreground">2024:</strong> December peak reached 1,247K AMD</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-year-2025 mt-1.5 flex-shrink-0" />
                    <span><strong className="text-foreground">2025:</strong> Sustainable ~1,000K baseline maintained</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-primary/20">
              <p className="text-sm text-foreground/80 italic">
                "Armenia's IT sector has transformed from a migration-driven boom into a mature, sustainable market. The workforce stabilized, salaries remain competitive, and the ecosystem is now growing organically through local talent development and business expansion."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
