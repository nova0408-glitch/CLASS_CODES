import React, { useMemo, useEffect, useState } from 'react';
import { TreeNode } from '../types';
import { calculateTreeLayout } from '../utils/treeUtils';

interface Props {
  root: TreeNode | null;
  highlightedNodeId?: string;
  visitedNodeIds?: Set<string>;
  currentNodeId?: string;
}

const NODE_RADIUS = 25;
const LEVEL_HEIGHT = 100;

const BinaryTreeVisualization: React.FC<Props> = ({ 
  root, 
  highlightedNodeId,
  visitedNodeIds = new Set(),
  currentNodeId
}) => {
  const [animatingNodeId, setAnimatingNodeId] = useState<string | null>(null);

  useEffect(() => {
    if (highlightedNodeId) {
      setAnimatingNodeId(highlightedNodeId);
      const timer = setTimeout(() => setAnimatingNodeId(null), 800);
      return () => clearTimeout(timer);
    }
  }, [highlightedNodeId]);

  const positions = useMemo(() => {
    return calculateTreeLayout(root, 800, 50);
  }, [root]);

  const renderNode = (node: TreeNode, pos: { x: number; y: number }) => {
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
          cx={pos.x}
          cy={pos.y}
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
          x={pos.x}
          y={pos.y + 5}
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#000"
        >
          {node.value}
        </text>
        {isCurrent && (
          <text
            x={pos.x}
            y={pos.y - NODE_RADIUS - 10}
            textAnchor="middle"
            fontSize="10"
            fill="#FF8C00"
            fontWeight="bold"
          >
            Current
          </text>
        )}
      </g>
    );
  };

  const renderEdge = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    return (
      <line
        x1={from.x}
        y1={from.y + NODE_RADIUS}
        x2={to.x}
        y2={to.y - NODE_RADIUS}
        stroke="#333"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
    );
  };

  const renderTree = (node: TreeNode | null, parentPos?: { x: number; y: number }): JSX.Element[] => {
    if (!node) return [];

    const pos = positions.get(node.id);
    if (!pos) return [];

    const elements: JSX.Element[] = [];

    // Render edge from parent
    if (parentPos) {
      elements.push(
        <line
          key={`edge-${node.id}`}
          x1={parentPos.x}
          y1={parentPos.y + NODE_RADIUS}
          x2={pos.x}
          y2={pos.y - NODE_RADIUS}
          stroke="#333"
          strokeWidth="2"
        />
      );
    }

    // Render children first (so edges appear behind nodes)
    if (node.left) {
      elements.push(...renderTree(node.left, pos));
    }
    if (node.right) {
      elements.push(...renderTree(node.right, pos));
    }

    // Render this node
    elements.push(renderNode(node, pos));

    return elements;
  };

  if (!root) {
    return (
      <div style={{
        padding: '20px',
        background: '#f5f5f5',
        borderRadius: '8px',
        margin: '20px 0',
        textAlign: 'center',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: '#666', fontSize: '18px' }}>
          Tree is empty. Create a tree to visualize.
        </div>
      </div>
    );
  }

  const rootPos = positions.get(root.id);
  if (!rootPos) return null;

  const svgWidth = 1000;
  const svgHeight = 500;

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
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#333" />
          </marker>
        </defs>

        {renderTree(root)}
      </svg>
    </div>
  );
};

export default BinaryTreeVisualization;

