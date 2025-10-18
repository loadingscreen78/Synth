# AI Predictions - Analyze Button Feature

## Overview
The AI Predictions page now includes an "Analyze Devices" button that generates real-time predictions based on currently connected devices, with different values for each device configuration.

## New Features

### ✅ **1. Analyze Button**
- **Location**: Top right of AI Predictions page
- **Icon**: Sparkles icon
- **Text**: "Analyze Devices"
- **Behavior**: 
  - Checks for connected devices
  - Shows error if no devices connected
  - Simulates 2-second AI analysis
  - Generates predictions based on device data
  - Shows success toast notification

### ✅ **2. Dynamic Predictions**
Each analysis generates **unique predictions** based on:
- **Number of devices** connected
- **Total carbon emissions** from all devices
- **Average CPU usage** across devices
- **Average temperature** of devices
- **Device types** and configurations

### ✅ **3. Current Analysis Display**
When you click "Analyze Devices", it shows:

#### Header Card
- "Current Analysis" title with Sparkles icon
- Timestamp of when analysis was generated
- Number of devices analyzed
- "Latest" badge

#### Three Metric Cards
1. **Risk Level**
   - LOW (green) if emissions < 3000 gCO₂
   - MEDIUM (yellow) if emissions 3000-5000 gCO₂
   - HIGH (red) if emissions > 5000 gCO₂

2. **Next Hour Emissions**
   - Projected emissions (+15% increase)
   - Yellow color
   - Displayed in gCO₂

3. **Model Confidence**
   - Always 87% (from model)
   - Green color
   - Percentage display

#### Device-Based Predictions Card
Shows detailed analysis:
- **Total Emissions**: Sum of all connected devices
- **Avg CPU Usage**: Mean CPU utilization
- **Projected Savings**: 23% of current emissions
- **AI Recommendations**: Dynamic list based on metrics
- **Connected Devices**: Grid showing all devices with emissions

### ✅ **4. Prediction History**
- **Storage**: localStorage (`prediction_history`)
- **Capacity**: Keeps last 10 predictions
- **Toggle Button**: "Show/Hide History (X)" 
- **Display**: Expandable section with animation

#### History Card Shows:
For each past prediction:
- **Timestamp**: When prediction was generated
- **Device Count**: Number of devices analyzed
- **Total Emissions**: Carbon output at that time
- **Risk Level Badge**: Color-coded (HIGH/MEDIUM/LOW)
- **Next Hour Forecast**: Projected emissions
- **Confidence Score**: Model confidence percentage
- **Projected Savings**: Potential reduction

### ✅ **5. Different Values Per Device Configuration**

#### Example Scenarios:

**Scenario 1: Connect 2 Devices (3,100 gCO₂)**
```
Risk Level: MEDIUM
Next Hour: 3,565 gCO₂
Projected Savings: 713 gCO₂
Recommendations:
- Enable auto-scaling for better resource utilization
```

**Scenario 2: Connect 4 Devices (5,430 gCO₂)**
```
Risk Level: HIGH
Next Hour: 6,245 gCO₂
Projected Savings: 1,249 gCO₂
Recommendations:
- Consider load balancing to reduce CPU usage
- Implement power-saving mode during off-peak hours
- Enable auto-scaling for better resource utilization
```

**Scenario 3: Connect 6 Devices (6,430 gCO₂)**
```
Risk Level: HIGH
Next Hour: 7,395 gCO₂
Projected Savings: 1,479 gCO₂
Recommendations:
- Consider load balancing to reduce CPU usage
- Cooling system optimization recommended
- Implement power-saving mode during off-peak hours
- Enable auto-scaling for better resource utilization
```

### 📊 **Prediction Calculation Logic**

#### Risk Level Determination
```typescript
if (totalEmissions > 5000) return 'HIGH';
if (totalEmissions > 3000) return 'MEDIUM';
return 'LOW';
```

#### Next Hour Emissions
```typescript
nextHourEmissions = totalEmissions * 1.15 // +15% increase
```

#### Projected Savings
```typescript
projectedSavings = totalEmissions * 0.23 // 23% reduction potential
```

#### Dynamic Recommendations
- **CPU > 70%**: "Consider load balancing to reduce CPU usage"
- **Temp > 45°C**: "Cooling system optimization recommended"
- **Emissions > 4000**: "Implement power-saving mode during off-peak hours"
- **Always**: "Enable auto-scaling for better resource utilization"

### 🔄 **User Flow**

1. **Navigate** to AI Predictions page (`/dashboard/predictions`)
2. **See** default model data (from model.json)
3. **Click** "Analyze Devices" button
4. **Wait** 2 seconds for analysis
5. **View** current prediction with device-specific data
6. **Connect/Disconnect** devices on Device Connection page
7. **Return** to AI Predictions
8. **Click** "Analyze Devices" again
9. **See** different values based on new device configuration
10. **Click** "Show History" to see past predictions

