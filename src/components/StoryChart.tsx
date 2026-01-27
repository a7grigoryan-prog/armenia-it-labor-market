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
  ReferenceLine,
} from 'recharts';
import { YearlyData, getYearColor, formatNumber } from '@/lib/data';

interface StoryChartProps {
  data: YearlyData[];
  activeYear: number | null;
  highlightedYear: number | null;
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
      <div className="space-y-1">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.stroke }}
            />
            <span className="font-display font-semibold text-foreground">
              {formatNumber(entry.value)}
            </span>
            <span className="text-xs text-muted-foreground">{unit}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export const StoryChart = ({
  data,
  activeYear,
  highlightedYear,
  unit,
  yAxisDomain,
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

  return (
    <div className="chart-container w-full">
      {/* Year legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
        {data.map((yearData) => (
          <motion.button
            key={yearData.year}
            onMouseEnter={() => setHoveredYear(yearData.year)}
            onMouseLeave={() => setHoveredYear(null)}
            whileHover={{ scale: 1.05 }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
              getLineOpacity(yearData.year) === 1
                ? 'bg-muted'
                : 'bg-transparent'
            }`}
          >
            <motion.div
              className="w-4 h-1 rounded-full"
              style={{ backgroundColor: yearData.color }}
              animate={{
                opacity: getLineOpacity(yearData.year),
                scale: hoveredYear === yearData.year ? 1.5 : 1,
              }}
            />
            <span
              className={`text-sm font-medium transition-colors duration-300 ${
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

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
                <stop offset="0%" stopColor={yearData.color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={yearData.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            opacity={0.3}
          />
          
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            domain={yAxisDomain || ['auto', 'auto']}
            tickFormatter={(value) => formatNumber(value, 0)}
          />
          
          <Tooltip content={<CustomTooltip unit={unit} />} />

          {data.map((yearData) => (
            <Line
              key={yearData.year}
              type="monotone"
              dataKey={`y${yearData.year}`}
              stroke={yearData.color}
              strokeWidth={getLineWidth(yearData.year)}
              strokeOpacity={getLineOpacity(yearData.year)}
              dot={false}
              activeDot={{
                r: 6,
                stroke: yearData.color,
                strokeWidth: 2,
                fill: 'hsl(var(--background))',
              }}
              style={{
                transition: 'stroke-opacity 0.3s, stroke-width 0.3s',
              }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
