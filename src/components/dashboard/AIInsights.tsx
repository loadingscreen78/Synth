import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { AlertTriangle, TrendingUp, MapPin, Sparkles, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useBudgetAlert, useEfficiencyAnalysis } from '@/hooks/useModelData';
import { Badge } from '@/components/ui/badge';

const severityColors = {
  CRITICAL: 'border-red-500/50 bg-red-500/5',
  high: 'border-red-500/50 bg-red-500/5',
  medium: 'border-yellow-500/50 bg-yellow-500/5',
  low: 'border-emerald-500/50 bg-emerald-500/5',
  NORMAL: 'border-emerald-500/50 bg-emerald-500/5',
};

const severityIconColors = {
  CRITICAL: 'text-red-500',
  high: 'text-red-500',
  medium: 'text-yellow-500',
  low: 'text-emerald-500',
  NORMAL: 'text-emerald-500',
};

export function AIInsights() {
  const { alert, loading: alertLoading } = useBudgetAlert();
  const { analysis, loading: analysisLoading } = useEfficiencyAnalysis();

  const loading = alertLoading || analysisLoading;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="glass-morphic p-6 border-border/50 h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">AI Insights & Predictions</h2>
            <p className="text-sm text-muted-foreground">CarbonCtrl Intelligence Layer</p>
          </div>
          {alert && (
            <Badge variant="outline" className="text-xs">
              Confidence: {Math.round(alert.confidence * 100)}%
            </Badge>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Budget Critical Alert */}
            {alert && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`p-4 rounded-xl border backdrop-blur-sm ${
                  severityColors[alert.risk_level as keyof typeof severityColors]
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle
                    className={`w-5 h-5 mt-0.5 ${
                      severityIconColors[alert.risk_level as keyof typeof severityIconColors]
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">Budget Critical Alert</h3>
                      <Badge variant="destructive" className="text-xs">
                        {alert.risk_level}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {alert.breach_prediction.will_breach
                        ? `Budget breach predicted in ${alert.breach_prediction.days_until_breach} days`
                        : 'Budget within safe limits'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Projected: {alert.projected_emissions.toLocaleString()} gCO₂
                    </p>
                  </div>
                </div>
                <Progress 
                  value={alert.breach_prediction.probability * 100} 
                  className="h-1.5" 
                />
              </motion.div>
            )}

            {/* Efficiency Analysis */}
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`p-4 rounded-xl border backdrop-blur-sm ${
                  severityColors.low
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 mt-0.5 text-emerald-500" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">Efficiency Analysis</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {analysis.summary}
                    </p>
                    {analysis.insights.length > 0 && (
                      <p className="text-xs text-muted-foreground italic">
                        {analysis.insights[0]}
                      </p>
                    )}
                  </div>
                </div>
                <Progress 
                  value={analysis.confidence * 100} 
                  className="h-1.5" 
                />
              </motion.div>
            )}

            {/* Top Recommendation */}
            {alert && alert.recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`p-4 rounded-xl border backdrop-blur-sm ${
                  severityColors.medium
                }`}
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 text-yellow-500" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">Top Recommendation</h3>
                    <p className="text-xs text-muted-foreground">
                      {alert.recommendations[0]}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