### 💾 **Data Persistence**

#### localStorage Keys
- `prediction_history`: Array of past predictions (max 10)

#### Prediction Object Structure
```json
{
  "id": 1729261234567,
  "timestamp": "2025-10-18T13:30:00.000Z",
  "deviceCount": 4,
  "devices": [
    { "id": "dev-001", "name": "Primary Web Server", "type": "server" }
  ],
  "totalCarbonEmissions": 5430,
  "averageCpuUsage": 65,
  "averageTemperature": 45,
  "prediction": {
    "nextHourEmissions": 6245,
    "riskLevel": "HIGH",
    "recommendations": [...],
    "confidence": 0.87,
    "projectedSavings": 1249
  }
}
```

### 🎨 **Visual Design**

#### Analyze Button
- **Primary variant** (hero style)
- **Large size**
- **Sparkles icon** on left
- **Loading state** with spinner
- **Disabled** during analysis

#### History Button
- **Outline variant**
- **Large size**
- **Clock icon** on left
- **Shows count** in parentheses
- **Toggle** behavior

#### Current Analysis Card
- **Primary border** color
- **"Latest" badge** in header
- **Timestamp** display
- **Device count** in description

#### History Cards
- **Muted background**
- **Hover effect**
- **Color-coded badges**
- **Staggered animation**
- **Compact layout**

### 🚀 **Features Summary**

✅ **Analyze Button**: Generates predictions on demand
✅ **Dynamic Values**: Different for each device configuration
✅ **Current Display**: Shows latest analysis prominently
✅ **History Tracking**: Saves last 10 predictions
✅ **Toggle History**: Expandable history section
✅ **Device List**: Shows which devices were analyzed
✅ **Risk Assessment**: Automatic risk level calculation
✅ **Recommendations**: Context-aware suggestions
✅ **Persistence**: Survives page refreshes
✅ **Animations**: Smooth transitions and effects

### 📱 **Responsive Design**

#### Desktop
- 3 metric cards in a row
- Full device grid (3 columns)
- Side-by-side history layout

#### Tablet
- 2 metric cards per row
- 2-column device grid
- Stacked history cards

#### Mobile
- Stacked metric cards
- Single-column device grid
- Compact history view

### 🔧 **Technical Implementation**

#### State Management
```typescript
const [analyzing, setAnalyzing] = useState(false);
const [currentPrediction, setCurrentPrediction] = useState<any>(null);
const [predictionHistory, setPredictionHistory] = useState<any[]>([]);
const [showHistory, setShowHistory] = useState(false);
```

#### Analysis Function
```typescript
const handleAnalyze = async () => {
  // Check for connected devices
  // Show loading state
  // Generate prediction data
  // Update current prediction
  // Add to history
  // Save to localStorage
  // Show success toast
};
```

### 🎯 **Use Cases**

#### Use Case 1: Baseline Analysis
- Connect 2-3 devices
- Click "Analyze Devices"
- See LOW/MEDIUM risk
- Get baseline recommendations

#### Use Case 2: High Load Scenario
- Connect all 6 devices
- Click "Analyze Devices"
- See HIGH risk
- Get critical recommendations

#### Use Case 3: Comparison
- Analyze with 2 devices
- Add 2 more devices
- Analyze again
- Click "Show History"
- Compare both predictions

#### Use Case 4: Optimization Tracking
- Analyze current setup
- Implement recommendations
- Disconnect high-emission devices
- Analyze again
- See improved metrics

### 📊 **Metrics Tracked**

1. **Total Emissions**: Sum of all device emissions
2. **Average CPU**: Mean CPU usage across devices
3. **Average Temperature**: Mean operating temperature
4. **Risk Level**: Calculated based on emissions
5. **Next Hour Forecast**: Projected emissions
6. **Confidence Score**: Model confidence (87%)
7. **Projected Savings**: Potential reduction (23%)
8. **Device Count**: Number of devices analyzed

### 🔮 **Future Enhancements**

- [ ] Export predictions to CSV
- [ ] Compare two predictions side-by-side
- [ ] Set prediction alerts/thresholds
- [ ] Schedule automatic analyses
- [ ] Email prediction reports
- [ ] Chart prediction trends over time
- [ ] Filter history by risk level
- [ ] Search history by date
- [ ] Delete individual predictions
- [ ] Clear all history button

---

**Key Feature**: Every time you connect or disconnect devices and click "Analyze Devices", you get **different prediction values** tailored to your current device configuration!
