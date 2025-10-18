import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,
  Brain,
  Lightbulb,
  Users,
  BarChart3,
  Settings,
  Zap,
  Wifi,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const navItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Device Connection', url: '/dashboard/devices', icon: Wifi },
  { title: 'Carbon Budgets', url: '/dashboard/budgets', icon: Wallet },
  { title: 'AI Predictions', url: '/dashboard/predictions', icon: Brain },
  { title: 'Optimization', url: '/dashboard/optimization', icon: Lightbulb },
  { title: 'Teams / Projects', url: '/dashboard/teams', icon: Users },
  { title: 'Reports & Analytics', url: '/dashboard/reports', icon: BarChart3 },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar className={collapsed ? 'w-16' : 'w-64'} collapsible="icon">
      <SidebarContent className="bg-card/50 backdrop-blur-xl border-r border-border/40">
        {/* Logo Section - Minimal */}
        <div className="p-6 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg text-foreground">CarbonCtrl</h2>
                <p className="text-xs text-primary/80">AI Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation - Clean & Visible */}
        <SidebarGroup className="px-3">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/dashboard'}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-primary text-white font-semibold shadow-lg shadow-primary/20'
                            : 'text-foreground/70 hover:text-foreground hover:bg-muted/80'
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
