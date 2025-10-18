import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertCircle, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { deviceService } from '@/services/deviceService';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export function PredictionSummary() {
  const [latestPrediction, setLatestPrediction] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Load latest prediction from localStorage
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
  }, []);

  const handleQuickAnalyze = async () => {
    const connectedDevices = deviceService.getConnectedDevices();
    
    if (connectedDevices.length === 0) {
      toast({
        title: 'No Devices Connected',
        description: 'Please connect devices before running analysis',
        variant: 'destructive',
      });
      return;
    }

    setAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const predictionData = deviceService.getModelPredictionData();
    const newPrediction = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      deviceCount: connectedDevices.length,
      devices: connectedDevices.map(d => ({ id: d.id, name: d.name, type: d.type })),
      ...predictionData,
    };

    setLatestPrediction(newPrediction);

    // Save to history
    const stored = localStorage.getItem('prediction_history');
    const history = stored ? JSON.parse(stored) : [];
    const updatedHistory = [newPrediction, ...history].slice(0, 10);
    localStorage.setItem('prediction_history', JSON.stringify(updatedHistory));

    setAnalyzing(false);
    
    toast({
      title: 'Analysis Complete',
      description: `Generated predictions for ${connectedDevices.length} devices`,
    });
  };

  if (!latestPrediction) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-morphic border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              AI Predictions
            </CardTitle>
            <CardDescription>Run analysis to generate predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-4">
                Connect devices and run AI analysis to see predictions
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={handleQuickAnalyze} disabled={analyzing} variant="hero">
                  {analyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Quick Analyze
                    </>
                  )}
                </Button>
                <Button onClick={() => navigate('/dashboard/predictions')} variant="outline">
                  View Predictions
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const riskColor = 
    latestPrediction.prediction.riskLevel === 'HIGH' ? 'text-red-500' :
    latestPrediction.prediction.riskLevel === 'MEDIUM' ? 'text-yellow-500' : 'text-green-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="glass-morphic border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Latest AI Prediction
              </CardTitle>
              <CardDescription>
                {new Date(latestPrediction.timestamp).toLocaleString()} • {latestPrediction.deviceCount} devices
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-primary border-primary">
              Latest
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className={`w-4 h-4 ${riskColor}`} />
                <p className="text-xs text-muted-foreground">Risk Level</p>
              </div>
              <p className={`text-xl font-bold ${riskColor}`}>
                {latestPrediction.prediction.riskLevel}
              </p>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-yellow-500" />
                <p className="text-xs text-muted-foreground">Next Hour</p>
              </div>
              <p className="text-xl font-bold text-yellow-500">
                {latestPrediction.prediction.nextHourEmissions.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">gCO₂</p>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-green-500" />
                <p className="text-xs text-muted-foreground">Savings</p>
              </div>
              <p className="text-xl font-bold text-green-500">
                {latestPrediction.prediction.projectedSavings.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">gCO₂</p>
            </div>
          </div>

          {/* Top Recommendation */}
          {latestPrediction.prediction.recommendations.length > 0 && (
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-xs font-semibold text-muted-foreground mb-1">Top Recommendation</p>
              <p className="text-sm text-foreground">
                {latestPrediction.prediction.recommendations[0]}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={handleQuickAnalyze} disabled={analyzing} size="sm" className="flex-1">
              {analyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Re-analyze
                </>
              )}
            </Button>
            <Button onClick={() => navigate('/dashboard/predictions')} size="sm" variant="outline">
              View Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
