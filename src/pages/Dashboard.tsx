import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { TopNavBar } from '@/components/dashboard/TopNavBar';
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { CarbonOverview } from '@/components/dashboard/CarbonOverview';
import { AIInsights } from '@/components/dashboard/AIInsights';
import { TeamBudgets } from '@/components/dashboard/TeamBudgets';
import { OptimizationPanel } from '@/components/dashboard/OptimizationPanel';
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsCharts';
import { ImpactFooter } from '@/components/dashboard/ImpactFooter';
import { ModelInfo } from '@/components/dashboard/ModelInfo';
import { ConnectedDevices } from '@/components/dashboard/ConnectedDevices';
import { PredictionSummary } from '@/components/dashboard/PredictionSummary';
import { QuickMetrics } from '@/components/dashboard/QuickMetrics';

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-black/95 glass-morphic">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <TopNavBar />
          
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 space-y-6">
            <WelcomeHeader userName="Commander" />
            
            {/* Quick Metrics Overview */}
            <QuickMetrics />
            
            <CarbonOverview />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AIInsights />
              <OptimizationPanel />
            </div>
            
            {/* Latest AI Prediction Summary */}
            <PredictionSummary />
            
            {/* Connected Devices */}
            <ConnectedDevices />
            
            <ModelInfo />
            
            <TeamBudgets />
            
            <AnalyticsCharts />
            
            <ImpactFooter />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
