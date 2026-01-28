import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { YearlyData, formatNumber } from '@/lib/data';

interface TimelineChartProps {
  data: YearlyData[];
  unit: string;
  yAxisDomain?: [number, number];
}

const CustomTooltip = ({ active, payload, label, unit }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/95 backdrop-blur-xl border border-border rounded-xl p-4 shadow-2xl"
    >
      <p className="text-xs text-muted-foreground mb-2">{label}</p>
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: payload[0]?.color || 'hsl(var(--primary))' }}
        />
        <span className="font-display font-semibold text-foreground">
          {formatNumber(payload[0]?.value)}
        </span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
    </motion.div>
  );
};

export const TimelineChart = ({
  data,
  unit,
  yAxisDomain,
}: TimelineChartProps) => {
  const chartData = useMemo(() => {
    const allPoints: { label: string; value: number; color: string; year: number }[] = [];
    
    data.forEach((yearData) => {
      yearData.data.forEach((point) => {
        allPoints.push({
          label: `${point.month} ${point.year}`,
          value: point.value,
          color: yearData.color,
          year: point.year,
        });
      });
    });
    
    return allPoints;
  }, [data]);

  // Create gradient stops based on year colors
  const gradientStops = useMemo(() => {
    const totalPoints = chartData.length;
    const stops: { offset: string; color: string }[] = [];
    
    let currentYear = chartData[0]?.year;
    let startIndex = 0;
    
    chartData.forEach((point, index) => {
      if (point.year !== currentYear || index === totalPoints - 1) {
        const startOffset = (startIndex / totalPoints) * 100;
        const endOffset = ((index - 1) / totalPoints) * 100;
        
        const yearData = data.find(y => y.year === currentYear);
        if (yearData) {
          stops.push({ offset: `${startOffset}%`, color: yearData.color });
          stops.push({ offset: `${endOffset}%`, color: yearData.color });
        }
        
        currentYear = point.year;
        startIndex = index;
      }
    });
    
    // Add final segment
    const lastYearData = data.find(y => y.year === currentYear);
    if (lastYearData) {
      stops.push({ offset: `${(startIndex / totalPoints) * 100}%`, color: lastYearData.color });
      stops.push({ offset: '100%', color: lastYearData.color });
    }
    
    return stops;
  }, [chartData, data]);

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
        {data.map((yearData) => (
          <div key={yearData.year} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50">
            <div
              className="w-4 h-1 rounded-full"
              style={{ backgroundColor: yearData.color }}
            />
            <span className="text-sm font-medium text-foreground">
              {yearData.year}
            </span>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="timelineGradient" x1="0" y1="0" x2="1" y2="0">
              {gradientStops.map((stop, index) => (
                <stop key={index} offset={stop.offset} stopColor={stop.color} />
              ))}
            </linearGradient>
            <linearGradient id="timelineAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            opacity={0.3}
          />
          
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            interval="preserveStartEnd"
            tickFormatter={(value) => {
              // Show only years at start of each year
              if (value.startsWith('Jan')) {
                return value.split(' ')[1];
              }
              return '';
            }}
          />
          
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            domain={yAxisDomain || ['auto', 'auto']}
            tickFormatter={(value) => formatNumber(value, 0)}
          />
          
          <Tooltip content={<CustomTooltip unit={unit} />} />
          
          <Area
            type="monotone"
            dataKey="value"
            stroke="url(#timelineGradient)"
            strokeWidth={3}
            fill="url(#timelineAreaGradient)"
            dot={false}
            activeDot={{
              r: 6,
              stroke: 'hsl(var(--primary))',
              strokeWidth: 2,
              fill: 'hsl(var(--background))',
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
