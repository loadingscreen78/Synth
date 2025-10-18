import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Device } from '@/services/deviceService';
import { Network, Server, Database, HardDrive, Wifi, Cpu } from 'lucide-react';

interface NetworkTopologyProps {
  devices: Device[];
}

interface Node {
  id: string;
  x: number;
  y: number;
  device: Device;
}

interface Connection {
  from: string;
  to: string;
}

export function NetworkTopology({ devices }: NetworkTopologyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    // Position nodes in a circular layout
    const centerX = 400;
    const centerY = 300;
    const radius = 200;
    
    const newNodes: Node[] = devices.map((device, index) => {
      const angle = (index / devices.length) * 2 * Math.PI;
      return {
        id: device.id,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        device,
      };
    });
    
    setNodes(newNodes);
  }, [devices]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    
    devices.forEach(device => {
      const fromNode = nodes.find(n => n.id === device.id);
      if (!fromNode) return;

      device.connectedTo.forEach(toId => {
        const toNode = nodes.find(n => n.id === toId);
        if (!toNode) return;

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();

        // Draw arrow
        const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
        const arrowSize = 10;
        ctx.beginPath();
        ctx.moveTo(toNode.x, toNode.y);
        ctx.lineTo(
          toNode.x - arrowSize * Math.cos(angle - Math.PI / 6),
          toNode.y - arrowSize * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          toNode.x - arrowSize * Math.cos(angle + Math.PI / 6),
          toNode.y - arrowSize * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fillStyle = '#3b82f6';
        ctx.fill();
      });
    });

    // Draw nodes
    nodes.forEach(node => {
      const isHovered = hoveredNode === node.id;
      const nodeRadius = isHovered ? 35 : 30;

      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
      
      // Color based on status
      if (node.device.status === 'online') {
        ctx.fillStyle = isHovered ? '#10b981' : '#059669';
      } else if (node.device.status === 'warning') {
        ctx.fillStyle = isHovered ? '#f59e0b' : '#d97706';
      } else {
        ctx.fillStyle = isHovered ? '#ef4444' : '#dc2626';
      }
      
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Node label
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Draw device type icon (simplified)
      const iconMap: Record<string, string> = {
        server: 'S',
        database: 'D',
        storage: 'ST',
        network: 'N',
        iot: 'I',
      };
      ctx.fillText(iconMap[node.device.type] || '?', node.x, node.y);
    });
  }, [nodes, devices, hoveredNode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if mouse is over any node
    const hoveredNode = nodes.find(node => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return distance < 30;
    });

    setHoveredNode(hoveredNode?.id || null);
  };

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

  const hoveredDevice = hoveredNode ? devices.find(d => d.id === hoveredNode) : null;

  return (
    <Card className="glass-morphic border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="w-5 h-5 text-primary" />
          Network Topology Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="w-full border border-border/50 rounded-lg bg-black/20"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredNode(null)}
          />
          
          {hoveredDevice && (
            <div className="absolute top-4 right-4 bg-card border border-border p-4 rounded-lg shadow-lg max-w-xs">
              <div className="flex items-center gap-2 mb-2">
                {getDeviceIcon(hoveredDevice.type)}
                <h4 className="font-semibold">{hoveredDevice.name}</h4>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium">IP:</span> {hoveredDevice.ipAddress}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Location:</span> {hoveredDevice.location}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Status:</span>{' '}
                  <span className={`font-semibold ${
                    hoveredDevice.status === 'online' ? 'text-green-500' :
                    hoveredDevice.status === 'warning' ? 'text-yellow-500' :
                    'text-red-500'
                  }`}>
                    {hoveredDevice.status.toUpperCase()}
                  </span>
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Emissions:</span> {hoveredDevice.carbonEmission} gCO₂
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">CPU:</span> {hoveredDevice.cpuUsage}%
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-600"></div>
            <span>Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-600"></div>
            <span>Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-600"></div>
            <span>Offline</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-muted-foreground">Total Connections:</span>
            <span className="font-semibold">
              {devices.reduce((sum, d) => sum + d.connectedTo.length, 0)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
