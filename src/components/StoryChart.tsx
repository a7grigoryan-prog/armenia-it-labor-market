import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';
import { YearlyData, getYearColor, formatNumber } from '@/lib/data';

interface StoryChartProps {
  data: YearlyData[];
  activeYear: number | null;
  highlightedYear: number | null;
  unit: string;
  yAxisDomain?: [number, number];
  variant?: 'default' | 'epic';
}

const CustomTooltip = ({ active, payload, label, unit }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="relative bg-background/95 backdrop-blur-xl border border-primary/30 rounded-2xl p-5 shadow-2xl"
      style={{
        boxShadow: '0 0 40px -10px hsl(var(--primary) / 0.5), 0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
      
      <p className="text-xs font-medium text-primary mb-3 uppercase tracking-wider">{label}</p>
      <div className="space-y-2">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-background"
              style={{ 
                backgroundColor: entry.stroke,
                boxShadow: `0 0 10px ${entry.stroke}`,
              }}
            />
            <span className="font-display font-bold text-xl text-foreground">
              {formatNumber(entry.value)}
            </span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Animated background grid
const AnimatedGrid = () => (
  <div className="absolute inset-0 overflow-hidden rounded-3xl">
    {/* Horizontal scan lines */}
    <div className="absolute inset-0 opacity-[0.03]">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-full h-px bg-primary"
          style={{ top: `${(i + 1) * 5}%` }}
        />
      ))}
    </div>
    
    {/* Vertical scan lines */}
    <div className="absolute inset-0 opacity-[0.03]">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute h-full w-px bg-primary"
          style={{ left: `${(i + 1) * 8.33}%` }}
        />
      ))}
    </div>

    {/* Animated scan line */}
    <motion.div
      className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      initial={{ top: '0%' }}
      animate={{ top: '100%' }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  </div>
);

// Floating particles
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-primary/40"
        initial={{
          x: Math.random() * 100 + '%',
          y: Math.random() * 100 + '%',
          scale: Math.random() * 0.5 + 0.5,
        }}
        animate={{
          y: [null, `${Math.random() * 20 - 10}%`],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: Math.random() * 2,
        }}
        style={{
          boxShadow: '0 0 6px hsl(var(--primary))',
        }}
      />
    ))}
  </div>
);

