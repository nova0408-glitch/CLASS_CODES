import React, { useEffect, useState } from 'react';
import { GraphNode, GraphEdge } from '../types';

interface Props {
  nodes: Map<string, GraphNode>;
  edges: GraphEdge[];
  highlightedNodeId?: string;
  visitedNodeIds?: Set<string>;
  currentNodeId?: string;
  traversedEdges?: Set<string>;
}

const NODE_RADIUS = 30;

const GraphVisualization: React.FC<Props> = ({ 
  nodes, 
  edges,
  highlightedNodeId,
  visitedNodeIds = new Set(),
  currentNodeId,
  traversedEdges = new Set()
}) => {
  const [animatingNodeId, setAnimatingNodeId] = useState<string | null>(null);

  useEffect(() => {
    if (highlightedNodeId) {
      setAnimatingNodeId(highlightedNodeId);
      const timer = setTimeout(() => setAnimatingNodeId(null), 800);
      return () => clearTimeout(timer);
    }
  }, [highlightedNodeId]);

  const renderEdge = (edge: GraphEdge) => {
    const fromNode = nodes.get(edge.from);
    const toNode = nodes.get(edge.to);
    if (!fromNode || !toNode) return null;

    const edgeKey = `${edge.from}-${edge.to}`;
    const isTraversed = traversedEdges.has(edgeKey) || traversedEdges.has(`${edge.to}-${edge.from}`);
    const isHighlighted = edge.isHighlighted || isTraversed;

    return (
      <line
        key={edgeKey}
        x1={fromNode.x}
        y1={fromNode.y}
        x2={toNode.x}
        y2={toNode.y}
        stroke={isHighlighted ? '#4CAF50' : '#999'}
        strokeWidth={isHighlighted ? 3 : 2}
        opacity={isHighlighted ? 1 : 0.6}
        style={{
          transition: 'all 0.3s ease',
          animation: isTraversed ? 'pulse 0.8s ease-in-out' : undefined
        }}
      />
    );
  };

  const renderNode = (node: GraphNode) => {
    const isHighlighted = animatingNodeId === node.id || highlightedNodeId === node.id;
    const isVisited = visitedNodeIds.has(node.id);
    const isCurrent = currentNodeId === node.id;

    const nodeColor = isCurrent 
      ? '#FFD700' 
      : isHighlighted 
      ? '#4CAF50' 
      : isVisited 
      ? '#90EE90' 
      : '#4A90E2';

    const strokeColor = isCurrent 
      ? '#FF8C00' 
      : isHighlighted 
      ? '#2E7D32' 
      : '#2E5C8A';

    return (
      <g key={node.id}>
        <circle
          cx={node.x}
          cy={node.y}
          r={NODE_RADIUS}
          fill={nodeColor}
          stroke={strokeColor}
          strokeWidth={isCurrent ? 3 : 2}
          style={{
            transition: 'all 0.3s ease',
            animation: isHighlighted ? 'pulse 0.8s ease-in-out' : undefined,
            cursor: 'pointer'
          }}
        />
        <text
          x={node.x}
          y={node.y + 5}
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="#000"
        >
          {node.value}
        </text>
        {isCurrent && (
          <text
            x={node.x}
            y={node.y - NODE_RADIUS - 10}
            textAnchor="middle"
            fontSize="11px"
            fill="#FF8C00"
            fontWeight="bold"
          >
            Current
          </text>
        )}
      </g>
    );
  };

  const nodeArray = Array.from(nodes.values());
  if (nodeArray.length === 0) {
    return (
      <div style={{
        padding: '20px',
        background: '#f5f5f5',
        borderRadius: '8px',
        margin: '20px 0',
        textAlign: 'center',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: '#666', fontSize: '18px' }}>
          Graph is empty. Create a graph to visualize.
        </div>
      </div>
    );
  }

  const svgWidth = 1000;
  const svgHeight = 600;

  return (
    <div style={{
      padding: '20px',
      background: '#f5f5f5',
      borderRadius: '8px',
      margin: '20px 0'
    }}>
      <svg
        width="100%"
        height={svgHeight}
        style={{ border: '1px solid #ddd', background: 'white', borderRadius: '4px' }}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      >
        {/* Render edges first (behind nodes) */}
        {edges.map(renderEdge)}

        {/* Render nodes */}
        {nodeArray.map(renderNode)}
      </svg>
    </div>
  );
};

export default GraphVisualization;

