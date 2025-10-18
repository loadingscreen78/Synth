import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const teams = [
  {
    id: 1,
    name: 'Engineering',
    branch: 'Headquarters',
    used: 850,
    total: 1000,
    percentage: 85,
    status: 'warning',
  },
  {
    id: 2,
    name: 'Data Science',
    branch: 'North Branch',
    used: 420,
    total: 800,
    percentage: 52.5,
    status: 'good',
  },
  {
    id: 3,
    name: 'DevOps',
    branch: 'South Branch',
    used: 1050,
    total: 900,
    percentage: 116,
    status: 'exceeded',
  },
  {
    id: 4,
    name: 'QA Testing',
    branch: 'East Branch',
    used: 280,
    total: 500,
    percentage: 56,
    status: 'good',
  },
];

const statusConfig = {
  good: { color: 'text-emerald-500', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/30' },
  warning: { color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/30' },
  exceeded: { color: 'text-red-500', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/30' },
};

export function TeamBudgets() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="glass-morphic p-6 border-border/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Team / Branch Carbon Budgets</h2>
              <p className="text-sm text-muted-foreground">Real-time usage tracking</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="hidden md:flex">
            View All Teams
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="space-y-4">
          {teams.map((team, index) => {
            const config = statusConfig[team.status as keyof typeof statusConfig];
            return (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`p-4 rounded-xl border ${config.borderColor} ${config.bgColor} backdrop-blur-sm`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{team.name}</h3>
                    <p className="text-xs text-muted-foreground">{team.branch}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${config.color}`}>
                      {team.used} / {team.total}
                    </div>
                    <div className="text-xs text-muted-foreground">Carbon Credits</div>
                  </div>
                </div>
                <Progress value={Math.min(team.percentage, 100)} className="h-2 mb-2" />
                <div className="flex items-center justify-between text-xs">
                  <span className={config.color}>
                    {team.status === 'exceeded'
                      ? `Exceeded by ${team.used - team.total} credits`
                      : team.status === 'warning'
                      ? 'Approaching limit'
                      : 'Within budget'}
                  </span>
                  <span className="text-muted-foreground">{team.percentage.toFixed(1)}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <Button variant="outline" className="w-full mt-4 md:hidden">
          View Detailed Report
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </Card>
    </motion.div>
  );
}
