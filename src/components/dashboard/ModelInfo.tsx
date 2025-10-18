import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Calendar, Cpu } from 'lucide-react';
import { useModelData } from '@/hooks/useModelData';
import { motion } from 'framer-motion';

export function ModelInfo() {
  const { modelData, loading } = useModelData();

  if (loading || !modelData) {
    return null;
  }

  const { metadata } = modelData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="glass-morphic border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI Model Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Model</p>
              </div>
              <p className="text-sm font-medium">{metadata.model}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Engine</p>
              </div>
              <p className="text-sm font-medium">{metadata.engine}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Created</p>
              </div>
              <p className="text-sm font-medium">
                {new Date(metadata.created).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Version</p>
              <Badge variant="secondary">{metadata.version}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
