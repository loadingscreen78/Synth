import { motion } from 'framer-motion';

export const GlowOrbs = () => {
  return (
    <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
      {/* Primary cyan orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(189, 94%, 55%) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: ['-10%', '30%', '-10%'],
          y: ['20%', '60%', '20%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary purple orb */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, hsl(263, 70%, 60%) 0%, transparent 70%)',
          filter: 'blur(80px)',
          right: 0,
        }}
        animate={{
          x: ['10%', '-20%', '10%'],
          y: ['10%', '50%', '10%'],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Accent cyan orb */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, hsl(189, 94%, 55%) 0%, transparent 70%)',
          filter: 'blur(60px)',
          bottom: 0,
          left: '50%',
        }}
        animate={{
          x: ['-50%', '-30%', '-50%'],
          y: ['0%', '-30%', '0%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};
