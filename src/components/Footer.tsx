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
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
            IT Labor Market in Armenia
          </h3>
          <p className="text-muted-foreground mb-8">
            A data story exploring employment and salary trends in Armenia's IT sector (2022–2025)
          </p>
          
          <p className="text-muted-foreground mb-6">
            Data based on publicly available information from{' '}
            <a 
              href="https://www.armstat.am/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors font-medium underline underline-offset-2"
            >
              Statistical Committee of Armenia
            </a>
          </p>

          <p className="text-sm text-muted-foreground">
            Author:{' '}
            <a 
              href="https://www.linkedin.com/in/arsen-grigoryan7/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Arsen Grigoryan
            </a>
          </p>
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
