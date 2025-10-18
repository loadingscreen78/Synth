import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Lightbulb, Server, MapPin, Cpu } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const recommendations = [
  {
    id: 1,
    icon: Server,
    title: 'Reduce Idle VM Instances',
    description: 'Reduce idle VM instances by 12%',
    impact: '145 kg CO₂ saved/month',
  },
  {
    id: 2,
    icon: MapPin,
    title: 'Migrate to Green Data Center',
    description: 'Migrate to carbon-neutral data center in Singapore',
    impact: '320 kg CO₂ saved/month',
  },
  {
    id: 3,
    icon: Cpu,
    title: 'CPU Optimization',
    description: 'Enable dynamic CPU scaling during off-peak hours',
    impact: '89 kg CO₂ saved/month',
  },
];

export function OptimizationPanel() {
  const [autoOptimize, setAutoOptimize] = useState(false);
  const { toast } = useToast();

  const handleApply = (title: string) => {
    toast({
      title: 'Optimization Applied',
      description: `${title} has been queued for implementation.`,
    });
  };

  const handleAutoOptimizeToggle = (checked: boolean) => {
    setAutoOptimize(checked);
    toast({
      title: checked ? 'Auto-Optimize Enabled' : 'Auto-Optimize Disabled',
      description: checked
        ? 'AI will automatically apply optimization suggestions.'
        : 'Manual approval required for optimizations.',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="glass-morphic p-6 border-border/50 h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Lightbulb className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Optimization Suggestions</h2>
              <p className="text-sm text-muted-foreground">AI-powered recommendations</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Auto-optimize</span>
            <Switch checked={autoOptimize} onCheckedChange={handleAutoOptimizeToggle} />
          </div>
        </div>

        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="p-4 rounded-xl border border-border/50 bg-background/30 backdrop-blur-sm hover:border-emerald-500/30 transition-all group"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <rec.icon className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">{rec.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{rec.description}</p>
                  <div className="inline-flex items-center gap-1 text-xs text-emerald-500 font-medium">
                    <TrendingUp className="w-3 h-3" />
                    {rec.impact}
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500/50"
                onClick={() => handleApply(rec.title)}
              >
                Apply Suggestion
              </Button>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

function TrendingUp({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
