# CarbonCtrl AI Model Integration

## Overview
This document describes the integration of the CarbonCtrl AI Intelligence Layer model into the dashboard application.

## Model Files
- **model.json**: Contains AI predictions, knowledge base, and metadata
- **carbonctrl_intelligence.h5**: H5 model file (stored for reference)

## Architecture

### 1. Model Service (`src/services/modelService.ts`)
Central service for loading and processing model data:
- `loadModel()`: Loads the model.json file
- `getBudgetAlert()`: Returns budget critical alert predictions
- `getOptimizationRecommendations()`: Returns optimization suggestions
- `getEfficiencyAnalysis()`: Returns efficiency analysis data
- `getKnowledgeBase()`: Returns thresholds and benchmarks

### 2. React Hooks (`src/hooks/useModelData.ts`)
Custom hooks for easy data access in components:
- `useModelData()`: Loads complete model data
- `useBudgetAlert()`: Loads budget alert predictions
- `useEfficiencyAnalysis()`: Loads efficiency analysis
- `useOptimizationRecommendations()`: Loads optimization recommendations

### 3. Components

#### AIInsights Component (`src/components/dashboard/AIInsights.tsx`)
Displays real-time AI insights on the dashboard:
- Budget critical alerts with breach predictions
- Efficiency analysis with confidence scores
- Top recommendations from the AI model

#### ModelInfo Component (`src/components/dashboard/ModelInfo.tsx`)
Shows model metadata:
- Model name: Qwen/Qwen2-1.5B-Instruct
- Engine: CarbonCtrl AI Intelligence Layer
- Version and creation date

#### AIPredictions Page (`src/pages/AIPredictions.tsx`)
Full predictions dashboard showing:
- Risk level and breach probability
- Model confidence scores
- Detailed budget alerts with recommendations
- Efficiency analysis with trends
- Interactive cards with progress bars

## Model Data Structure

### Metadata
```json
{
  "model": "Qwen/Qwen2-1.5B-Instruct",
  "engine": "CarbonCtrl AI Intelligence Layer",
  "version": "1.0",
  "created": "2025-10-18T12:35:18.069251"
}
```

### Budget Critical Alert
- **Risk Level**: CRITICAL/HIGH/MEDIUM/LOW
- **Breach Prediction**: Days until breach, probability, confidence
- **Projected Emissions**: Forecasted carbon emissions
- **Recommendations**: AI-generated action items

### Efficiency Analysis
- **Summary**: Current status and emissions
- **Trends**: Direction, magnitude, confidence
- **Insights**: Key findings and recommendations

### Knowledge Base
- Carbon intensity thresholds
- Optimization strategies with potential reduction percentages
- Efficiency benchmarks
- Budget thresholds

## Usage

### Loading Model Data in a Component
```typescript
import { useModelData } from '@/hooks/useModelData';

function MyComponent() {
  const { modelData, loading, error } = useModelData();
  
  if (loading) return <Loader />;
  if (error) return <Error message={error.message} />;
  
  return <div>{modelData.predictions.budget_critical_alert.risk_level}</div>;
}
```

### Using Specific Hooks
```typescript
import { useBudgetAlert } from '@/hooks/useModelData';

function AlertComponent() {
  const { alert, loading } = useBudgetAlert();
  
  return (
    <div>
      Risk: {alert?.risk_level}
      Confidence: {alert?.confidence * 100}%
    </div>
  );
}
```

## Features Implemented

✅ **Real-time AI Predictions**: Live data from the model displayed on dashboard
✅ **Budget Breach Alerts**: Critical warnings with days until breach
✅ **Confidence Scores**: Model confidence displayed for all predictions
✅ **Recommendations**: AI-generated actionable recommendations
✅ **Efficiency Trends**: Analysis of carbon efficiency with trend direction
✅ **Model Metadata**: Display of model information and version
✅ **Loading States**: Proper loading indicators while fetching data
✅ **Error Handling**: Graceful error handling for failed data loads

## Dashboard Integration Points

1. **Main Dashboard** (`/dashboard`)
   - AIInsights component shows top 3 predictions
   - ModelInfo component displays model metadata

2. **AI Predictions Page** (`/dashboard/predictions`)
   - Full detailed view of all predictions
   - Interactive cards with confidence bars
   - Complete recommendation lists
   - Efficiency analysis with insights

## Model Updates

To update the model data:
1. Replace `public/model.json` with new predictions
2. Replace `public/carbonctrl_intelligence.h5` if model changes
3. The app will automatically load new data on refresh

## Performance

- Model data is cached after first load
- Lazy loading prevents unnecessary API calls
- React hooks ensure efficient re-renders
- Progress bars and loaders provide user feedback

## Future Enhancements

- [ ] Real-time model inference using the H5 file
- [ ] WebSocket integration for live predictions
- [ ] Historical prediction tracking
- [ ] A/B testing different model versions
- [ ] Model performance metrics dashboard
