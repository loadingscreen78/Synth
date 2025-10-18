import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroWelcomeProps {
  userName?: string;
  onEnter: () => void;
}

export const HeroWelcome = ({ userName = "Commander", onEnter }: HeroWelcomeProps) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4"
    >
      {/* Main Glass Card */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="glass-morphic rounded-3xl p-8 md:p-12 max-w-2xl w-full text-center space-y-8 relative overflow-hidden"
      >
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 animate-shimmer" 
             style={{ backgroundSize: '200% 100%' }} />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon with animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.6, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/30 mb-6 animate-pulse-slow"
          >
            <Sparkles className="w-10 h-10 text-primary" />
          </motion.div>

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-2"
          >
            <h1 className="text-4xl md:text-6xl font-bold glow-text">
              Welcome, <span className="text-primary">{userName}</span>
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed"
          >
            Let's see how much CO₂ we can save today
          </motion.p>

          {/* Stats preview (optional decorative elements) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-3 gap-4 pt-6"
          >
            <div className="glass-morphic rounded-xl p-3">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-xs text-muted-foreground">Active</div>
            </div>
            <div className="glass-morphic rounded-xl p-3">
              <div className="text-2xl font-bold text-secondary">∞</div>
              <div className="text-xs text-muted-foreground">Potential</div>
            </div>
            <div className="glass-morphic rounded-xl p-3">
              <div className="text-2xl font-bold text-primary">+∞</div>
              <div className="text-xs text-muted-foreground">Impact</div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="pt-4"
          >
            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate('/auth')}
              className="group relative overflow-hidden text-lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                Enter Control Center
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </motion.div>

          {/* Subtitle hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-xs text-muted-foreground/60 pt-4"
          >
            Your mission begins now
          </motion.p>
        </div>
      </motion.div>

      {/* Floating particles around the card */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};
