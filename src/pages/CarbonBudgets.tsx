import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { TopNavBar } from '@/components/dashboard/TopNavBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const budgetData = [
  {
    department: 'Engineering',
    allocated: 500,
    used: 380,
    status: 'warning',
    trend: 'up',
  },
  {
    department: 'Data Science',
    allocated: 300,
    used: 150,
    status: 'good',
    trend: 'down',
  },
  {
    department: 'DevOps',
    allocated: 400,
    used: 420,
    status: 'critical',
    trend: 'up',
  },
  {
    department: 'QA',
    allocated: 200,
    used: 120,
    status: 'good',
    trend: 'down',
  },
];

export default function CarbonBudgets() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-black/95 glass-morphic">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <TopNavBar />
          
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <h1 className="text-3xl md:text-4xl font-bold glow-text">
                <Wallet className="inline-block w-8 h-8 mr-2 text-primary" />
                Carbon Budgets
              </h1>
              <p className="text-muted-foreground text-lg">
                Monitor and manage carbon credit allocations across departments
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Allocated', value: '1,400 kg CO₂', icon: Wallet },
                { label: 'Total Used', value: '1,070 kg CO₂', icon: TrendingUp },
                { label: 'Remaining', value: '330 kg CO₂', icon: TrendingDown },
                { label: 'Budget Breaches', value: '1', icon: AlertTriangle },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="glass-morphic border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                        </div>
                        <stat.icon className="w-8 h-8 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="glass-morphic border-border/50">
              <CardHeader>
                <CardTitle>Department Budget Overview</CardTitle>
                <CardDescription>Current usage vs allocated carbon credits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {budgetData.map((dept, i) => {
                  const percentage = (dept.used / dept.allocated) * 100;
                  const statusColor = dept.status === 'good' ? 'text-green-500' : 
                                     dept.status === 'warning' ? 'text-yellow-500' : 'text-red-500';
                  
                  return (
                    <motion.div
                      key={dept.department}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{dept.department}</h3>
                          <Badge variant={dept.status === 'good' ? 'secondary' : 'destructive'}>
                            {dept.status}
                          </Badge>
                          {dept.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-red-500" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-sm font-medium ${statusColor}`}>
                            {dept.used} / {dept.allocated} kg CO₂
                          </span>
                          <Button variant="outline" size="sm">Adjust</Button>
                        </div>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
