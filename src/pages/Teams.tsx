import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { TopNavBar } from '@/components/dashboard/TopNavBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Users, Plus, TrendingUp, TrendingDown } from 'lucide-react';

const teams = [
  {
    name: 'Engineering Team',
    members: 24,
    lead: 'Sarah Chen',
    budget: 500,
    used: 380,
    projects: 12,
    trend: 'up',
  },
  {
    name: 'Data Science',
    members: 8,
    lead: 'Mike Johnson',
    budget: 300,
    used: 150,
    projects: 5,
    trend: 'down',
  },
  {
    name: 'DevOps',
    members: 12,
    lead: 'Alex Rodriguez',
    budget: 400,
    used: 420,
    projects: 8,
    trend: 'up',
  },
  {
    name: 'QA Team',
    members: 10,
    lead: 'Emma Wilson',
    budget: 200,
    used: 120,
    projects: 7,
    trend: 'down',
  },
  {
    name: 'Frontend',
    members: 16,
    lead: 'David Park',
    budget: 250,
    used: 180,
    projects: 9,
    trend: 'down',
  },
  {
    name: 'Backend',
    members: 18,
    lead: 'Lisa Anderson',
    budget: 350,
    used: 310,
    projects: 11,
    trend: 'up',
  },
];

export default function Teams() {
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
              className="flex items-center justify-between"
            >
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold glow-text">
                  <Users className="inline-block w-8 h-8 mr-2 text-primary" />
                  Teams & Projects
                </h1>
                <p className="text-muted-foreground text-lg">
                  Manage team carbon budgets and project allocations
                </p>
              </div>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Team
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team, i) => {
                const percentage = (team.used / team.budget) * 100;
                const isOverBudget = percentage > 100;
                
                return (
                  <motion.div
                    key={team.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="glass-morphic border-border/50 hover:border-primary/50 transition-all">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12 bg-primary/20">
                              <AvatarFallback className="text-primary font-bold">
                                {team.name.split(' ').map(w => w[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{team.name}</CardTitle>
                              <p className="text-sm text-muted-foreground">{team.lead}</p>
                            </div>
                          </div>
                          {team.trend === 'up' ? (
                            <TrendingUp className="w-5 h-5 text-red-500" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Members</p>
                            <p className="text-lg font-semibold">{team.members}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Projects</p>
                            <p className="text-lg font-semibold">{team.projects}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Carbon Budget</span>
                            <span className={`font-medium ${isOverBudget ? 'text-red-500' : 'text-green-500'}`}>
                              {team.used} / {team.budget} kg
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${isOverBudget ? 'bg-red-500' : 'bg-primary'}`}
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                          </div>
                          {isOverBudget && (
                            <Badge variant="destructive" className="text-xs">
                              Over Budget
                            </Badge>
                          )}
                        </div>
                        
                        <Button variant="outline" className="w-full" size="sm">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
