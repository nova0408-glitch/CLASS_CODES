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
