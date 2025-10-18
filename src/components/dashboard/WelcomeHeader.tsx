import { motion } from 'framer-motion';

interface WelcomeHeaderProps {
  userName?: string;
}

export function WelcomeHeader({ userName = 'Commander' }: WelcomeHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-2"
    >
      <h1 className="text-3xl md:text-4xl font-bold glow-text">
        Welcome back, <span className="text-primary">{userName}</span>
      </h1>
      <p className="text-muted-foreground text-lg">
        Here's your current carbon footprint overview
      </p>
    </motion.div>
  );
}
