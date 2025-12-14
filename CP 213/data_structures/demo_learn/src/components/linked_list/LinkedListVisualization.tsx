import React, { useMemo } from 'react';
import { ListNode, ExecutionState } from '../../structures/linear/linked_list/types';
import { FiAlertTriangle } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';

interface Props {
  state: ExecutionState;
  allNodes: Map<string, ListNode>;
  pointerColors: Map<string, string>;
}

const NODE_WIDTH = 120;
const NODE_HEIGHT = 60;
const INFO_WIDTH = 60;
const LINK_WIDTH = 60;
const VERTICAL_SPACING = 100;
const HORIZONTAL_SPACING = 150;

const LinkedListVisualization: React.FC<Props> = ({ state, allNodes, pointerColors }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Calculate node positions
  const nodePositions = useMemo(() => {
    const positions = new Map<string, { x: number; y: number }>();
    let current = state.head;
    let x = 100;
    const y = 150;
    const visited = new Set<string>();

    while (current && !visited.has(current.id)) {
      visited.add(current.id);
      const actualNode = allNodes.get(current.id);
      if (actualNode) {
        positions.set(actualNode.id, { x, y });
        x += HORIZONTAL_SPACING;
        current = actualNode.link;
      } else {
        break;
      }
    }

    // Add lost nodes below
    let lostY = y + VERTICAL_SPACING + 50;
    let lostX = 100;
    for (const [id] of allNodes) {
      if (state.lostNodes.has(id) && !positions.has(id)) {
        positions.set(id, { x: lostX, y: lostY });
        lostX += HORIZONTAL_SPACING;
      }
    }

    return positions;
  }, [state.head, state.lostNodes, allNodes]);

  // Get all nodes in order (using actual nodes from allNodes)
  const orderedNodes = useMemo(() => {
    const nodes: ListNode[] = [];
    const visited = new Set<string>();
    let current = state.head;

    while (current && !visited.has(current.id)) {
      visited.add(current.id);
      const actualNode = allNodes.get(current.id);
      if (actualNode) {
        nodes.push(actualNode);
        current = actualNode.link;
      } else {
        break;
      }
    }

    return nodes;
  }, [state.head, allNodes]);

  // Get lost nodes
  const lostNodes = useMemo(() => {
    return Array.from(allNodes.values()).filter(node => state.lostNodes.has(node.id));
  }, [allNodes, state.lostNodes]);

  const getNodeColor = (node: ListNode): string => {
    if (isDark) {
      if (node.isLost) return '#444';
      if (node.isCurrent) return '#4a7cff';
      if (node.isHighlighted) return '#00cc88';
      return '#2d4a7a';
    } else {
      if (node.isLost) return '#888';
      if (node.isCurrent) return '#ffd700';
      if (node.isHighlighted) return '#90EE90';
      return '#4A90E2';
    }
  };

  const getNodeStroke = (node: ListNode): string => {
    if (isDark) {
      if (node.isLost) return '#222';
      if (node.isCurrent) return '#6a9cff';
      return '#4a6a9a';
    } else {
      if (node.isLost) return '#555';
      if (node.isCurrent) return '#FF8C00';
      return '#2E5C8A';
    }
  };

  const renderNode = (node: ListNode, pos: { x: number; y: number }) => {
    const nodeColor = getNodeColor(node);
    const strokeColor = getNodeStroke(node);
    const opacity = node.isLost ? 0.5 : 1;

    return (
      <g key={node.id} opacity={opacity}>
        {/* Node rectangle */}
        <rect
          x={pos.x}
          y={pos.y}
          width={NODE_WIDTH}
          height={NODE_HEIGHT}
          fill={nodeColor}
          stroke={strokeColor}
          strokeWidth={2}
          rx={4}
        />
        {/* Vertical divider */}
        <line
          x1={pos.x + INFO_WIDTH}
          y1={pos.y}
          x2={pos.x + INFO_WIDTH}
          y2={pos.y + NODE_HEIGHT}
          stroke="#000"
          strokeWidth={2}
        />
        {/* Info field */}
        <rect
          x={pos.x}
          y={pos.y}
          width={INFO_WIDTH}
          height={NODE_HEIGHT}
          fill="none"
          stroke="none"
        />
        <text
          x={pos.x + INFO_WIDTH / 2}
          y={pos.y + NODE_HEIGHT / 2 + 5}
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill={isDark ? "#e0e0e0" : "#000"}
        >
          {node.info !== null ? node.info : 'NULL'}
        </text>
        <text
          x={pos.x + INFO_WIDTH / 2}
          y={pos.y - 5}
          textAnchor="middle"
          fontSize="10"
          fill={isDark ? "#aaa" : "#666"}
        >
          info
        </text>
        {/* Link field */}
        <rect
          x={pos.x + INFO_WIDTH}
          y={pos.y}
          width={LINK_WIDTH}
          height={NODE_HEIGHT}
          fill="none"
          stroke="none"
        />
        <text
          x={pos.x + INFO_WIDTH + LINK_WIDTH / 2}
          y={pos.y - 5}
          textAnchor="middle"
          fontSize="10"
          fill={isDark ? "#aaa" : "#666"}
        >
          link
        </text>
        {/* Link value display */}
        {node.link ? (
          <text
            x={pos.x + INFO_WIDTH + LINK_WIDTH / 2}
            y={pos.y + NODE_HEIGHT / 2 + 5}
            textAnchor="middle"
            fontSize="10"
            fill={isDark ? "#e0e0e0" : "#000"}
          >
            →
          </text>
        ) : (
          <text
            x={pos.x + INFO_WIDTH + LINK_WIDTH / 2}
            y={pos.y + NODE_HEIGHT / 2 + 5}
            textAnchor="middle"
            fontSize="12"
            fill="#FF6B6B"
            fontWeight="bold"
          >
            NULL
          </text>
        )}
        {/* Node ID label (for debugging) */}
        <text
          x={pos.x + NODE_WIDTH / 2}
          y={pos.y + NODE_HEIGHT + 15}
          textAnchor="middle"
          fontSize="9"
          fill={isDark ? "#666" : "#666"}
        >
          {node.id}
        </text>
      </g>
    );
  };

  const renderArrow = (
    from: { x: number; y: number },
    to: { x: number; y: number },
    isLoop: boolean = false
  ) => {
    const startX = from.x + NODE_WIDTH;
    const startY = from.y + NODE_HEIGHT / 2;
    const endX = to.x;
    const endY = to.y + NODE_HEIGHT / 2;

    if (isLoop) {
      // Curved arrow for loops
      const midX = (startX + endX) / 2;
      const midY = Math.min(startY, endY) - 40;
      const path = `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;
      return (
        <g key={`arrow-${from.x}-${from.y}`}>
          <path
            d={path}
            fill="none"
            stroke="#FF0000"
            strokeWidth={2}
            markerEnd="url(#arrowhead-red)"
          />
        </g>
      );
    }

    // Straight arrow
    const dx = endX - startX;
    const dy = endY - startY;
    const arrowLength = 10;

    const angle = Math.atan2(dy, dx);
    const arrowX = endX - arrowLength * Math.cos(angle);
    const arrowY = endY - arrowLength * Math.sin(angle);

    return (
      <g key={`arrow-${from.x}-${from.y}`}>
        <line
          x1={startX}
          y1={startY}
          x2={arrowX}
          y2={arrowY}
          stroke={isDark ? "#e0e0e0" : "#000"}
          strokeWidth={2}
          markerEnd="url(#arrowhead)"
        />
      </g>
    );
  };

  const renderPointer = (name: string, node: ListNode | null, color: string) => {
    if (!node) return null;

    const pos = nodePositions.get(node.id);
    if (!pos) return null;

    const pointerX = pos.x - 30;
    const pointerY = pos.y + NODE_HEIGHT / 2;

    return (
      <g key={`pointer-${name}`}>
        <line
          x1={pointerX}
          y1={pointerY}
          x2={pos.x}
          y2={pointerY}
          stroke={color}
          strokeWidth={2}
          strokeDasharray="5,5"
        />
        <circle
          cx={pointerX}
          cy={pointerY}
          r={4}
          fill={color}
        />
        <text
          x={pointerX - 10}
          y={pointerY - 10}
          fontSize="12"
          fontWeight="bold"
          fill={color}
        >
          {name}
        </text>
      </g>
    );
  };

  const renderHeadPointer = () => {
    if (!state.head) return null;

    const pos = nodePositions.get(state.head.id);
    if (!pos) return null;

    const headX = pos.x - 30;
    const headY = pos.y - 30;

    return (
      <g>
        <line
          x1={headX}
          y1={headY}
          x2={pos.x}
          y2={pos.y}
          stroke="#FF6B6B"
          strokeWidth={3}
          markerEnd="url(#arrowhead-red)"
        />
        <circle
          cx={headX}
          cy={headY}
          r={6}
          fill="#FF6B6B"
        />
        <text
          x={headX - 10}
          y={headY - 10}
          fontSize="14"
          fontWeight="bold"
          fill="#FF6B6B"
        >
          head
        </text>
      </g>
    );
  };

  // Render arrows between nodes
  const renderArrows = () => {
    const arrows: JSX.Element[] = [];
    const visited = new Set<string>();
    let current = state.head;

    while (current && !visited.has(current.id)) {
      visited.add(current.id);
      const actualNode = allNodes.get(current.id);
      if (!actualNode) break;
      
      const fromPos = nodePositions.get(actualNode.id);
      
      if (actualNode.link && fromPos) {
        const toPos = nodePositions.get(actualNode.link.id);
        if (toPos) {
          // Check if this creates a loop
          const isLoop = visited.has(actualNode.link.id);
          arrows.push(renderArrow(fromPos, toPos, isLoop));
        }
      }
      current = actualNode.link;
    }

    return arrows;
  };

  const containerBg = isDark ? 'rgba(20, 20, 25, 0.6)' : '#f5f5f5';
  const svgBg = isDark ? '#1a1a1f' : 'white';
  const borderColor = isDark ? '#333' : '#ddd';

  return (
    <div style={{ 
      padding: '20px', 
      background: containerBg, 
      borderRadius: '12px', 
      margin: '20px 0',
      border: `1px solid ${borderColor}`
    }}>
      <svg
        width="100%"
        height={lostNodes.length > 0 ? 400 : 300}
        style={{ 
          border: `1px solid ${borderColor}`, 
          background: svgBg, 
          borderRadius: '8px' 
        }}
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
            <polygon points="0 0, 10 3, 0 6" fill={isDark ? "#e0e0e0" : "#000"} />
          </marker>
          <marker
            id="arrowhead-red"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#FF0000" />
          </marker>
        </defs>

        {/* Render arrows first (so they appear behind nodes) */}
        {renderArrows()}

        {/* Render nodes */}
        {orderedNodes.map(node => {
          const pos = nodePositions.get(node.id);
          return pos ? renderNode(node, pos) : null;
        })}

        {/* Render lost nodes */}
        {lostNodes.map(node => {
          const pos = nodePositions.get(node.id);
          if (!pos) return null;
          return (
            <g key={`lost-${node.id}`}>
              {renderNode(node, pos)}
              <text
                x={pos.x + NODE_WIDTH / 2}
                y={pos.y - 20}
                textAnchor="middle"
                fontSize="12"
                fill="#FF6B6B"
                fontWeight="bold"
              >
                Lost / Unreachable
              </text>
            </g>
          );
        })}

        {/* Render head pointer */}
        {renderHeadPointer()}

        {/* Render other pointers */}
        {Array.from(state.pointers.entries()).map(([name, node]) => {
          const color = pointerColors.get(name) || '#9B59B6';
          return renderPointer(name, node, color);
        })}

        {/* NULL indicator */}
        {!state.head && (
          <g>
            <text
              x={100}
              y={150}
              fontSize="16"
              fill={isDark ? "#FF6B6B" : "#FF0000"}
              fontWeight="bold"
            >
              NULL (Empty List)
            </text>
          </g>
        )}

        {/* Loop warning */}
        {state.hasLoop && (
          <foreignObject x={50} y={20} width={350} height={40}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: isDark ? 'rgba(255, 100, 100, 0.2)' : '#FFE5E5',
              padding: '8px 12px',
              borderRadius: '4px',
              border: `2px solid ${isDark ? '#FF6B6B' : '#FF0000'}`
            }}>
              <FiAlertTriangle size={20} color={isDark ? "#FF6B6B" : "#FF0000"} />
              <span style={{
                fontSize: '14px',
                color: isDark ? '#FF6B6B' : '#FF0000',
                fontWeight: 'bold'
              }}>
                LOOP DETECTED - Infinite traversal possible!
              </span>
            </div>
          </foreignObject>
        )}
      </svg>
    </div>
  );
};

export default LinkedListVisualization;

