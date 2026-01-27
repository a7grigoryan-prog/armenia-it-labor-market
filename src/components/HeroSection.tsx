import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { KPICard } from './KPICard';
import { getLatestEmployment, getLatestSalary, formatNumber, employmentData, salaryData, getYearGrowth } from '@/lib/data';

export const HeroSection = () => {
  const latestEmployment = getLatestEmployment();
  const latestSalary = getLatestSalary();
  
  // Calculate growth from 2022 start to latest
  const employmentGrowth = ((latestEmployment.value - 23.0) / 23.0) * 100;
  const salaryGrowth = ((latestSalary.value - 731.2) / 731.2) * 100;

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 py-24 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--accent) / 0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-primary">Data Story • 2022–2025</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-foreground">IT Labor Market</span>
          <br />
          <span className="text-gradient-armenia">in Armenia</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          How employment and salaries evolved through migration waves, market maturation, and the emergence of a sustainable tech ecosystem.
        </motion.p>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
          <KPICard
            title="Current IT Workforce"
            value={formatNumber(latestEmployment.value)}
            unit="thousand"
            trend={employmentGrowth}
            icon="employment"
            delay={0.3}
          />
          <KPICard
            title="Average IT Salary"
            value={formatNumber(latestSalary.value, 0)}
            unit="K AMD"
            trend={salaryGrowth}
            icon="salary"
            delay={0.4}
          />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm text-muted-foreground">Scroll to explore the story</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
