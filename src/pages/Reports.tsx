import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { TopNavBar } from '@/components/dashboard/TopNavBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { BarChart3, Download, FileText, Calendar, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const monthlyData = [
  { month: 'Jan', emissions: 420, target: 500, saved: 80 },
  { month: 'Feb', emissions: 380, target: 500, saved: 120 },
  { month: 'Mar', emissions: 450, target: 500, saved: 50 },
  { month: 'Apr', emissions: 320, target: 500, saved: 180 },
  { month: 'May', emissions: 390, target: 500, saved: 110 },
  { month: 'Jun', emissions: 280, target: 500, saved: 220 },
];

const departmentData = [
  { name: 'Engineering', emissions: 380 },
  { name: 'Data Science', emissions: 150 },
  { name: 'DevOps', emissions: 420 },
  { name: 'QA', emissions: 120 },
  { name: 'Frontend', emissions: 180 },
  { name: 'Backend', emissions: 310 },
];

export default function Reports() {
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
                  <BarChart3 className="inline-block w-8 h-8 mr-2 text-primary" />
                  Reports & Analytics
                </h1>
                <p className="text-muted-foreground text-lg">
                  Comprehensive carbon footprint insights and trends
                </p>
              </div>
              <Button className="gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'This Month', value: '280 kg', change: '-22%', icon: TrendingDown },
                { label: 'Last Month', value: '390 kg', change: '-12%', icon: Calendar },
                { label: 'Total Saved', value: '760 kg', change: '+34%', icon: TrendingDown },
                { label: 'Reports Generated', value: '47', change: '+8', icon: FileText },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="glass-morphic border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <stat.icon className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm text-green-500 font-medium">{stat.change}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Tabs defaultValue="trends" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="trends">Emission Trends</TabsTrigger>
                <TabsTrigger value="departments">By Department</TabsTrigger>
                <TabsTrigger value="savings">Savings Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="trends" className="space-y-4">
                <Card className="glass-morphic border-border/50">
                  <CardHeader>
                    <CardTitle>Monthly Emission Trends</CardTitle>
                    <CardDescription>Track carbon emissions vs targets over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))' 
                          }} 
                        />
                        <Legend />
                        <Line type="monotone" dataKey="emissions" stroke="hsl(var(--primary))" strokeWidth={2} name="Actual Emissions" />
                        <Line type="monotone" dataKey="target" stroke="hsl(var(--destructive))" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="departments" className="space-y-4">
                <Card className="glass-morphic border-border/50">
                  <CardHeader>
                    <CardTitle>Emissions by Department</CardTitle>
                    <CardDescription>Compare carbon usage across teams</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={departmentData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))' 
                          }} 
                        />
                        <Bar dataKey="emissions" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="savings" className="space-y-4">
                <Card className="glass-morphic border-border/50">
                  <CardHeader>
                    <CardTitle>Carbon Savings Over Time</CardTitle>
                    <CardDescription>Track your environmental impact improvements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))' 
                          }} 
                        />
                        <Bar dataKey="saved" fill="hsl(142, 76%, 36%)" radius={[8, 8, 0, 0]} name="CO₂ Saved (kg)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
