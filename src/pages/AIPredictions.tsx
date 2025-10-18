import { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { TopNavBar } from '@/components/dashboard/TopNavBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, TrendingUp, AlertCircle, CheckCircle, Clock, Loader2, Lightbulb, Sparkles, RefreshCw } from 'lucide-react';
import { useModelData } from '@/hooks/useModelData';
import { deviceService } from '@/services/deviceService';
import { useToast } from '@/hooks/use-toast';

export default function AIPredictions() {
  const { modelData, loading, error } = useModelData();
  const { toast } = useToast();
  const [analyzing, setAnalyzing] = useState(false);
  const [currentPrediction, setCurrentPrediction] = useState<any>(null);
  const [predictionHistory, setPredictionHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const alert = modelData?.predictions.budget_critical_alert;
  const analysis = modelData?.predictions.efficiency_analysis;
  const metadata = modelData?.metadata;

  // Load prediction history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('prediction_history');
    if (stored) {
      try {
        setPredictionHistory(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading prediction history:', e);
      }
    }
  }, []);

  // Save prediction history to localStorage
  const savePredictionHistory = (predictions: any[]) => {
    try {
      localStorage.setItem('prediction_history', JSON.stringify(predictions));
    } catch (e) {
      console.error('Error saving prediction history:', e);
    }
  };

  const handleAnalyze = async () => {
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

    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate prediction based on connected devices
    const predictionData = deviceService.getModelPredictionData();
    
    const newPrediction = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      deviceCount: connectedDevices.length,
      devices: connectedDevices.map(d => ({ id: d.id, name: d.name, type: d.type })),
      ...predictionData,
    };

    setCurrentPrediction(newPrediction);
    
    // Add to history (keep last 10)
    const updatedHistory = [newPrediction, ...predictionHistory].slice(0, 10);
    setPredictionHistory(updatedHistory);
    savePredictionHistory(updatedHistory);

    setAnalyzing(false);
    
    toast({
      title: 'Analysis Complete',
      description: `Generated predictions for ${connectedDevices.length} connected devices`,
    });
  };

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
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold glow-text">
                    <Brain className="inline-block w-8 h-8 mr-2 text-primary" />
                    AI Predictions
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    {metadata ? `${metadata.engine} - ${metadata.model}` : 'Machine learning insights for proactive carbon management'}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    size="lg"
                    variant="hero"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Analyze Devices
                      </>
                    )}
                  </Button>
                  {predictionHistory.length > 0 && (
                    <Button
                      onClick={() => setShowHistory(!showHistory)}
                      size="lg"
                      variant="outline"
                    >
                      <Clock className="w-5 h-5 mr-2" />
                      {showHistory ? 'Hide' : 'Show'} History ({predictionHistory.length})
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
              </div>
            ) : error ? (
              <Card className="glass-morphic border-border/50 p-6">
                <p className="text-red-500">Error loading model data: {error.message}</p>
              </Card>
            ) : (
              <>
                {/* Current Prediction or Default Model Data */}
                {currentPrediction ? (
                  <>
                    {/* Current Prediction Stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="glass-morphic border-border/50 border-primary/50">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-primary" />
                                Current Analysis
                              </CardTitle>
                              <CardDescription>
                                Generated {new Date(currentPrediction.timestamp).toLocaleString()} • {currentPrediction.deviceCount} devices
                              </CardDescription>
                            </div>
                            <Badge variant="outline" className="text-primary border-primary">
                              Latest
                            </Badge>
                          </div>
                        </CardHeader>
                      </Card>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { 
                          label: 'Risk Level', 
                          value: currentPrediction.prediction.riskLevel, 
                          icon: AlertCircle, 
                          color: currentPrediction.prediction.riskLevel === 'HIGH' ? 'text-red-500' : 
                                 currentPrediction.prediction.riskLevel === 'MEDIUM' ? 'text-yellow-500' : 'text-green-500'
                        },
                        { 
                          label: 'Next Hour Emissions', 
                          value: `${currentPrediction.prediction.nextHourEmissions.toLocaleString()} gCO₂`, 
                          icon: TrendingUp, 
                          color: 'text-yellow-500' 
                        },
                        { 
                          label: 'Model Confidence', 
                          value: `${Math.round(currentPrediction.prediction.confidence * 100)}%`, 
                          icon: CheckCircle, 
                          color: 'text-green-500' 
                        },
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
                                  <p className={`text-2xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                                </div>
                                <stat.icon className={`w-10 h-10 ${stat.color}`} />
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { 
                        label: 'Risk Level', 
                        value: alert?.risk_level || 'N/A', 
                        icon: AlertCircle, 
                        color: alert?.risk_level === 'CRITICAL' ? 'text-red-500' : 'text-primary' 
                      },
                      { 
                        label: 'Breach Probability', 
                        value: alert ? `${Math.round(alert.breach_prediction.probability * 100)}%` : 'N/A', 
                        icon: Brain, 
                        color: 'text-yellow-500' 
                      },
                      { 
                        label: 'Model Confidence', 
                        value: alert ? `${Math.round(alert.confidence * 100)}%` : 'N/A', 
                        icon: CheckCircle, 
                        color: 'text-green-500' 
                      },
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
                                <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                              </div>
                              <stat.icon className={`w-10 h-10 ${stat.color}`} />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Current Prediction Details */}
                {currentPrediction && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="glass-morphic border-border/50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Brain className="w-5 h-5 text-primary" />
                          Device-Based Predictions
                        </CardTitle>
                        <CardDescription>
                          Analysis based on {currentPrediction.deviceCount} connected devices
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                            <p className="text-sm text-muted-foreground mb-1">Total Emissions</p>
                            <p className="text-2xl font-bold">{currentPrediction.totalCarbonEmissions.toLocaleString()} gCO₂</p>
                          </div>
                          <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                            <p className="text-sm text-muted-foreground mb-1">Avg CPU Usage</p>
                            <p className="text-2xl font-bold text-yellow-500">{currentPrediction.averageCpuUsage}%</p>
                          </div>
                          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                            <p className="text-sm text-muted-foreground mb-1">Projected Savings</p>
                            <p className="text-2xl font-bold text-green-500">{currentPrediction.prediction.projectedSavings.toLocaleString()} gCO₂</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-yellow-500" />
                            AI Recommendations:
                          </p>
                          {currentPrediction.prediction.recommendations.map((rec: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
                              <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                              <p className="text-sm text-foreground">{rec}</p>
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-border/50">
                          <p className="text-sm font-semibold mb-3">Connected Devices:</p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {currentPrediction.devices.map((device: any) => (
                              <div key={device.id} className="p-2 bg-muted/30 rounded-lg text-xs">
                                <p className="font-semibold truncate">{device.name}</p>
                                <p className="text-muted-foreground">{device.type} • {device.emissions} gCO₂</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Prediction History */}
                <AnimatePresence>
                  {showHistory && predictionHistory.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Card className="glass-morphic border-border/50">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" />
                            Prediction History
                          </CardTitle>
                          <CardDescription>
                            Past {predictionHistory.length} predictions
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {predictionHistory.map((pred, idx) => (
                              <motion.div
                                key={pred.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <p className="font-semibold text-sm">
                                      {new Date(pred.timestamp).toLocaleString()}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {pred.deviceCount} devices • {pred.totalCarbonEmissions.toLocaleString()} gCO₂
                                    </p>
                                  </div>
                                  <Badge variant={
                                    pred.prediction.riskLevel === 'HIGH' ? 'destructive' :
                                    pred.prediction.riskLevel === 'MEDIUM' ? 'secondary' : 'default'
                                  }>
                                    {pred.prediction.riskLevel}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-xs">
                                  <div>
                                    <p className="text-muted-foreground">Next Hour</p>
                                    <p className="font-semibold">{pred.prediction.nextHourEmissions.toLocaleString()} gCO₂</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Confidence</p>
                                    <p className="font-semibold">{Math.round(pred.prediction.confidence * 100)}%</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Savings</p>
                                    <p className="font-semibold text-green-500">{pred.prediction.projectedSavings.toLocaleString()} gCO₂</p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 gap-4">
                  {/* Default Budget Critical Alert (shown when no current prediction) */}
                  {!currentPrediction && alert && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Card className={`glass-morphic border-border/50 ${
                        alert.risk_level === 'CRITICAL' ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-yellow-500'
                      }`}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg">Budget Critical Alert</CardTitle>
                              <CardDescription className="mt-2 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {alert.breach_prediction.will_breach 
                                  ? `Budget breach predicted in ${alert.breach_prediction.days_until_breach} days`
                                  : 'Budget within safe limits'}
                              </CardDescription>
                            </div>
                            <Badge variant={alert.risk_level === 'CRITICAL' ? 'destructive' : 'secondary'}>
                              {alert.risk_level}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Breach Probability</p>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-red-500"
                                    style={{ width: `${alert.breach_prediction.probability * 100}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium">{Math.round(alert.breach_prediction.probability * 100)}%</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Projected Emissions</p>
                              <p className="text-lg font-semibold text-foreground">{alert.projected_emissions.toLocaleString()} gCO₂</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                              <Lightbulb className="w-4 h-4 text-yellow-500" />
                              AI Recommendations:
                            </p>
                            {alert.recommendations.map((rec, idx) => (
                              <div key={idx} className="flex items-start gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
                                <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <p className="text-sm text-foreground">{rec}</p>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">Apply Recommendations</Button>
                            <Button size="sm" variant="outline">View Details</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Efficiency Analysis */}
                  {analysis && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Card className="glass-morphic border-border/50 border-l-4 border-l-green-500">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg">Efficiency Analysis</CardTitle>
                              <CardDescription className="mt-2">
                                {analysis.summary}
                              </CardDescription>
                            </div>
                            <Badge variant="secondary">
                              Trend: {analysis.trends.direction}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Analysis Confidence</p>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-green-500"
                                    style={{ width: `${analysis.confidence * 100}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium">{Math.round(analysis.confidence * 100)}%</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Trend Confidence</p>
                              <p className="text-lg font-semibold text-foreground">{Math.round(analysis.trends.confidence * 100)}%</p>
                            </div>
                          </div>
                          {analysis.insights.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-sm font-semibold text-foreground">Key Insights:</p>
                              {analysis.insights.map((insight, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                  <p className="text-sm text-foreground">{insight}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
