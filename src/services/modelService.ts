// Service to load and process CarbonCtrl AI model predictions

export interface ModelMetadata {
  model: string;
  engine: string;
  version: string;
  created: string;
}

export interface BreachPrediction {
  will_breach: boolean;
  days_until_breach: number;
  probability: number;
  confidence_level: string;
}

export interface BudgetCriticalAlert {
  forecast_horizon: string;
  breach_prediction: BreachPrediction;
  projected_emissions: number;
  risk_level: string;
  recommendations: string[];
  confidence: number;
}

export interface OptimizationRecommendations {
  response: string;
  suggestions: string[];
}

export interface EfficiencyTrends {
  direction: string;
  magnitude: number;
  confidence: number;
}

export interface EfficiencyAnalysis {
  summary: string;
  key_findings: string[];
  trends: EfficiencyTrends;
  insights: string[];
  confidence: number;
}

export interface Predictions {
  budget_critical_alert: BudgetCriticalAlert;
  optimization_recommendations: OptimizationRecommendations;
  efficiency_analysis: EfficiencyAnalysis;
}

export interface OptimizationStrategy {
  description: string;
  potential_reduction: number;
  complexity: string;
}

export interface KnowledgeBase {
  carbon_intensity_thresholds: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  optimization_strategies: {
    [key: string]: OptimizationStrategy;
  };
  efficiency_benchmarks: {
    excellent: number;
    good: number;
    acceptable: number;
    poor: number;
    critical: number;
  };
  budget_thresholds: {
    safe: number;
    warning: number;
    critical: number;
    breach: number;
  };
}

export interface ModelData {
  metadata: ModelMetadata;
  predictions: Predictions;
  knowledge_base: KnowledgeBase;
}

class ModelService {
  private modelData: ModelData | null = null;
  private loading: boolean = false;

  async loadModel(): Promise<ModelData> {
    if (this.modelData) {
      return this.modelData;
    }

    if (this.loading) {
      // Wait for existing load to complete
      await new Promise(resolve => setTimeout(resolve, 100));
      return this.loadModel();
    }

    this.loading = true;

    try {
      const response = await fetch('/model.json');
      if (!response.ok) {
        throw new Error('Failed to load model data');
      }
      
      this.modelData = await response.json();
      this.loading = false;
      return this.modelData!;
    } catch (error) {
      this.loading = false;
      console.error('Error loading model:', error);
      throw error;
    }
  }

  async getBudgetAlert(): Promise<BudgetCriticalAlert | null> {
    try {
      const data = await this.loadModel();
      return data.predictions.budget_critical_alert;
    } catch (error) {
      console.error('Error getting budget alert:', error);
      return null;
    }
  }

  async getOptimizationRecommendations(): Promise<OptimizationRecommendations | null> {
    try {
      const data = await this.loadModel();
      return data.predictions.optimization_recommendations;
    } catch (error) {
      console.error('Error getting optimization recommendations:', error);
      return null;
    }
  }

  async getEfficiencyAnalysis(): Promise<EfficiencyAnalysis | null> {
    try {
      const data = await this.loadModel();
      return data.predictions.efficiency_analysis;
    } catch (error) {
      console.error('Error getting efficiency analysis:', error);
      return null;
    }
  }

  async getKnowledgeBase(): Promise<KnowledgeBase | null> {
    try {
      const data = await this.loadModel();
      return data.knowledge_base;
    } catch (error) {
      console.error('Error getting knowledge base:', error);
      return null;
    }
  }

  async getMetadata(): Promise<ModelMetadata | null> {
    try {
      const data = await this.loadModel();
      return data.metadata;
    } catch (error) {
      console.error('Error getting metadata:', error);
      return null;
    }
  }

  getRiskColor(riskLevel: string): string {
    switch (riskLevel.toUpperCase()) {
      case 'CRITICAL':
        return 'text-red-500';
      case 'HIGH':
        return 'text-orange-500';
      case 'MEDIUM':
        return 'text-yellow-500';
      case 'LOW':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  }

  getConfidenceBadge(confidence: number): string {
    if (confidence >= 0.8) return 'high';
    if (confidence >= 0.6) return 'medium';
    return 'low';
  }
}

export const modelService = new ModelService();
