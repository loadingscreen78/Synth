# Device Connection & Monitoring System

## Overview
Complete device connection system with network topology visualization, AI predictions, and PDF report generation.

## Features

### 1. **Connect Button & Device Discovery**
- Click "Connect Devices" button to discover available devices
- Simulates network scanning with 1.5s delay
- Displays 6 dummy devices with real-time metrics

### 2. **Dummy Devices**
The system includes 6 pre-configured devices:

#### Primary Web Server
- **Type:** Server
- **Location:** Data Center A - Rack 1
- **IP:** 192.168.1.10
- **Emissions:** 1,250 gCO₂
- **Power:** 450W
- **CPU Usage:** 65%
- **Temperature:** 42°C

#### Database Server Alpha
- **Type:** Database
- **Location:** Data Center A - Rack 2
- **IP:** 192.168.1.20
- **Emissions:** 1,850 gCO₂
- **Power:** 680W
- **CPU Usage:** 78%
- **Temperature:** 48°C

#### Storage Array 1
- **Type:** Storage
- **Location:** Data Center A - Rack 3
- **IP:** 192.168.1.30
- **Emissions:** 980 gCO₂
- **Power:** 320W
- **CPU Usage:** 45%
- **Temperature:** 38°C

#### Backup Server
- **Type:** Server
- **Location:** Data Center B - Rack 1
- **IP:** 192.168.2.10
- **Emissions:** 750 gCO₂
- **Power:** 280W
- **CPU Usage:** 88% (Warning Status)
- **Temperature:** 55°C

#### Load Balancer
- **Type:** Network
- **Location:** Data Center A - Network Room
- **IP:** 192.168.1.1
- **Emissions:** 420 gCO₂
- **Power:** 150W
- **CPU Usage:** 32%
- **Temperature:** 35°C

#### IoT Gateway
- **Type:** IoT
- **Location:** Data Center A - Edge
- **IP:** 192.168.1.50
- **Emissions:** 180 gCO₂
- **Power:** 65W
- **CPU Usage:** 28%
- **Temperature:** 40°C

### 3. **Device Management**
- **Connect/Disconnect:** Add or remove devices from monitoring
- **Real-time Status:** Online, Warning, or Offline indicators
- **Device Cards:** Display key metrics for each device
- **Color-coded Status:** Green (online), Yellow (warning), Red (offline)

### 4. **AI Model Predictions**
When devices are connected, the AI model analyzes:

#### Metrics Calculated
- **Total Emissions:** Sum of all connected devices
- **Average CPU Usage:** Mean CPU utilization
- **Average Temperature:** Mean operating temperature
- **Risk Level:** LOW, MEDIUM, or HIGH based on emissions

#### Predictions Generated
- **Next Hour Emissions:** Projected emissions (+15% increase)
- **Risk Assessment:** Automatic risk level determination
- **Projected Savings:** Potential reduction (23% of current)
- **Confidence Score:** Model confidence (87%)

#### AI Recommendations
Dynamic recommendations based on device metrics:
- Load balancing suggestions (if CPU > 70%)
- Cooling optimization (if temp > 45°C)
- Power-saving mode recommendations (if emissions > 4000)
- Auto-scaling enablement

### 5. **Network Topology Visualization**

#### Features
- **Interactive Canvas:** 800x600px topology map
- **Circular Layout:** Devices positioned in a circle
- **Connection Lines:** Shows device interconnections
- **Directional Arrows:** Indicates data flow direction
- **Hover Details:** Tooltip with device information
- **Color Coding:** Status-based node colors
- **Device Icons:** Type-specific visual indicators

#### Topology Map Details
- Nodes represent devices
- Lines show connections between devices
- Hover over nodes to see detailed information
- Connection count displayed at bottom
- Legend shows status colors

### 6. **PDF Report Generation**

#### Report Contents
1. **Executive Summary**
   - Total devices connected
   - Total carbon emissions
   - Risk level badge
   - Projected savings

2. **AI Predictions**
   - Next hour emissions forecast
   - Model confidence percentage
   - Average CPU usage
   - Average temperature

3. **Device Table**
   - Device name and type
   - Status indicator
   - Emissions per device
   - Efficiency percentage

4. **AI Recommendations**
   - Bulleted list of actionable items
   - Priority-based ordering
   - Implementation suggestions

5. **Footer**
   - Model information
   - Generation timestamp
   - Branding

#### Report Features
- **Professional Design:** Clean, modern layout
- **Print-ready:** Optimized for PDF printing
- **Color-coded:** Risk levels and status indicators
- **Responsive Tables:** Organized data presentation
- **Auto-print:** Opens print dialog automatically

### 7. **Real-time Metrics Dashboard**
Four key metric cards:

