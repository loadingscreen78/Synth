// Device Service - Manages dummy devices and their data

export interface Device {
  id: string;
  name: string;
  type: 'server' | 'database' | 'storage' | 'network' | 'iot';
  status: 'online' | 'offline' | 'warning';
  location: string;
  ipAddress: string;
  carbonEmission: number; // gCO2
  powerConsumption: number; // watts
  uptime: number; // hours
  temperature: number; // celsius
  cpuUsage: number; // percentage
  memoryUsage: number; // percentage
  networkTraffic: number; // MB/s
  lastUpdated: string;
  connectedTo: string[]; // IDs of connected devices
}

export interface DeviceMetrics {
  totalDevices: number;
  onlineDevices: number;
  totalEmissions: number;
  totalPower: number;
  averageEfficiency: number;
}

// Dummy devices data
const dummyDevices: Device[] = [
  {
    id: 'dev-001',
    name: 'Primary Web Server',
    type: 'server',
    status: 'online',
    location: 'Data Center A - Rack 1',
    ipAddress: '192.168.1.10',
    carbonEmission: 1250,
    powerConsumption: 450,
    uptime: 720,
    temperature: 42,
    cpuUsage: 65,
    memoryUsage: 72,
    networkTraffic: 125.5,
    lastUpdated: new Date().toISOString(),
    connectedTo: ['dev-002', 'dev-005'],
  },
  {
    id: 'dev-002',
    name: 'Database Server Alpha',
    type: 'database',
    status: 'online',
    location: 'Data Center A - Rack 2',
    ipAddress: '192.168.1.20',
    carbonEmission: 1850,
    powerConsumption: 680,
    uptime: 1440,
    temperature: 48,
    cpuUsage: 78,
    memoryUsage: 85,
    networkTraffic: 89.3,
    lastUpdated: new Date().toISOString(),
    connectedTo: ['dev-001', 'dev-003'],
  },
  {
    id: 'dev-003',
    name: 'Storage Array 1',
    type: 'storage',
    status: 'online',
    location: 'Data Center A - Rack 3',
    ipAddress: '192.168.1.30',
    carbonEmission: 980,
    powerConsumption: 320,
    uptime: 2160,
    temperature: 38,
    cpuUsage: 45,
    memoryUsage: 68,
    networkTraffic: 210.7,
    lastUpdated: new Date().toISOString(),
    connectedTo: ['dev-002', 'dev-004'],
  },
  {
    id: 'dev-004',
    name: 'Backup Server',
    type: 'server',
    status: 'warning',
    location: 'Data Center B - Rack 1',
    ipAddress: '192.168.2.10',
    carbonEmission: 750,
    powerConsumption: 280,
    uptime: 360,
    temperature: 55,
    cpuUsage: 88,
    memoryUsage: 92,
    networkTraffic: 45.2,
    lastUpdated: new Date().toISOString(),
    connectedTo: ['dev-003', 'dev-005'],
  },
  {
    id: 'dev-005',
    name: 'Load Balancer',
    type: 'network',
    status: 'online',
    location: 'Data Center A - Network Room',
    ipAddress: '192.168.1.1',
    carbonEmission: 420,
    powerConsumption: 150,
    uptime: 4320,
    temperature: 35,
    cpuUsage: 32,
    memoryUsage: 48,
    networkTraffic: 450.8,
    lastUpdated: new Date().toISOString(),
    connectedTo: ['dev-001', 'dev-004', 'dev-006'],
  },
  {
    id: 'dev-006',
    name: 'IoT Gateway',
    type: 'iot',
    status: 'online',
    location: 'Data Center A - Edge',
    ipAddress: '192.168.1.50',
    carbonEmission: 180,
    powerConsumption: 65,
    uptime: 1080,
    temperature: 40,
    cpuUsage: 28,
    memoryUsage: 35,
    networkTraffic: 15.3,
    lastUpdated: new Date().toISOString(),
    connectedTo: ['dev-005'],
  },
];

class DeviceService {
  private devices: Device[] = [];
  private connectedDevices: Set<string> = new Set();
  private readonly STORAGE_KEY = 'carbonctrl_connected_devices';

