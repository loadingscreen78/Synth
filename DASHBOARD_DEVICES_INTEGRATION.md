# Dashboard - Connected Devices Integration

## Overview
Connected devices from the Device Connection page now automatically appear on the main Dashboard in real-time.

## Features

### ✅ Real-time Device Display
- **Automatic Updates**: Dashboard refreshes every 2 seconds to show connected devices
- **Persistent Storage**: Connected devices saved to localStorage
- **Cross-page Sync**: Devices connected on `/dashboard/devices` appear on `/dashboard`

### 📊 Dashboard Component

#### Empty State
When no devices are connected:
- Shows empty state with WiFi icon
- Displays message: "Connect devices to monitor their carbon emissions and performance"
- "Connect Devices" button redirects to device connection page

#### Connected State
When devices are connected:
- **Header**: Shows count of connected devices
- **Manage Button**: Quick link to device management page
- **Metrics Summary**: 4 metric cards showing:
  1. Total Emissions (gCO₂)
  2. Total Power (watts)
  3. Average Efficiency (%)
  4. Online Devices count

#### Device List
Each device card displays:
- **Device Icon**: Type-specific icon (Server, Database, Storage, Network, IoT)
- **Device Name**: Full device name
- **Status Badge**: Online/Warning/Offline
- **IP Address**: Device IP
- **Location**: Physical location
- **Emissions**: Carbon output in gCO₂
- **CPU Usage**: Percentage utilization
- **Temperature**: Operating temperature with warning color (>50°C)

### 🔄 How It Works

1. **User connects device** on `/dashboard/devices`
2. **Device saved** to localStorage
3. **Dashboard auto-updates** (2-second polling)
4. **Device appears** in Connected Devices section
5. **Metrics calculate** automatically
6. **Persists** across page refreshes

### 💾 Data Persistence

#### localStorage Key
```
carbonctrl_connected_devices
```

#### Stored Data
```json
["dev-001", "dev-002", "dev-003"]
```

#### Automatic Loading
- Service loads connected devices on initialization
- Devices restore from localStorage on page refresh
- No data loss between sessions

### 🎯 User Flow

#### Scenario 1: First Time User
1. User opens Dashboard → Sees empty state
2. Clicks "Connect Devices" button
3. Redirects to `/dashboard/devices`
4. Connects devices
5. Returns to Dashboard → Sees connected devices

#### Scenario 2: Existing User
1. User opens Dashboard → Sees previously connected devices
2. Metrics display automatically
3. Can click "Manage" to add/remove devices

#### Scenario 3: Managing Devices
1. User on Dashboard clicks "Manage" button
2. Redirects to `/dashboard/devices`
3. Adds or removes devices
4. Returns to Dashboard → Changes reflected immediately

### 📈 Metrics Displayed

#### Total Emissions
- Sum of all connected device emissions
- Displayed in gCO₂
- Primary color (blue)

#### Total Power
- Sum of all device power consumption
- Displayed in watts
- Yellow color

#### Average Efficiency
- Calculated as: Average of (100 - CPU Usage)
- Displayed as percentage
- Green color

#### Online Devices
- Count of devices with "online" status
- Format: "X/Y" (online/total)
- Blue color

### 🎨 Visual Design

#### Color Coding
- **Online**: Green background/badge
- **Warning**: Yellow background/badge
- **Offline**: Red background/badge

#### Temperature Warning
- Normal: Default text color
- High (>50°C): Red text color

#### Hover Effects
- Device cards have hover state
- Background changes on hover
- Smooth transitions

### 🔧 Technical Implementation

#### Component Location
```
src/components/dashboard/ConnectedDevices.tsx
```

#### Service Updates
```
src/services/deviceService.ts
```
- Added localStorage persistence
- Auto-load on initialization
- Save on connect/disconnect

#### Dashboard Integration
```
src/pages/Dashboard.tsx
```
- Imported ConnectedDevices component
- Positioned after AI Insights section
- Before Model Info section

### 🚀 Features

✅ **Real-time Updates**: 2-second polling interval
✅ **Persistent Storage**: localStorage integration
✅ **Empty State**: User-friendly when no devices
✅ **Quick Actions**: "Connect" and "Manage" buttons
✅ **Metrics Summary**: 4 key performance indicators
✅ **Device Details**: Comprehensive device information
✅ **Status Indicators**: Visual status badges
✅ **Temperature Warnings**: Color-coded alerts
✅ **Responsive Design**: Works on all screen sizes
✅ **Smooth Animations**: Framer Motion transitions

### 📱 Responsive Behavior

#### Desktop (lg+)
- 4 metric cards in a row
- Full device details visible
- All columns displayed

#### Tablet (md)
- 2 metric cards per row
- Condensed device layout
- Essential info visible

#### Mobile (sm)
- 2 metric cards per row
- Stacked device cards
- Scrollable list

### 🔄 Update Mechanism

```typescript
useEffect(() => {
  const updateDevices = () => {
    const connectedDevices = deviceService.getConnectedDevices();
    setDevices(connectedDevices);
    setMetrics(deviceService.getMetrics());
  };

  updateDevices();
  const interval = setInterval(updateDevices, 2000);

  return () => clearInterval(interval);
}, []);
```

### 🎯 Navigation Flow

```
Dashboard → "Connect Devices" → Device Connection Page
Dashboard → "Manage" → Device Connection Page
Device Connection Page → Connect Device → Dashboard (auto-updates)
```

### 📊 Metrics Calculation

#### Total Emissions
```typescript
devices.reduce((sum, d) => sum + d.carbonEmission, 0)
```

#### Total Power
```typescript
devices.reduce((sum, d) => sum + d.powerConsumption, 0)
```

#### Average Efficiency
```typescript
devices.reduce((sum, d) => sum + (100 - d.cpuUsage), 0) / devices.length
```

#### Online Count
```typescript
devices.filter(d => d.status === 'online').length
```

### 🎨 UI Components Used

- **Card**: Main container
- **Badge**: Status indicators
- **Button**: Action buttons
- **Motion**: Animations
- **Icons**: Lucide React icons

### 🔐 Data Safety

- localStorage used for persistence
- No sensitive data stored
- Client-side only
- No external API calls
- Safe to clear anytime

### 🐛 Error Handling

- Try-catch for localStorage operations
- Graceful fallback if storage fails
- Console error logging
- No app crashes

### 🎯 Future Enhancements

- [ ] Real-time WebSocket updates
- [ ] Device health alerts
- [ ] Historical device data
- [ ] Device grouping
- [ ] Custom device names
- [ ] Device notes/tags
- [ ] Export device list
- [ ] Device comparison
- [ ] Performance graphs
- [ ] Alert thresholds

---

**Integration Complete**: Connected devices now seamlessly sync between Device Connection page and Dashboard!
