import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, Banknote } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  unit: string;
  trend?: number;
  icon: 'employment' | 'salary';
  delay?: number;
}

export const KPICard = ({ title, value, unit, trend, icon, delay = 0 }: KPICardProps) => {
  const IconComponent = icon === 'employment' ? Users : Banknote;
  const isPositive = trend && trend > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="kpi-card group"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            <IconComponent className="w-6 h-6" />
          </div>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-year-2023' : 'text-destructive'}`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{isPositive ? '+' : ''}{trend.toFixed(1)}%</span>
            </div>
          )}
        </div>
        
        <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
        
        <div className="flex items-baseline gap-2">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: delay + 0.3 }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground"
          >
            {value}
          </motion.span>
          <span className="text-lg text-muted-foreground">{unit}</span>
        </div>
      </div>

      {/* Animated glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
};
