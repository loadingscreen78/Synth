import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Wifi, 
  Server, 
  Database, 
  HardDrive, 
  Network, 
  Activity,
  Zap,
  Thermometer,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { deviceService, Device } from '@/services/deviceService';
import { useNavigate } from 'react-router-dom';

export function ConnectedDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [metrics, setMetrics] = useState({
    totalDevices: 0,
    onlineDevices: 0,
    totalEmissions: 0,
    totalPower: 0,
    averageEfficiency: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Update devices every 2 seconds to reflect changes
    const updateDevices = () => {
      const connectedDevices = deviceService.getConnectedDevices();
      setDevices(connectedDevices);
      setMetrics(deviceService.getMetrics());
    };

    updateDevices();
    const interval = setInterval(updateDevices, 2000);

    return () => clearInterval(interval);
  }, []);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'server':
        return <Server className="w-4 h-4" />;
      case 'database':
        return <Database className="w-4 h-4" />;
      case 'storage':
        return <HardDrive className="w-4 h-4" />;
      case 'network':
        return <Network className="w-4 h-4" />;
      case 'iot':
        return <Wifi className="w-4 h-4" />;
      default:
        return <Cpu className="w-4 h-4" />;
    }
  };

  if (devices.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass-morphic border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-primary" />
              Connected Devices
            </CardTitle>
            <CardDescription>No devices connected yet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Wifi className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-4">
                Connect devices to monitor their carbon emissions and performance
              </p>
              <Button onClick={() => navigate('/dashboard/devices')} variant="hero">
                <Wifi className="w-4 h-4 mr-2" />
                Connect Devices
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="glass-morphic border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="w-5 h-5 text-primary" />
                Connected Devices
              </CardTitle>
              <CardDescription>
                {metrics.totalDevices} device{metrics.totalDevices !== 1 ? 's' : ''} actively monitored
              </CardDescription>
            </div>
            <Button 
              onClick={() => navigate('/dashboard/devices')} 
              variant="outline"
              size="sm"
            >
              Manage
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Metrics Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-3 h-3 text-primary" />
                <p className="text-xs text-muted-foreground">Emissions</p>
              </div>
              <p className="text-lg font-bold text-primary">{metrics.totalEmissions.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">gCO₂</p>
            </div>
            
            <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-3 h-3 text-yellow-500" />
                <p className="text-xs text-muted-foreground">Power</p>
              </div>
              <p className="text-lg font-bold text-yellow-500">{metrics.totalPower}</p>
              <p className="text-xs text-muted-foreground">watts</p>
            </div>
            
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="w-3 h-3 text-green-500" />
                <p className="text-xs text-muted-foreground">Efficiency</p>
              </div>
              <p className="text-lg font-bold text-green-500">{metrics.averageEfficiency}%</p>
            </div>
            
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-2 mb-1">
                <Wifi className="w-3 h-3 text-blue-500" />
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
              <p className="text-lg font-bold text-blue-500">{metrics.onlineDevices}/{metrics.totalDevices}</p>
            </div>
          </div>

          {/* Device List */}
          <div className="space-y-2">
            {devices.map((device, index) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-3 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${
                      device.status === 'online' ? 'bg-green-500/20' :
                      device.status === 'warning' ? 'bg-yellow-500/20' :
                      'bg-red-500/20'
                    }`}>
                      {getDeviceIcon(device.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm truncate">{device.name}</p>
                        <Badge 
                          variant={device.status === 'online' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {device.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{device.ipAddress} • {device.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="text-right">
                      <p className="text-muted-foreground">Emissions</p>
                      <p className="font-semibold">{device.carbonEmission} gCO₂</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">CPU</p>
                      <p className="font-semibold">{device.cpuUsage}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">Temp</p>
                      <p className={`font-semibold ${device.temperature > 50 ? 'text-red-500' : ''}`}>
                        {device.temperature}°C
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          {devices.length > 3 && (
            <Button 
              onClick={() => navigate('/dashboard/devices')} 
              variant="outline"
              className="w-full"
            >
              View All Devices
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
