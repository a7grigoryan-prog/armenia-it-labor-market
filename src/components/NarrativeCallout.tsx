import { motion } from 'framer-motion';
import { NarrativeItem, getYearColor } from '@/lib/data';

interface NarrativeCalloutProps {
  narrative: NarrativeItem;
  isActive: boolean;
}

export const NarrativeCallout = ({ narrative, isActive }: NarrativeCalloutProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ 
        opacity: isActive ? 1 : 0.3, 
        x: isActive ? 0 : -10,
        scale: isActive ? 1 : 0.95,
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="story-callout mb-6"
      style={{
        borderLeftColor: isActive ? getYearColor(narrative.year) : 'hsl(var(--border))',
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <span
          className="px-3 py-1 rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: getYearColor(narrative.year) }}
        >
          {narrative.year}
        </span>
        <h4 className="font-display font-semibold text-foreground">
          {narrative.title}
        </h4>
      </div>
      <p className="text-sm text-muted-foreground mb-3">
        {narrative.description}
      </p>
      {isActive && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-sm text-foreground/80 italic border-t border-border/50 pt-3"
        >
          {narrative.insight}
        </motion.p>
      )}
    </motion.div>
  );
};