1. **Connected Devices**
   - Count of active connections
   - Green checkmark icon

2. **Total Emissions**
   - Aggregated carbon output
   - Red activity icon
   - Measured in gCO₂

3. **Total Power**
   - Combined power consumption
   - Yellow lightning icon
   - Measured in watts

4. **Average Efficiency**
   - Mean efficiency score
   - Green CPU icon
   - Percentage-based

## Usage Guide

### Step 1: Navigate to Device Connection
- Go to `/dashboard/devices` or click "Device Connection" in sidebar

### Step 2: Discover Devices
- Click the "Connect Devices" button
- Wait for discovery process (1.5 seconds)
- View available devices in grid layout

### Step 3: Connect Devices
- Click "Connect" button on any device card
- Device moves to connected state
- Metrics dashboard updates automatically
- AI predictions generate immediately

### Step 4: View Topology
- Click "Show Topology" button
- Interactive network map appears
- Hover over nodes for device details
- View connection relationships

### Step 5: Generate Report
- Click "Generate PDF Report" button
- Report opens in new window
- Print dialog appears automatically
- Save as PDF or print directly

### Step 6: Manage Devices
- Disconnect devices as needed
- Metrics update in real-time
- Topology map adjusts automatically

## Technical Architecture

### Services
- **deviceService.ts:** Device management and data
- **modelService.ts:** AI predictions and analysis
- **pdfGenerator.ts:** Report generation utility

### Components
- **DeviceConnection.tsx:** Main page component
- **NetworkTopology.tsx:** Canvas-based visualization
- **Device Cards:** Individual device displays

### Data Flow
1. User clicks "Connect Devices"
2. Service discovers dummy devices
3. User connects specific devices
4. Metrics calculate automatically
5. AI model analyzes data
6. Predictions display on screen
7. User generates PDF report
8. Topology visualizes connections

## API Reference

### Device Service Methods

```typescript
// Discover available devices
await deviceService.discoverDevices(): Promise<Device[]>

// Connect a device
deviceService.connectDevice(deviceId: string): boolean

// Disconnect a device
deviceService.disconnectDevice(deviceId: string): boolean

// Get connected devices
deviceService.getConnectedDevices(): Device[]

// Get metrics
deviceService.getMetrics(): DeviceMetrics

// Get model prediction data
deviceService.getModelPredictionData(): any

// Check connection status
deviceService.isConnected(deviceId: string): boolean
```

### PDF Generator

```typescript
generatePDFReport(data: ReportData): void
```

## Device Types & Icons
- **Server:** Server icon (S)
- **Database:** Database icon (D)
- **Storage:** Hard drive icon (ST)
- **Network:** Network icon (N)
- **IoT:** Wifi icon (I)

## Status Indicators
- **Online:** Green badge, fully operational
- **Warning:** Yellow badge, needs attention
- **Offline:** Red badge, not responding

## Metrics Explained

### Carbon Emissions (gCO₂)
- Grams of CO₂ equivalent
- Per device measurement
- Aggregated for total

### Power Consumption (Watts)
- Real-time power draw
- Per device measurement
- Sum for total power

### CPU Usage (%)
- Processor utilization
- 0-100% scale
- Affects efficiency score

### Temperature (°C)
- Operating temperature
- Celsius measurement
- Warning threshold: 45°C

### Efficiency (%)
- Calculated as: 100 - CPU Usage
- Higher is better
- Average across devices

## Troubleshooting

### No Devices Appearing
- Click "Connect Devices" button
- Wait for discovery to complete
- Check browser console for errors

### PDF Not Generating
- Ensure pop-ups are allowed
- Check if devices are connected
- Try different browser

### Topology Not Showing
- Click "Show Topology" button
- Ensure devices are connected
- Check canvas rendering

## Future Enhancements
- [ ] Real device integration via API
- [ ] Live data streaming
- [ ] Historical trend analysis
- [ ] Custom device addition
- [ ] Export topology as image
- [ ] Email report delivery
- [ ] Scheduled report generation
- [ ] Multi-location support
- [ ] Device grouping
- [ ] Alert notifications

## Security Notes
- All data is client-side only
- No external API calls
- Dummy data for demonstration
- Production requires authentication
- Secure device credentials needed

## Performance
- Lightweight canvas rendering
- Efficient state management
- Optimized re-renders
- Fast PDF generation
- Smooth animations

## Browser Support
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile: Responsive design

## Accessibility
- Keyboard navigation
- Screen reader friendly
- High contrast support
- Focus indicators
- ARIA labels

---

**Built with:** React, TypeScript, Tailwind CSS, Framer Motion, Canvas API
**Model:** CarbonCtrl AI Intelligence Layer (Qwen/Qwen2-1.5B-Instruct)
