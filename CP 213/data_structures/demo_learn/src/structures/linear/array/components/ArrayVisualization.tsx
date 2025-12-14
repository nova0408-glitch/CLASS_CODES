import React, { useEffect, useState } from 'react';
import { ArrayElement } from '../types';

interface Props {
  elements: ArrayElement[];
  capacity: number;
  highlightedIndex?: number;
  activeIndex?: number;
}

const CELL_WIDTH = 80;
const CELL_HEIGHT = 60;
const CELL_MARGIN = 5;

const ArrayVisualization: React.FC<Props> = ({ 
  elements, 
  capacity, 
  highlightedIndex,
  activeIndex 
}) => {
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (highlightedIndex !== undefined) {
      setAnimatingIndex(highlightedIndex);
      const timer = setTimeout(() => setAnimatingIndex(null), 600);
      return () => clearTimeout(timer);
    }
  }, [highlightedIndex]);

  const renderCell = (element: ArrayElement | null, index: number) => {
    const isHighlighted = animatingIndex === index || highlightedIndex === index;
    const isActive = activeIndex === index;
    const isEmpty = element === null;

    const cellStyle: React.CSSProperties = {
      width: CELL_WIDTH,
      height: CELL_HEIGHT,
      border: '2px solid',
      borderColor: isActive ? '#FF6B6B' : isHighlighted ? '#4CAF50' : '#667eea',
      borderRadius: '6px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: isActive 
        ? '#FFE5E5' 
        : isHighlighted 
        ? '#E8F5E9' 
        : isEmpty 
        ? '#f5f5f5' 
        : '#E3F2FD',
      margin: CELL_MARGIN,
      transition: 'all 0.3s ease',
      animation: isHighlighted ? 'highlight 0.6s ease-in-out' : undefined,
      position: 'relative' as const,
    };

    return (
      <div key={index} style={cellStyle}>
        <div style={{
          fontSize: '10px',
          color: '#666',
          marginBottom: '4px',
          fontWeight: 'bold'
        }}>
          [{index}]
        </div>
        <div style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: isEmpty ? '#999' : '#333'
        }}>
          {element?.value ?? '—'}
        </div>
        {isActive && (
          <div style={{
            position: 'absolute',
            top: '-20px',
            fontSize: '12px',
            color: '#FF6B6B',
            fontWeight: 'bold'
          }}>
            Current
          </div>
        )}
      </div>
    );
  };

  // Create array of elements with nulls for empty slots
  const displayElements: (ArrayElement | null)[] = [];
  for (let i = 0; i < capacity; i++) {
    const element = elements.find(e => e.index === i);
    displayElements.push(element || null);
  }

  return (
    <div style={{
      padding: '20px',
      background: '#f5f5f5',
      borderRadius: '8px',
      margin: '20px 0'
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '5px',
        padding: '20px',
        background: 'white',
        borderRadius: '6px',
        border: '2px solid #ddd',
        minHeight: '150px'
      }}>
        {displayElements.map((element, index) => renderCell(element, index))}
      </div>
      <div style={{
        marginTop: '15px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#666'
      }}>
        <strong>Size:</strong> {elements.length} / <strong>Capacity:</strong> {capacity}
      </div>
    </div>
  );
};

export default ArrayVisualization;