export const StoryChart = ({
  data,
  activeYear,
  highlightedYear,
  unit,
  yAxisDomain,
  variant = 'default',
}: StoryChartProps) => {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const chartData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return months.map((month, index) => {
      const point: Record<string, any> = { month };
      data.forEach((yearData) => {
        const dataPoint = yearData.data.find((d) => d.monthIndex === index);
        if (dataPoint) {
          point[`y${yearData.year}`] = dataPoint.value;
        }
      });
      return point;
    });
  }, [data]);

  const getLineOpacity = (year: number): number => {
    if (activeYear === null && highlightedYear === null) return 1;
    if (hoveredYear === year) return 1;
    if (activeYear === year || highlightedYear === year) return 1;
    return 0.15;
  };

  const getLineWidth = (year: number): number => {
    if (highlightedYear === year || hoveredYear === year) return 4;
    if (activeYear === year) return 3;
    return 2;
  };

  const isEpic = variant === 'epic';

  return (
    <div className={`relative w-full ${isEpic ? 'p-1' : ''}`}>
      {/* Epic outer glow */}
      {isEpic && (
        <div 
          className="absolute -inset-1 rounded-[2rem] opacity-60"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--year-2022) / 0.3), hsl(var(--year-2023) / 0.3), hsl(var(--year-2024) / 0.3), hsl(var(--year-2025) / 0.3))',
            filter: 'blur(20px)',
          }}
        />
      )}

      <div 
        className={`relative rounded-3xl overflow-hidden ${
          isEpic 
            ? 'bg-gradient-to-br from-card via-card/95 to-card border-2 border-primary/20' 
            : 'chart-container'
        }`}
        style={isEpic ? {
          boxShadow: '0 0 60px -15px hsl(var(--primary) / 0.3), inset 0 1px 0 0 hsl(var(--primary) / 0.1)',
        } : {}}
      >
        {/* Background effects for epic variant */}
        {isEpic && (
          <>
            <AnimatedGrid />
            <FloatingParticles />
            
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-primary/30 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-primary/30 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-primary/30 rounded-br-3xl" />

            {/* Radial gradient overlays */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at top left, hsl(var(--year-2022) / 0.08) 0%, transparent 50%)',
              }}
            />
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at bottom right, hsl(var(--year-2025) / 0.08) 0%, transparent 50%)',
              }}
            />
          </>
        )}

        <div className={`relative z-10 ${isEpic ? 'p-6 md:p-8' : 'p-4 md:p-6'}`}>
          {/* Year legend */}
          <div className={`flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-8 ${isEpic ? 'mb-10' : ''}`}>
            {data.map((yearData) => (
              <motion.button
                key={yearData.year}
                onMouseEnter={() => setHoveredYear(yearData.year)}
                onMouseLeave={() => setHoveredYear(null)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  getLineOpacity(yearData.year) === 1
                    ? 'bg-muted/80'
                    : 'bg-transparent'
                }`}
                style={isEpic && getLineOpacity(yearData.year) === 1 ? {
                  boxShadow: `0 0 20px -5px ${yearData.color}`,
                } : {}}
              >
                {/* Animated glow ring for active years */}
                {isEpic && getLineOpacity(yearData.year) === 1 && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `1px solid ${yearData.color}` }}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                
                <motion.div
                  className="w-4 h-1.5 rounded-full"
                  style={{ 
                    backgroundColor: yearData.color,
                    boxShadow: isEpic ? `0 0 10px ${yearData.color}` : 'none',
                  }}
                  animate={{
                    opacity: getLineOpacity(yearData.year),
                    scale: hoveredYear === yearData.year ? 1.5 : 1,
                  }}
                />
                <span
                  className={`text-sm font-semibold transition-colors duration-300 ${
                    getLineOpacity(yearData.year) === 1
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {yearData.year}
                </span>
              </motion.button>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={isEpic ? 450 : 400}>
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                {data.map((yearData) => (
                  <linearGradient
                    key={`gradient-${yearData.year}`}
                    id={`gradient-${yearData.year}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={yearData.color} stopOpacity={isEpic ? 0.4 : 0.3} />
                    <stop offset="50%" stopColor={yearData.color} stopOpacity={isEpic ? 0.15 : 0.1} />
                    <stop offset="100%" stopColor={yearData.color} stopOpacity={0} />
                  </linearGradient>
                ))}
                
                {/* Glow filter for epic variant */}
                {isEpic && (
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                )}
              </defs>
              
              <CartesianGrid
                strokeDasharray={isEpic ? "1 8" : "3 3"}
                stroke="hsl(var(--primary))"
                opacity={isEpic ? 0.15 : 0.1}
                vertical={isEpic}
              />
              
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fill: 'hsl(var(--muted-foreground))', 
                  fontSize: 12,
                  fontWeight: isEpic ? 500 : 400,
                }}
                dy={10}
              />
              
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fill: 'hsl(var(--muted-foreground))', 
                  fontSize: 12,
                  fontWeight: isEpic ? 500 : 400,
                }}
                domain={yAxisDomain || ['auto', 'auto']}
                tickFormatter={(value) => formatNumber(value, 0)}
                dx={-10}
              />
              
              <Tooltip content={<CustomTooltip unit={unit} />} />

              {/* Area fills for depth */}
              {isEpic && data.map((yearData) => (
                <Area
                  key={`area-${yearData.year}`}
                  type="monotone"
                  dataKey={`y${yearData.year}`}
                  stroke="none"
                  fill={`url(#gradient-${yearData.year})`}
                  fillOpacity={getLineOpacity(yearData.year) * 0.6}
                />
              ))}

              {data.map((yearData) => (
                <Line
                  key={yearData.year}
                  type="monotone"
                  dataKey={`y${yearData.year}`}
                  stroke={yearData.color}
                  strokeWidth={getLineWidth(yearData.year)}
                  strokeOpacity={getLineOpacity(yearData.year)}
                  dot={isEpic ? {
                    r: 4,
                    fill: 'hsl(var(--background))',
                    stroke: yearData.color,
                    strokeWidth: 2,
                    opacity: getLineOpacity(yearData.year),
                  } : false}
                  activeDot={{
                    r: isEpic ? 8 : 6,
                    stroke: yearData.color,
                    strokeWidth: 3,
                    fill: 'hsl(var(--background))',
                    style: isEpic ? {
                      filter: 'drop-shadow(0 0 8px ' + yearData.color + ')',
                    } : {},
                  }}
                  style={{
                    transition: 'stroke-opacity 0.3s, stroke-width 0.3s',
                    filter: isEpic && getLineOpacity(yearData.year) === 1 
                      ? `drop-shadow(0 0 6px ${yearData.color})`
                      : 'none',
                  }}
                />
              ))}
            </ComposedChart>
          </ResponsiveContainer>

          {/* Bottom stats bar for epic variant */}
          {isEpic && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 pt-6 border-t border-primary/20 flex justify-center gap-8 md:gap-16"
            >
              {data.map((yearData) => {
                const lastValue = yearData.data[yearData.data.length - 1]?.value;
                const firstValue = yearData.data[0]?.value;
                const change = ((lastValue - firstValue) / firstValue * 100);
                
                return (
                  <motion.div 
                    key={yearData.year}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div 
                      className="text-xs font-medium mb-1 uppercase tracking-wider"
                      style={{ color: yearData.color }}
                    >
                      {yearData.year}
                    </div>
                    <div className="text-lg font-display font-bold text-foreground">
                      {change >= 0 ? '+' : ''}{change.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      annual change
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
