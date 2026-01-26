import { motion } from 'framer-motion';
import { getYearColor } from '@/lib/data';

interface YearSelectorProps {
  years: number[];
  activeYear: number | null;
  onYearChange: (year: number | null) => void;
}

export const YearSelector = ({ years, activeYear, onYearChange }: YearSelectorProps) => {
  return (
    <div className="flex items-center gap-2 p-1 rounded-full bg-muted/50 backdrop-blur-sm">
      <button
        onClick={() => onYearChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          activeYear === null
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        All
      </button>
      {years.map((year) => (
        <motion.button
          key={year}
          onClick={() => onYearChange(year)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeYear === year
              ? 'text-white'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {activeYear === year && (
            <motion.div
              layoutId="activeYear"
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: getYearColor(year) }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{year}</span>
        </motion.button>
      ))}
    </div>
  );
};
