import React, { useEffect, useState } from 'react';
import { QueueElement } from '../types';

interface Props {
  elements: QueueElement[];
  capacity: number;
  front: number;
  rear: number;
  isEnqueuing?: boolean;
  isDequeuing?: boolean;
}

const CELL_WIDTH = 100;
const CELL_HEIGHT = 60;

const QueueVisualization: React.FC<Props> = ({ 
  elements, 
  capacity, 
  front,
  rear,
  isEnqueuing,
  isDequeuing
}) => {
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isEnqueuing && rear >= 0) {
      setAnimatingIndex(rear);
      const timer = setTimeout(() => setAnimatingIndex(null), 600);
      return () => clearTimeout(timer);
    }
    if (isDequeuing && front >= 0) {
      setAnimatingIndex(front);
      const timer = setTimeout(() => setAnimatingIndex(null), 600);
      return () => clearTimeout(timer);
    }
  }, [isEnqueuing, isDequeuing, front, rear]);

  const renderCell = (element: QueueElement | null, index: number, isFront: boolean, isRear: boolean) => {
    const isEmpty = element === null;
    const isAnimating = animatingIndex === index;

    const cellStyle: React.CSSProperties = {
      width: CELL_WIDTH,
      height: CELL_HEIGHT,
      border: '2px solid',
      borderColor: isFront 
        ? '#FF6B6B' 
        : isRear 
        ? '#4CAF50' 
        : isAnimating 
        ? '#FF9800' 
        : '#667eea',
      borderRadius: '6px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: isFront 
        ? '#FFE5E5' 
        : isRear 
        ? '#E8F5E9' 
        : isAnimating 
        ? '#FFF4E5' 
        : isEmpty 
        ? '#f5f5f5' 
        : '#E3F2FD',
      margin: '5px',
      transition: 'all 0.3s ease',
      animation: isAnimating 
        ? isEnqueuing 
          ? 'slideIn 0.6s ease-out' 
          : 'slideOut 0.6s ease-out'
        : undefined,
      position: 'relative' as const,
      boxShadow: (isFront || isRear) ? '0 4px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
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
            <div style={{
              fontSize: '10px',
              color: '#666',
              marginTop: '4px'
            }}>
              [{index}]
            </div>
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
        {isFront && (
          <div style={{
            position: 'absolute',
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '11px',
            color: '#FF6B6B',
            fontWeight: 'bold',
            background: 'white',
            padding: '2px 6px',
            borderRadius: '4px'
          }}>
            FRONT
          </div>
        )}
        {isRear && !isFront && (
          <div style={{
            position: 'absolute',
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '11px',
            color: '#4CAF50',
            fontWeight: 'bold',
            background: 'white',
            padding: '2px 6px',
            borderRadius: '4px'
          }}>
            REAR
          </div>
        )}
      </div>
    );
  };

  // Create array of elements
  const displayElements: (QueueElement | null)[] = [];
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
        padding: '20px',
        background: 'white',
        borderRadius: '6px',
        border: '2px solid #ddd',
        minHeight: '150px',
        position: 'relative'
      }}>
        {/* Queue direction indicator */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          fontSize: '12px',
          color: '#666',
          fontWeight: 'bold'
        }}>
          ← FRONT (Dequeue) &nbsp;&nbsp;&nbsp; REAR (Enqueue) →
        </div>

        {displayElements.map((element, index) => {
          const isFront = index === front && front >= 0;
          const isRear = index === rear && rear >= 0;
          return renderCell(element, index, isFront, isRear);
        })}
      </div>
      <div style={{
        marginTop: '15px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#666'
      }}>
        <strong>Size:</strong> {elements.length} / <strong>Capacity:</strong> {capacity} | 
        <strong> Front:</strong> {front >= 0 ? front : 'Empty'} | 
        <strong> Rear:</strong> {rear >= 0 ? rear : 'Empty'}
      </div>
    </div>
  );
};

export default QueueVisualization;

