import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { TreePine, Leaf, Award } from 'lucide-react';

const achievements = [
  {
    icon: TreePine,
    value: '1.4 Tons',
    label: 'Total CO₂ Saved',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Leaf,
    value: '72 Trees',
    label: 'Equivalent Planted',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: Award,
    value: '23%',
    label: 'Efficiency Improvement',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
];

export function ImpactFooter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-8"
    >
      <Card className="glass-morphic p-6 border-border/50 bg-gradient-to-r from-emerald-500/5 to-primary/5">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-2">🌍 Environmental Impact Summary</h3>
          <p className="text-muted-foreground text-sm">This Quarter's Achievements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className={`${achievement.bgColor} rounded-xl p-6 border border-border/30 text-center`}
            >
              <div className="flex justify-center mb-3">
                <div className={`p-3 rounded-full ${achievement.bgColor} border border-border/30`}>
                  <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                </div>
              </div>
              <div className={`text-3xl font-bold ${achievement.color} mb-1`}>
                {achievement.value}
              </div>
              <div className="text-sm text-muted-foreground">{achievement.label}</div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
