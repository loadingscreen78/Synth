import { motion } from 'framer-motion';
import { Server, Zap, Cloud, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const metrics = [
  { label: 'Active Servers', value: '247', icon: Server, color: 'text-primary' },
  { label: 'Power Consumed', value: '18.2 kWh', icon: Zap, color: 'text-yellow-500' },
  { label: 'CO₂ Emissions', value: '142 kg', icon: Cloud, color: 'text-orange-500' },
  { label: 'Credits Remaining', value: '3,480', icon: TrendingDown, color: 'text-emerald-500' },
];

export function CarbonOverview() {
  const creditUsage = 68; // 68% used

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-6"
    >
      <Card className="glass-morphic p-6 border-border/50">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Circular Progress Gauge */}
          <div className="flex-1 flex flex-col items-center justify-center min-h-[280px]">
            <div className="relative w-64 h-64">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl animate-pulse-slow" />
              
              {/* Main gauge circle */}
              <div className="relative w-full h-full rounded-full border-8 border-muted/30 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeDasharray={`${creditUsage * 2.83} 283`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--secondary))" />
                    </linearGradient>
                  </defs>
                </svg>
                
                <div className="text-center z-10">
                  <div className="text-5xl font-bold glow-text">{creditUsage}%</div>
                  <div className="text-sm text-muted-foreground mt-2">Credit Usage</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <span className="text-sm font-medium text-yellow-500">
                  Predicted breach in 3 days
                </span>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="glass-morphic p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-background/50 ${metric.color}`}>
                    <metric.icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
