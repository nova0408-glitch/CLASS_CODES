import React, { useEffect, useState } from 'react';
import { StackElement } from '../types';

interface Props {
  elements: StackElement[];
  capacity: number;
  top: number;
  isPushing?: boolean;
  isPopping?: boolean;
}

const CELL_WIDTH = 120;
const CELL_HEIGHT = 50;
const STACK_SPACING = 5;

const StackVisualization: React.FC<Props> = ({ 
  elements, 
  capacity, 
  top,
  isPushing,
  isPopping
}) => {
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isPushing && top >= 0) {
      setAnimatingIndex(top);
      const timer = setTimeout(() => setAnimatingIndex(null), 600);
      return () => clearTimeout(timer);
    }
    if (isPopping && top >= 0) {
      setAnimatingIndex(top);
      const timer = setTimeout(() => setAnimatingIndex(null), 600);
      return () => clearTimeout(timer);
    }
  }, [isPushing, isPopping, top]);

  const renderStackElement = (element: StackElement | null, index: number, isTop: boolean) => {
    const isEmpty = element === null;
    const isAnimating = animatingIndex === index;

    const cellStyle: React.CSSProperties = {
      width: CELL_WIDTH,
      height: CELL_HEIGHT,
      border: '2px solid',
      borderColor: isTop ? '#FF6B6B' : isAnimating ? '#4CAF50' : '#667eea',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: isTop 
        ? '#FFE5E5' 
        : isAnimating 
        ? '#E8F5E9' 
        : isEmpty 
        ? '#f5f5f5' 
        : '#E3F2FD',
      margin: `${STACK_SPACING}px auto`,
      transition: 'all 0.3s ease',
      animation: isAnimating 
        ? isPushing 
          ? 'slideDown 0.6s ease-out' 
          : 'slideUp 0.6s ease-out'
        : undefined,
      position: 'relative' as const,
      boxShadow: isTop ? '0 4px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
    };

    return (
      <div key={index} style={cellStyle}>
        {!isEmpty && (
          <>
            <div style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              {element.value}
            </div>
            {isTop && (
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '12px',
                color: '#FF6B6B',
                fontWeight: 'bold',
                background: 'white',
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                TOP
              </div>
            )}
          </>
        )}
        {isEmpty && (
          <div style={{
            fontSize: '12px',
            color: '#999',
            fontStyle: 'italic'
          }}>
            Empty
          </div>
        )}
      </div>
    );
  };

  // Create array of elements (stack grows upward visually, but we display top to bottom)
  const displayElements: (StackElement | null)[] = [];
  for (let i = capacity - 1; i >= 0; i--) {
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
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        background: 'white',
        borderRadius: '6px',
        border: '2px solid #ddd',
        minHeight: '300px',
        position: 'relative'
      }}>
        {/* Stack label */}
        <div style={{
          position: 'absolute',
          left: '-80px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#667eea',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed'
        }}>
          STACK (LIFO)
        </div>

        {/* Stack elements */}
        <div style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          alignItems: 'center',
          width: '100%'
        }}>
          {displayElements.map((element, idx) => {
            const actualIndex = capacity - 1 - idx;
            const isTop = actualIndex === top && top >= 0;
            return renderStackElement(element, actualIndex, isTop);
          })}
        </div>

        {/* Base indicator */}
        <div style={{
          width: CELL_WIDTH + 20,
          height: '4px',
          background: '#333',
          borderRadius: '2px',
          marginTop: '10px'
        }} />
        <div style={{
          fontSize: '12px',
          color: '#666',
          marginTop: '5px'
        }}>
          Base
        </div>
      </div>
      <div style={{
        marginTop: '15px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#666'
      }}>
        <strong>Size:</strong> {elements.length} / <strong>Capacity:</strong> {capacity} | <strong>Top Index:</strong> {top >= 0 ? top : 'Empty'}
      </div>
    </div>
  );
};

export default StackVisualization;

