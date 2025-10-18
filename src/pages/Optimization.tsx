import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { TopNavBar } from '@/components/dashboard/TopNavBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { Lightbulb, Zap, Cloud, Database, Server, Settings } from 'lucide-react';

const optimizations = [
  {
    title: 'Auto-Scale Idle VMs',
    description: 'Automatically shut down virtual machines during low-usage periods',
    impact: '120 kg CO₂/month',
    enabled: true,
    icon: Server,
  },
  {
    title: 'Carbon-Aware Load Balancing',
    description: 'Route traffic to data centers powered by renewable energy',
    impact: '85 kg CO₂/month',
    enabled: true,
    icon: Cloud,
  },
  {
    title: 'Database Query Optimization',
    description: 'Reduce unnecessary queries and optimize database indexes',
    impact: '45 kg CO₂/month',
    enabled: false,
    icon: Database,
  },
  {
    title: 'Smart Cooling Management',
    description: 'AI-powered temperature control for server rooms',
    impact: '95 kg CO₂/month',
    enabled: true,
    icon: Zap,
  },
  {
    title: 'Container Resource Limits',
    description: 'Set optimal CPU and memory limits for containerized workloads',
    impact: '67 kg CO₂/month',
    enabled: false,
    icon: Settings,
  },
];

export default function Optimization() {
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
                <Lightbulb className="inline-block w-8 h-8 mr-2 text-primary" />
                Optimization
              </h1>
              <p className="text-muted-foreground text-lg">
                Automated strategies to reduce carbon footprint
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="glass-morphic border-border/50 bg-gradient-to-br from-primary/20 to-primary/5">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">Active Optimizations</p>
                    <p className="text-4xl font-bold text-primary mt-2">3 / 5</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="glass-morphic border-border/50 bg-gradient-to-br from-green-500/20 to-green-500/5">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">Potential Savings</p>
                    <p className="text-4xl font-bold text-green-500 mt-2">412 kg</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="glass-morphic border-border/50 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">Saved This Month</p>
                    <p className="text-4xl font-bold text-cyan-500 mt-2">300 kg</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <Card className="glass-morphic border-border/50">
              <CardHeader>
                <CardTitle>Optimization Strategies</CardTitle>
                <CardDescription>Toggle automated carbon reduction features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {optimizations.map((opt, i) => (
                  <motion.div
                    key={opt.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-card/30 border border-border/30"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                        <opt.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{opt.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{opt.description}</p>
                        <p className="text-sm font-medium text-green-500 mt-2">
                          💡 Saves {opt.impact}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch defaultChecked={opt.enabled} />
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
