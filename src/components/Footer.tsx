import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="relative py-16 border-t border-border/50">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="font-display text-2xl font-bold mb-4">
            IT Labor Market in Armenia
          </h3>
          <p className="text-muted-foreground mb-6">
            A data story exploring employment and salary trends from 2022 to 2025
          </p>
          
          <div className="flex flex-col items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>Data Source: Statistical Committee of Armenia</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <a 
                href="https://contest.opendata.am/ru/2026" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors font-medium underline underline-offset-2"
              >
                Open Data Armenia Contest
              </a>
            </div>
            
            <div className="flex items-center gap-2">
              <span>Author:</span>
              <a 
                href="https://www.linkedin.com/in/arsen-grigoryan7/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors font-medium underline underline-offset-2"
              >
                Arsen Grigoryan
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative gradient */}
      <div 
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.3), transparent)',
        }}
      />
    </footer>
  );
};
