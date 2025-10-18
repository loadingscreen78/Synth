import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleBackground } from '@/components/ParticleBackground';
import { GlowOrbs } from '@/components/GlowOrbs';
import { HeroWelcome } from '@/components/HeroWelcome';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const { toast } = useToast();

  const handleEnter = () => {
    toast({
      title: "Initializing Control Center",
      description: "Your dashboard is loading...",
    });
    
    // Add smooth transition delay
    setTimeout(() => {
      setHasEntered(true);
    }, 500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Layers */}
      <ParticleBackground />
      <GlowOrbs />
      
      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <HeroWelcome
            userName="Commander"
            onEnter={handleEnter}
          />
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex items-center justify-center min-h-screen"
          >
            <div className="glass-morphic rounded-3xl p-12 max-w-4xl w-full mx-4 text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 glow-text">
                  Control Center
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Your dashboard interface will be integrated here.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['CO₂ Savings', 'Active Projects', 'Impact Score'].map((title, i) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="glass-morphic rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
                    >
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {title}
                      </h3>
                      <div className="text-4xl font-bold text-primary">--</div>
                      <p className="text-sm text-muted-foreground mt-2">Ready to track</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient glow effects */}
      <div className="fixed inset-0 pointer-events-none -z-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default Index;
