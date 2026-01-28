import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, Banknote, ArrowUpRight } from 'lucide-react';
interface KPICardProps {
  title: string;
  value: string;
  unit: string;
  trend?: number;
  trendPeriod?: string;
  icon: 'employment' | 'salary';
  delay?: number;
}
export const KPICard = ({
  title,
  value,
  unit,
  trend,
  trendPeriod = "since Jan 2022",
  icon,
  delay = 0
}: KPICardProps) => {
  const IconComponent = icon === 'employment' ? Users : Banknote;
  const isPositive = trend && trend > 0;
  return <motion.div initial={{
    opacity: 0,
    y: 30
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.6,
    delay,
    ease: 'easeOut'
  }} className="kpi-card group">
      <div className="relative z-10">
        {/* Header with icon and trend */}
        <div className="flex items-start justify-between mb-6">
          <div className="p-3.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
            <IconComponent className="w-7 h-7" />
          </div>
          
          {trend !== undefined && <motion.div initial={{
          opacity: 0,
          x: 10
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.5,
          delay: delay + 0.4
        }} className="flex flex-col items-end gap-1">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${isPositive ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-destructive/10 border border-destructive/20'}`}>
                <ArrowUpRight className={`w-5 h-5 ${isPositive ? 'text-emerald-400' : 'text-destructive rotate-90'}`} />
                <span className={`text-base font-semibold ${isPositive ? 'text-emerald-400' : 'text-destructive'}`}>
                  {isPositive ? '+' : ''}{trend.toFixed(1)}%
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {trendPeriod}
              </span>
            </motion.div>}
        </div>
        
        {/* Value */}
        <div className="flex items-baseline gap-3 mb-2">
          <motion.span initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.8,
          delay: delay + 0.3
        }} className="text-5xl md:text-6xl font-display font-bold text-foreground tracking-tight">
            {value}
          </motion.span>
          <span className="text-xl text-muted-foreground font-medium">{unit}</span>
        </div>
        
        {/* Title - below value */}
        <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase text-left">
          {title}
        </h3>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none" style={{
      background: 'radial-gradient(ellipse at top right, hsl(var(--primary) / 0.15) 0%, transparent 60%)'
    }} />

      {/* Animated glow on hover */}
      <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{
      background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.12) 0%, transparent 70%)'
    }} />
    </motion.div>;
};