  constructor() {
    // Load connected devices from localStorage on initialization
    this.loadFromStorage();
  }

  // Load connected devices from localStorage
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const deviceIds: string[] = JSON.parse(stored);
        deviceIds.forEach(id => {
          const device = dummyDevices.find(d => d.id === id);
          if (device) {
            this.connectedDevices.add(id);
            if (!this.devices.find(d => d.id === id)) {
              this.devices.push({ ...device });
            }
          }
        });
      }
    } catch (error) {
      console.error('Error loading devices from storage:', error);
    }
  }

  // Save connected devices to localStorage
  private saveToStorage(): void {
    try {
      const deviceIds = Array.from(this.connectedDevices);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(deviceIds));
    } catch (error) {
      console.error('Error saving devices to storage:', error);
    }
  }

  // Simulate discovering devices
  async discoverDevices(): Promise<Device[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return [...dummyDevices];
  }

  // Connect to a device
  connectDevice(deviceId: string): boolean {
    const device = dummyDevices.find(d => d.id === deviceId);
    if (device) {
      this.connectedDevices.add(deviceId);
      if (!this.devices.find(d => d.id === deviceId)) {
        this.devices.push({ ...device });
      }
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Disconnect device
  disconnectDevice(deviceId: string): boolean {
    this.connectedDevices.delete(deviceId);
    this.devices = this.devices.filter(d => d.id !== deviceId);
    this.saveToStorage();
    return true;
  }

  // Get all connected devices
  getConnectedDevices(): Device[] {
    return this.devices.filter(d => this.connectedDevices.has(d.id));
  }

  // Get device by ID
  getDevice(deviceId: string): Device | undefined {
    return this.devices.find(d => d.id === deviceId);
  }

  // Calculate metrics
  getMetrics(): DeviceMetrics {
    const connected = this.getConnectedDevices();
    const totalEmissions = connected.reduce((sum, d) => sum + d.carbonEmission, 0);
    const totalPower = connected.reduce((sum, d) => sum + d.powerConsumption, 0);
    const avgEfficiency = connected.length > 0
      ? connected.reduce((sum, d) => sum + (100 - d.cpuUsage), 0) / connected.length
      : 0;

    return {
      totalDevices: connected.length,
      onlineDevices: connected.filter(d => d.status === 'online').length,
      totalEmissions,
      totalPower,
      averageEfficiency: Math.round(avgEfficiency),
    };
  }

  // Get model prediction data for devices
  getModelPredictionData(): any {
    const devices = this.getConnectedDevices();
    const totalEmissions = devices.reduce((sum, d) => sum + d.carbonEmission, 0);
    const avgCpuUsage = devices.reduce((sum, d) => sum + d.cpuUsage, 0) / devices.length;
    const avgTemp = devices.reduce((sum, d) => sum + d.temperature, 0) / devices.length;

    return {
      timestamp: new Date().toISOString(),
      deviceCount: devices.length,
      totalCarbonEmissions: totalEmissions,
      averageCpuUsage: Math.round(avgCpuUsage),
      averageTemperature: Math.round(avgTemp),
      prediction: {
        nextHourEmissions: Math.round(totalEmissions * 1.15),
        riskLevel: totalEmissions > 5000 ? 'HIGH' : totalEmissions > 3000 ? 'MEDIUM' : 'LOW',
        recommendations: [
          avgCpuUsage > 70 ? 'Consider load balancing to reduce CPU usage' : null,
          avgTemp > 45 ? 'Cooling system optimization recommended' : null,
          totalEmissions > 4000 ? 'Implement power-saving mode during off-peak hours' : null,
          'Enable auto-scaling for better resource utilization',
        ].filter(Boolean),
        confidence: 0.87,
        projectedSavings: Math.round(totalEmissions * 0.23),
      },
      devices: devices.map(d => ({
        id: d.id,
        name: d.name,
        type: d.type,
        emissions: d.carbonEmission,
        efficiency: 100 - d.cpuUsage,
        status: d.status,
      })),
    };
  }

  // Check if device is connected
  isConnected(deviceId: string): boolean {
    return this.connectedDevices.has(deviceId);
  }
}

export const deviceService = new DeviceService();
