import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useFont } from '../../contexts/FontContext';
import { FiPlay, FiPause, FiRotateCcw } from 'react-icons/fi';
import { ListNode } from '../../structures/linear/linked_list/types';

interface Props {
  listNodes: Map<string, ListNode>;
  currentHead: ListNode | null;
  onUpdateList: (nodes: Map<string, ListNode>, head: ListNode | null) => void;
}

type SortAlgorithm = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick';
type SortStep = {
  description: string;
  code?: string;
  nodes: Map<string, ListNode>;
  head: ListNode | null;
  highlighted?: string[];
  comparisons?: number;
  swaps?: number;
};

const LinkedListSorting: React.FC<Props> = ({ listNodes, currentHead, onUpdateList }) => {
  const { theme } = useTheme();
  const { uiFont, codeFont } = useFont();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortAlgorithm>('bubble');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<SortStep[]>([]);

  const isDark = theme === 'dark';
  const bgColor = isDark 
    ? 'rgba(20, 20, 30, 0.7)' 
    : 'rgba(255, 255, 255, 0.25)';
  const textColor = isDark ? '#e0e0e0' : '#333';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)';
  const accentColor = isDark ? '#4a9eff' : '#2196F3';

  const algorithms = [
    { id: 'bubble', name: 'Bubble Sort', time: 'O(n²)', space: 'O(1)' },
    { id: 'selection', name: 'Selection Sort', time: 'O(n²)', space: 'O(1)' },
    { id: 'insertion', name: 'Insertion Sort', time: 'O(n²)', space: 'O(1)' },
    { id: 'merge', name: 'Merge Sort', time: 'O(n log n)', space: 'O(n)' },
    { id: 'quick', name: 'Quick Sort', time: 'O(n log n)', space: 'O(log n)' },
  ] as const;

  const cloneNodes = (nodes: Map<string, ListNode>): Map<string, ListNode> => {
    const cloned = new Map<string, ListNode>();
    for (const [id, node] of nodes) {
      cloned.set(id, { ...node });
    }
    // Re-link cloned nodes
    for (const [id, node] of nodes) {
      if (node.link) {
        cloned.get(id)!.link = cloned.get(node.link.id)!;
      }
    }
    return cloned;
  };

  const getListValues = (head: ListNode | null): number[] => {
    const values: number[] = [];
    const visited = new Set<string>();
    let current = head;
    while (current && !visited.has(current.id)) {
      visited.add(current.id);
      if (current.info !== null) values.push(current.info);
      current = current.link;
    }
    return values;
  };

  const bubbleSort = (head: ListNode | null, nodes: Map<string, ListNode>): SortStep[] => {
    const steps: SortStep[] = [];
    let stepNodes = cloneNodes(nodes);
    let stepHead = head;
    let comparisons = 0;
    let swaps = 0;

    const values = getListValues(stepHead);
    const n = values.length;

    steps.push({
      description: 'Starting Bubble Sort: Compare adjacent elements and swap if needed',
      nodes: cloneNodes(stepNodes),
      head: stepHead,
      comparisons,
      swaps
    });

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      let current = stepHead;
      let prev: ListNode | null = null;

      for (let j = 0; j < n - i - 1 && current; j++) {
        comparisons++;
        const next = current.link;
        if (!next) break;

        if (current.info !== null && next.info !== null && current.info > next.info) {
          swaps++;
          swapped = true;

          if (prev) {
            prev.link = next;
          } else {
            stepHead = next;
          }
          current.link = next.link;
          next.link = current;

          steps.push({
            description: `Swapped ${current.info} and ${next.info}`,
            code: `if (current->data > current->next->data) {
    swap(current, current->next);
}`,
            nodes: cloneNodes(stepNodes),
            head: stepHead,
            highlighted: [current.id, next.id],
            comparisons,
            swaps
          });

          // After swap, current and next positions are swapped
          // Continue with the node that is now in current's position
          prev = current;
          // current already points to the correct next node after swap
        } else {
          prev = current;
        }

        current = current.link;
      }

      if (!swapped) break;
    }

    steps.push({
      description: 'Bubble Sort complete!',
      nodes: cloneNodes(stepNodes),
      head: stepHead,
      comparisons,
      swaps
    });

    return steps;
  };

  const generateSteps = () => {
    if (listNodes.size === 0 || !currentHead) {
      return;
    }

    let generatedSteps: SortStep[] = [];
    
    switch (selectedAlgorithm) {
      case 'bubble':
        generatedSteps = bubbleSort(currentHead, listNodes);
        break;
      default:
        generatedSteps = [{
          description: `${algorithms.find(a => a.id === selectedAlgorithm)?.name} will be implemented`,
          nodes: listNodes,
          head: currentHead
        }];
    }

    setSteps(generatedSteps);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (steps.length > 0 && isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        onUpdateList(steps[currentStep + 1].nodes, steps[currentStep + 1].head);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
  }, [currentStep, isPlaying, steps]);

  const handlePlayPause = () => {
    if (steps.length === 0) {
      generateSteps();
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setSteps([]);
    onUpdateList(listNodes, currentHead);
  };

  const renderTimeComplexityChart = () => {
    const chartWidth = 400;
    const chartHeight = 250;
    const padding = 40;
    const maxN = 20;
    const maxY = 400;

    const getY = (n: number, complexity: string) => {
      if (complexity === 'O(1)') return chartHeight - padding;
      if (complexity === 'O(n)') return chartHeight - padding - (n / maxN) * (chartHeight - 2 * padding);
      if (complexity === 'O(n log n)') {
        const nlogn = n * Math.log2(n || 1);
        const maxNlogn = maxN * Math.log2(maxN);
        return chartHeight - padding - (nlogn / maxNlogn) * (chartHeight - 2 * padding);
      }
      if (complexity === 'O(n²)') {
        const n2 = n * n;
        const maxN2 = maxN * maxN;
        return chartHeight - padding - (n2 / maxN2) * (chartHeight - 2 * padding);
      }
      return chartHeight - padding;
    };

    const selectedAlg = algorithms.find(a => a.id === selectedAlgorithm);
    const complexity = selectedAlg?.time || 'O(n²)';

    const points: { x: number; y: number }[] = [];
    for (let n = 1; n <= maxN; n++) {
      points.push({
        x: padding + ((n - 1) / (maxN - 1)) * (chartWidth - 2 * padding),
        y: getY(n, complexity)
      });
    }

    const comparisonPoints: { [key: string]: { x: number; y: number }[] } = {};
    ['O(n)', 'O(n log n)', 'O(n²)'].forEach(comp => {
      comparisonPoints[comp] = [];
      for (let n = 1; n <= maxN; n++) {
        comparisonPoints[comp].push({
          x: padding + ((n - 1) / (maxN - 1)) * (chartWidth - 2 * padding),
          y: getY(n, comp)
        });
      }
    });

    return (
      <div style={{
        background: isDark ? 'rgba(30, 30, 40, 0.6)' : 'rgba(240, 240, 240, 0.4)',
        padding: '15px',
        borderRadius: '12px',
        marginBottom: '20px'
      }}>
        <div style={{ color: textColor, fontWeight: '600', marginBottom: '12px', fontFamily: uiFont }}>
          Time Complexity Comparison
        </div>
        <svg width={chartWidth} height={chartHeight} style={{ display: 'block' }}>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <line
            x1={padding}
            y1={chartHeight - padding}
            x2={chartWidth - padding}
            y2={chartHeight - padding}
            stroke={isDark ? '#666' : '#999'}
            strokeWidth="2"
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={chartHeight - padding}
            stroke={isDark ? '#666' : '#999'}
            strokeWidth="2"
          />

          {['O(n)', 'O(n log n)', 'O(n²)'].map((comp, idx) => {
            const color = comp === complexity 
              ? accentColor 
              : (isDark ? '#444' : '#ccc');
            const width = comp === complexity ? 3 : 1.5;
            const opacity = comp === complexity ? 1 : 0.4;
            const points = comparisonPoints[comp];
            
            return (
              <g key={comp} opacity={opacity}>
                <polyline
                  points={points.map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke={color}
                  strokeWidth={width}
                />
                {comp === complexity && (
                  <polygon
                    points={`${points.map(p => `${p.x},${p.y}`).join(' ')},${points[points.length - 1].x},${chartHeight - padding},${points[0].x},${chartHeight - padding}`}
                    fill="url(#grad1)"
                  />
                )}
              </g>
            );
          })}

          <text
            x={chartWidth / 2}
            y={chartHeight - 5}
            textAnchor="middle"
            fill={textColor}
            fontSize="12"
            fontFamily={uiFont}
          >
            n (input size)
          </text>
          <text
            x={15}
            y={chartHeight / 2}
            textAnchor="middle"
            fill={textColor}
            fontSize="12"
            fontFamily={uiFont}
            transform={`rotate(-90, 15, ${chartHeight / 2})`}
          >
            Operations
          </text>

          {['O(n)', 'O(n log n)', 'O(n²)'].map((comp, idx) => {
            const color = comp === complexity 
              ? accentColor 
              : (isDark ? '#666' : '#999');
            const points = comparisonPoints[comp];
            const lastPoint = points[points.length - 1];
            return (
              <g key={`label-${comp}`} opacity={comp === complexity ? 1 : 0.5}>
                <text
                  x={lastPoint.x + 5}
                  y={lastPoint.y - 5}
                  fill={color}
                  fontSize="11"
                  fontFamily={codeFont}
                  fontWeight={comp === complexity ? 'bold' : 'normal'}
                >
                  {comp}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  const renderLinkedListVisualization = () => {
    const step = steps[currentStep];
    const nodesToShow = step ? step.nodes : listNodes;
    const headToShow = step ? step.head : currentHead;
    
    const nodeArray: ListNode[] = [];
    const visited = new Set<string>();
    let current = headToShow;
    
    while (current && !visited.has(current.id)) {
      visited.add(current.id);
      const node = nodesToShow.get(current.id);
      if (node) {
        nodeArray.push(node);
        current = node.link;
      } else {
        break;
      }
    }

    if (nodeArray.length === 0) {
      return (
        <div style={{
          background: isDark ? 'rgba(30, 30, 40, 0.6)' : 'rgba(240, 240, 240, 0.4)',
          padding: '15px',
          borderRadius: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ color: textColor, fontWeight: '600', marginBottom: '12px', fontFamily: uiFont }}>
            Linked List State
          </div>
          <div style={{ 
            color: isDark ? '#888' : '#666', 
            fontSize: '13px', 
            fontFamily: uiFont,
            textAlign: 'center',
            padding: '40px'
          }}>
            No nodes to display. Create a linked list first.
          </div>
        </div>
      );
    }

    const nodeWidth = 80;
    const nodeHeight = 50;
    const spacing = 100;
    const svgWidth = Math.max(400, nodeArray.length * spacing + 100);
    const svgHeight = 150;

    return (
      <div style={{
        background: isDark ? 'rgba(30, 30, 40, 0.6)' : 'rgba(240, 240, 240, 0.4)',
        padding: '15px',
        borderRadius: '12px',
        marginBottom: '20px'
      }}>
        <div style={{ color: textColor, fontWeight: '600', marginBottom: '12px', fontFamily: uiFont }}>
          Linked List State
        </div>
        <svg width={svgWidth} height={svgHeight} style={{ display: 'block' }}>
          {nodeArray.map((node, idx) => {
            const x = 50 + idx * spacing;
            const y = 50;
            const isHighlighted = step?.highlighted?.includes(node.id);
            
            return (
              <g key={node.id}>
                {idx < nodeArray.length - 1 && (
                  <line
                    x1={x + nodeWidth}
                    y1={y + nodeHeight / 2}
                    x2={x + spacing}
                    y2={y + nodeHeight / 2}
                    stroke={isDark ? '#666' : '#999'}
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                )}
                <rect
                  x={x}
                  y={y}
                  width={nodeWidth}
                  height={nodeHeight}
                  fill={isHighlighted 
                    ? (isDark ? 'rgba(74, 158, 255, 0.4)' : 'rgba(33, 150, 243, 0.3)')
                    : (isDark ? 'rgba(40, 40, 50, 0.8)' : 'rgba(255, 255, 255, 0.8)')}
                  stroke={isHighlighted ? accentColor : (isDark ? '#666' : '#999')}
                  strokeWidth={isHighlighted ? 3 : 2}
                  rx="4"
                />
                <line
                  x1={x + nodeWidth / 2}
                  y1={y}
                  x2={x + nodeWidth / 2}
                  y2={y + nodeHeight}
                  stroke={isDark ? '#666' : '#999'}
                  strokeWidth="1"
                />
                <text
                  x={x + nodeWidth / 4}
                  y={y + nodeHeight / 2 + 5}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="bold"
                  fill={textColor}
                  fontFamily={codeFont}
                >
                  {node.info !== null ? node.info : 'NULL'}
                </text>
                <text
                  x={x + nodeWidth * 0.75}
                  y={y + nodeHeight / 2 + 5}
                  textAnchor="middle"
                  fontSize="10"
                  fill={isDark ? '#aaa' : '#666'}
                  fontFamily={codeFont}
                >
                  →
                </text>
              </g>
            );
          })}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3, 0 6"
                fill={isDark ? '#666' : '#999'}
              />
            </marker>
          </defs>
          {step.head && nodeArray.length > 0 && (
            <g>
              <text
                x={30}
                y={50 + nodeHeight / 2 + 5}
                fontSize="12"
                fill={accentColor}
                fontWeight="bold"
                fontFamily={uiFont}
              >
                head
              </text>
              <line
                x1={30}
                y1={50 + nodeHeight / 2}
                x2={50}
                y2={50 + nodeHeight / 2}
                stroke={accentColor}
                strokeWidth="2"
                markerEnd="url(#arrowhead-blue)"
              />
            </g>
          )}
          <defs>
            <marker
              id="arrowhead-blue"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3, 0 6"
                fill={accentColor}
              />
            </marker>
          </defs>
        </svg>
      </div>
    );
  };

  return (
    <div style={{
      background: bgColor,
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      padding: '25px',
      borderRadius: '16px',
      border: `1px solid ${borderColor}`,
      marginBottom: '20px',
      boxShadow: isDark ? '0 8px 32px 0 rgba(0, 0, 0, 0.3)' : '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{
        color: textColor,
        fontSize: '20px',
        fontWeight: '700',
        marginBottom: '20px',
        fontFamily: uiFont
      }}>
        🔄 Sorting Algorithms
      </h3>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ color: textColor, marginBottom: '10px', display: 'block', fontFamily: uiFont }}>
          Select Algorithm:
        </label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {algorithms.map((alg) => (
            <button
              key={alg.id}
              onClick={() => {
                setSelectedAlgorithm(alg.id as SortAlgorithm);
                handleReset();
              }}
              style={{
                padding: '10px 16px',
                background: selectedAlgorithm === alg.id 
                  ? (isDark ? 'rgba(74, 158, 255, 0.3)' : 'rgba(33, 150, 243, 0.2)')
                  : (isDark ? 'rgba(40, 40, 50, 0.6)' : 'rgba(240, 240, 240, 0.4)'),
                border: `1px solid ${selectedAlgorithm === alg.id ? accentColor : borderColor}`,
                borderRadius: '8px',
                color: textColor,
                cursor: 'pointer',
                fontFamily: uiFont,
                fontSize: '13px',
                transition: 'all 0.2s'
              }}
            >
              {alg.name}
              <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '2px', fontFamily: codeFont }}>
                {alg.time}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={{
        background: isDark ? 'rgba(30, 30, 40, 0.6)' : 'rgba(240, 240, 240, 0.4)',
        padding: '15px',
        borderRadius: '12px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ color: textColor, fontFamily: uiFont, marginBottom: '5px' }}>
            {steps[currentStep]?.description || 'Click Generate to start sorting'}
          </div>
          {steps[currentStep]?.code && (
            <pre style={{
              margin: '10px 0 0 0',
              padding: '12px',
              background: isDark ? '#1a1a1f' : '#f8f9fa',
              borderRadius: '8px',
              fontSize: '12px',
              color: isDark ? '#e0e0e0' : '#333',
              fontFamily: codeFont,
              overflowX: 'auto'
            }}>
              {steps[currentStep].code}
            </pre>
          )}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handlePlayPause}
            disabled={listNodes.size === 0 || !currentHead}
            style={{
              padding: '10px 16px',
              background: isDark ? 'rgba(74, 158, 255, 0.3)' : 'rgba(33, 150, 243, 0.2)',
              border: `1px solid ${accentColor}`,
              borderRadius: '8px',
              color: textColor,
              cursor: listNodes.size === 0 ? 'not-allowed' : 'pointer',
              fontFamily: uiFont,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
            {steps.length === 0 ? 'Generate' : (isPlaying ? 'Pause' : 'Play')}
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: '10px 16px',
              background: isDark ? 'rgba(100, 100, 110, 0.3)' : 'rgba(200, 200, 200, 0.4)',
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              color: textColor,
              cursor: 'pointer',
              fontFamily: uiFont,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FiRotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>

      {steps.length > 0 && (
        <div style={{
          background: isDark ? 'rgba(30, 30, 40, 0.6)' : 'rgba(240, 240, 240, 0.4)',
          padding: '15px',
          borderRadius: '12px',
          marginBottom: '15px'
        }}>
          <div style={{ display: 'flex', gap: '20px', color: textColor, fontFamily: uiFont, fontSize: '14px' }}>
            <div>
              <strong>Step:</strong> {currentStep + 1} / {steps.length}
            </div>
            {steps[currentStep]?.comparisons !== undefined && (
              <div>
                <strong>Comparisons:</strong> {steps[currentStep].comparisons}
              </div>
            )}
            {steps[currentStep]?.swaps !== undefined && (
              <div>
                <strong>Swaps:</strong> {steps[currentStep].swaps}
              </div>
            )}
          </div>
          <div style={{ marginTop: '10px' }}>
            <div style={{
              width: '100%',
              height: '6px',
              background: isDark ? 'rgba(100, 100, 110, 0.3)' : 'rgba(200, 200, 200, 0.4)',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
                height: '100%',
                background: accentColor,
                transition: 'width 0.3s'
              }} />
            </div>
          </div>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {renderTimeComplexityChart()}
        {renderLinkedListVisualization()}
      </div>

      <div style={{
        background: isDark ? 'rgba(74, 158, 255, 0.1)' : '#E3F2FD',
        padding: '15px',
        borderRadius: '12px',
        border: `1px solid ${isDark ? 'rgba(74, 158, 255, 0.3)' : '#2196F3'}`
      }}>
        <div style={{ color: accentColor, fontWeight: '600', marginBottom: '8px', fontFamily: uiFont }}>
          Algorithm Complexity: {algorithms.find(a => a.id === selectedAlgorithm)?.name}
        </div>
        <div style={{ color: isDark ? '#c0c0c0' : '#666', fontSize: '13px', fontFamily: uiFont }}>
          <div><strong>Time:</strong> {algorithms.find(a => a.id === selectedAlgorithm)?.time}</div>
          <div><strong>Space:</strong> {algorithms.find(a => a.id === selectedAlgorithm)?.space}</div>
        </div>
      </div>
    </div>
  );
};

export default LinkedListSorting;
