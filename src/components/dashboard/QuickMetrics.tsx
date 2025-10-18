import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Activity, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import { deviceService } from '@/services/deviceService';

export function QuickMetrics() {
  const [metrics, setMetrics] = useState({
    totalDevices: 0,
    totalEmissions: 0,
    totalPower: 0,
    averageEfficiency: 0,
  });
  const [latestPrediction, setLatestPrediction] = useState<any>(null);

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(deviceService.getMetrics());
      
      // Load latest prediction
      const stored = localStorage.getItem('prediction_history');
      if (stored) {
        try {
          const history = JSON.parse(stored);
          if (history.length > 0) {
            setLatestPrediction(history[0]);
          }
        } catch (e) {
          console.error('Error loading prediction:', e);
        }
      }
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 3000);
    return () => clearInterval(interval);
  }, []);

  const metricsData = [
    {
      label: 'Total Emissions',
      value: metrics.totalEmissions.toLocaleString(),
      unit: 'gCO₂',
      icon: Activity,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
    },
    {
      label: 'Total Power',
      value: metrics.totalPower.toLocaleString(),
      unit: 'watts',
      icon: Zap,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
    },
    {
      label: 'Predicted Next Hour',
      value: latestPrediction ? latestPrediction.prediction.nextHourEmissions.toLocaleString() : 'N/A',
      unit: latestPrediction ? 'gCO₂' : '',
      icon: TrendingUp,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      label: 'Risk Level',
      value: latestPrediction ? latestPrediction.prediction.riskLevel : 'N/A',
      unit: '',
      icon: AlertTriangle,
      color: latestPrediction?.prediction.riskLevel === 'HIGH' ? 'text-red-500' :
             latestPrediction?.prediction.riskLevel === 'MEDIUM' ? 'text-yellow-500' : 'text-green-500',
      bgColor: latestPrediction?.prediction.riskLevel === 'HIGH' ? 'bg-red-500/10' :
               latestPrediction?.prediction.riskLevel === 'MEDIUM' ? 'bg-yellow-500/10' : 'bg-green-500/10',
      borderColor: latestPrediction?.prediction.riskLevel === 'HIGH' ? 'border-red-500/20' :
                   latestPrediction?.prediction.riskLevel === 'MEDIUM' ? 'border-yellow-500/20' : 'border-green-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricsData.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`glass-morphic border ${metric.borderColor}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                  <div className="flex items-baseline gap-1">
                    <p className={`text-2xl font-bold ${metric.color}`}>
                      {metric.value}
                    </p>
                    {metric.unit && (
                      <p className="text-xs text-muted-foreground">{metric.unit}</p>
                    )}
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
