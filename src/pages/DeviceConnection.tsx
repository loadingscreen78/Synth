import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { TopNavBar } from '@/components/dashboard/TopNavBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wifi, 
  WifiOff, 
  Server, 
  Database, 
  HardDrive, 
  Network, 
  Cpu,
  Activity,
  Thermometer,
  Zap,
  Download,
  Loader2,
  CheckCircle,
  AlertTriangle,
  FileText,
  MapPin
} from 'lucide-react';
import { deviceService, Device } from '@/services/deviceService';
import { NetworkTopology } from '@/components/devices/NetworkTopology';
import { generatePDFReport } from '@/utils/pdfGenerator';
import { useToast } from '@/hooks/use-toast';

export default function DeviceConnection() {
  const [discovering, setDiscovering] = useState(false);
  const [availableDevices, setAvailableDevices] = useState<Device[]>([]);
  const [connectedDevices, setConnectedDevices] = useState<Device[]>([]);
  const [showTopology, setShowTopology] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);
  const { toast } = useToast();

  const handleDiscoverDevices = async () => {
    setDiscovering(true);
    try {
      const devices = await deviceService.discoverDevices();
      setAvailableDevices(devices);
      toast({
        title: 'Devices Discovered',
        description: `Found ${devices.length} devices on the network`,
      });
    } catch (error) {
      toast({
        title: 'Discovery Failed',
        description: 'Failed to discover devices',
        variant: 'destructive',
      });
    } finally {
      setDiscovering(false);
    }
  };

  const handleConnectDevice = (deviceId: string) => {
    const success = deviceService.connectDevice(deviceId);
    if (success) {
      setConnectedDevices(deviceService.getConnectedDevices());
      toast({
        title: 'Device Connected',
        description: 'Device successfully added to monitoring',
      });
    }
  };

  const handleDisconnectDevice = (deviceId: string) => {
    deviceService.disconnectDevice(deviceId);
    setConnectedDevices(deviceService.getConnectedDevices());
    toast({
      title: 'Device Disconnected',
      description: 'Device removed from monitoring',
    });
  };

  const handleGenerateReport = () => {
    if (connectedDevices.length === 0) {
      toast({
        title: 'No Devices',
        description: 'Please connect devices before generating a report',
        variant: 'destructive',
      });
      return;
    }

    setGeneratingReport(true);
    
    // Get prediction data from model
    const predictionData = deviceService.getModelPredictionData();
    const metrics = deviceService.getMetrics();

    // Generate PDF
    setTimeout(() => {
      generatePDFReport({
        title: 'CarbonCtrl Device Analysis Report',
        timestamp: new Date().toISOString(),
        deviceCount: metrics.totalDevices,
        totalEmissions: metrics.totalEmissions,
        riskLevel: predictionData.prediction.riskLevel,
        predictions: predictionData.prediction,
        devices: predictionData.devices,
        recommendations: predictionData.prediction.recommendations,
      });

      setGeneratingReport(false);
      toast({
        title: 'Report Generated',
        description: 'PDF report is ready for download',
      });
    }, 1000);
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'server':
        return <Server className="w-5 h-5" />;
      case 'database':
        return <Database className="w-5 h-5" />;
      case 'storage':
        return <HardDrive className="w-5 h-5" />;
      case 'network':
        return <Network className="w-5 h-5" />;
      case 'iot':
        return <Wifi className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  const metrics = deviceService.getMetrics();
  const predictionData = connectedDevices.length > 0 ? deviceService.getModelPredictionData() : null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-black/95 glass-morphic">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <TopNavBar />
          
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <h1 className="text-3xl md:text-4xl font-bold glow-text">
                <Wifi className="inline-block w-8 h-8 mr-2 text-primary" />
                Device Connection & Monitoring
              </h1>
              <p className="text-muted-foreground text-lg">
                Connect devices, analyze carbon emissions, and generate reports
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                onClick={handleDiscoverDevices}
                disabled={discovering}
                size="lg"
                variant="hero"
              >
                {discovering ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Discovering...
                  </>
                ) : (
                  <>
                    <Wifi className="w-5 h-5 mr-2" />
                    Connect Devices
                  </>
                )}
              </Button>

              {connectedDevices.length > 0 && (
                <>
                  <Button
                    onClick={() => setShowTopology(!showTopology)}
                    size="lg"
                    variant="outline"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    {showTopology ? 'Hide' : 'Show'} Topology
                  </Button>

                  <Button
                    onClick={handleGenerateReport}
                    disabled={generatingReport}
                    size="lg"
                    variant="outline"
                  >
                    {generatingReport ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5 mr-2" />
                        Generate PDF Report
                      </>
                    )}
                  </Button>
                </>
              )}
            </motion.div>

            {/* Metrics Dashboard */}
            {connectedDevices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <Card className="glass-morphic border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Connected Devices</p>
                        <p className="text-3xl font-bold text-primary">{metrics.totalDevices}</p>
                      </div>
                      <CheckCircle className="w-10 h-10 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-morphic border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Emissions</p>
                        <p className="text-3xl font-bold text-red-500">{metrics.totalEmissions.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">gCO₂</p>
                      </div>
                      <Activity className="w-10 h-10 text-red-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-morphic border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Power</p>
                        <p className="text-3xl font-bold text-yellow-500">{metrics.totalPower}</p>
                        <p className="text-xs text-muted-foreground">watts</p>
                      </div>
                      <Zap className="w-10 h-10 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-morphic border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Efficiency</p>
                        <p className="text-3xl font-bold text-green-500">{metrics.averageEfficiency}%</p>
                      </div>
                      <Cpu className="w-10 h-10 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* AI Prediction Results */}
            {predictionData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="glass-morphic border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      AI Model Predictions
                    </CardTitle>
                    <CardDescription>
                      Real-time analysis powered by CarbonCtrl Intelligence Layer
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                        <p className="text-sm text-muted-foreground mb-1">Next Hour Emissions</p>
                        <p className="text-2xl font-bold">{predictionData.prediction.nextHourEmissions.toLocaleString()} gCO₂</p>
                      </div>
                      <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                        <p className="text-sm text-muted-foreground mb-1">Risk Level</p>
                        <Badge variant={predictionData.prediction.riskLevel === 'HIGH' ? 'destructive' : 'secondary'}>
                          {predictionData.prediction.riskLevel}
                        </Badge>
                      </div>
                      <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <p className="text-sm text-muted-foreground mb-1">Projected Savings</p>
                        <p className="text-2xl font-bold text-green-500">{predictionData.prediction.projectedSavings.toLocaleString()} gCO₂</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        AI Recommendations
                      </h4>
                      <ul className="space-y-2">
                        {predictionData.prediction.recommendations.map((rec: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span className="text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Activity className="w-4 h-4" />
                      <span>Model Confidence: {Math.round(predictionData.prediction.confidence * 100)}%</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Network Topology */}
            <AnimatePresence>
              {showTopology && connectedDevices.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <NetworkTopology devices={connectedDevices} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Available Devices */}
            {availableDevices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="glass-morphic border-border/50">
                  <CardHeader>
                    <CardTitle>Available Devices</CardTitle>
                    <CardDescription>
                      {availableDevices.length} devices discovered on the network
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {availableDevices.map((device, idx) => {
                        const isConnected = deviceService.isConnected(device.id);
                        return (
                          <motion.div
                            key={device.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Card className={`border-border/50 ${isConnected ? 'bg-primary/10 border-primary/50' : ''}`}>
                              <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                  <div className="flex items-center gap-2">
                                    {getDeviceIcon(device.type)}
                                    <div>
                                      <CardTitle className="text-base">{device.name}</CardTitle>
                                      <p className="text-xs text-muted-foreground">{device.ipAddress}</p>
                                    </div>
                                  </div>
                                  <Badge variant={device.status === 'online' ? 'default' : 'destructive'}>
                                    {device.status}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <p className="text-muted-foreground text-xs">Emissions</p>
                                    <p className="font-semibold">{device.carbonEmission} gCO₂</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground text-xs">Power</p>
                                    <p className="font-semibold">{device.powerConsumption}W</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground text-xs">CPU</p>
                                    <p className="font-semibold">{device.cpuUsage}%</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground text-xs">Temp</p>
                                    <p className="font-semibold">{device.temperature}°C</p>
                                  </div>
                                </div>
                                <Button
                                  onClick={() => isConnected ? handleDisconnectDevice(device.id) : handleConnectDevice(device.id)}
                                  className="w-full"
                                  variant={isConnected ? 'destructive' : 'default'}
                                  size="sm"
                                >
                                  {isConnected ? (
                                    <>
                                      <WifiOff className="w-4 h-4 mr-2" />
                                      Disconnect
                                    </>
                                  ) : (
                                    <>
                                      <Wifi className="w-4 h-4 mr-2" />
                                      Connect
                                    </>
                                  )}
                                </Button>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Empty State */}
            {availableDevices.length === 0 && !discovering && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <Wifi className="w-20 h-20 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Devices Discovered</h3>
                <p className="text-muted-foreground mb-6">Click "Connect Devices" to discover devices on your network</p>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
