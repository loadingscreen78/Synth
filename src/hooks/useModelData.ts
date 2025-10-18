import { useState, useEffect } from 'react';
import { modelService, ModelData, BudgetCriticalAlert, EfficiencyAnalysis, OptimizationRecommendations } from '@/services/modelService';

export function useModelData() {
  const [modelData, setModelData] = useState<ModelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await modelService.loadModel();
        setModelData(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { modelData, loading, error };
}

export function useBudgetAlert() {
  const [alert, setAlert] = useState<BudgetCriticalAlert | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlert() {
      try {
        setLoading(true);
        const data = await modelService.getBudgetAlert();
        setAlert(data);
      } catch (err) {
        console.error('Error fetching budget alert:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAlert();
  }, []);

  return { alert, loading };
}

export function useEfficiencyAnalysis() {
  const [analysis, setAnalysis] = useState<EfficiencyAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        setLoading(true);
        const data = await modelService.getEfficiencyAnalysis();
        setAnalysis(data);
      } catch (err) {
        console.error('Error fetching efficiency analysis:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalysis();
  }, []);

  return { analysis, loading };
}

export function useOptimizationRecommendations() {
  const [recommendations, setRecommendations] = useState<OptimizationRecommendations | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        const data = await modelService.getOptimizationRecommendations();
        setRecommendations(data);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, []);

  return { recommendations, loading };
}
