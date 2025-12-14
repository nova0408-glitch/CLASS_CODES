import React, { useState, useCallback } from 'react';
import { DataStructure } from '../../base/StructureInterface';
import { GuideContent } from '../../base/types';
import QueueVisualization from './components/QueueVisualization';
import { QueueElement } from './types';
import Icon from '../../../components/shared/Icon';
import ExplanationPanel from '../../../components/linked_list/ExplanationPanel';

const QUEUE_CAPACITY = 8;

const QueueComponent: React.FC = () => {
  const [elements, setElements] = useState<QueueElement[]>([]);
  const [front, setFront] = useState<number>(-1);
  const [rear, setRear] = useState<number>(-1);
  const [isEnqueuing, setIsEnqueuing] = useState(false);
  const [isDequeuing, setIsDequeuing] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState('');
  const [currentError, setCurrentError] = useState<string | undefined>();
  const [operationCode, setOperationCode] = useState<string>('');
  const [operationDescription, setOperationDescription] = useState<string>('');

  const enqueue = useCallback((value: number) => {
    if (rear >= QUEUE_CAPACITY - 1) {
      setCurrentError('Queue overflow! Queue is full. Cannot enqueue more elements.');
      return;
    }

    setIsEnqueuing(true);
    const newRear = rear + 1;
    const newElement: QueueElement = {
      value,
      index: newRear,
      isEnqueuing: true
    };

    if (front === -1) {
      setFront(0); // First element
    }

    setElements(prev => [...prev, newElement]);
    setRear(newRear);
    setCurrentExplanation(`Enqueued ${value} to the rear of the queue. Rear is now at index ${newRear}. FIFO: First In, First Out.`);
    setOperationCode(`// Enqueue operation
if (rear < capacity - 1) {
    if (front == -1) front = 0;  // First element
    rear++;
    queue[rear] = ${value};
} else {
    // Queue overflow
}`);
    setOperationDescription(`Adds an element to the rear of the queue. Time complexity: O(1).`);

    setTimeout(() => {
      setIsEnqueuing(false);
      setElements(prev => prev.map(e => ({ ...e, isEnqueuing: false })));
    }, 600);
  }, [rear, front]);

  const dequeue = useCallback(() => {
    if (front < 0 || front > rear) {
      setCurrentError('Queue underflow! Queue is empty. Cannot dequeue.');
      return;
    }

    setIsDequeuing(true);
    const dequeuedValue = elements.find(e => e.index === front)?.value;

    setCurrentExplanation(`Dequeued ${dequeuedValue} from the front of the queue. Front is now at index ${front + 1 <= rear ? front + 1 : 'Empty'}.`);
    setOperationCode(`// Dequeue operation
if (front >= 0 && front <= rear) {
    int value = queue[front];
    front++;
    if (front > rear) {
        front = rear = -1;  // Queue empty
    }
    return value;
} else {
    // Queue underflow
    return -1;
}`);
    setOperationDescription(`Removes and returns the front element from the queue. Time complexity: O(1).`);

    setTimeout(() => {
      const newElements = elements.filter(e => e.index !== front);
      if (newElements.length === 0) {
        setFront(-1);
        setRear(-1);
      } else {
        setFront(front + 1);
      }
      setElements(newElements);
      setIsDequeuing(false);
    }, 600);
  }, [front, rear, elements]);

  const peek = useCallback(() => {
    if (front < 0 || front > rear) {
      setCurrentError('Queue is empty. Cannot peek.');
      return;
    }

    const frontValue = elements.find(e => e.index === front)?.value;
    setCurrentExplanation(`Peeked at front element: ${frontValue}. Peek does not remove the element.`);
    setOperationCode(`// Peek operation
if (front >= 0 && front <= rear) {
    return queue[front];  // Return without removing
} else {
    return -1;  // Queue empty
}`);
    setOperationDescription(`Returns the front element without removing it. Time complexity: O(1).`);
  }, [front, rear, elements]);

  const handleClear = useCallback(() => {
    setElements([]);
    setFront(-1);
    setRear(-1);
    setCurrentExplanation('');
    setCurrentError(undefined);
    setOperationCode('');
    setOperationDescription('');
    setIsEnqueuing(false);
    setIsDequeuing(false);
  }, []);

  return (
    <div style={{ 
      maxWidth: '1400px', 
      margin: '0 auto', 
      padding: '20px',
      minHeight: '100vh'
    }}>
      <header style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        color: 'white'
      }}>
        <h1 style={{ fontSize: '36px', marginBottom: '10px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
          Queue Visualizer (C++)
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>
          Learn Queue - FIFO (First In First Out) Data Structure
        </p>
        <div style={{ 
          background: 'rgba(255,255,255,0.2)', 
          padding: '10px', 
          borderRadius: '6px', 
          marginTop: '10px',
          fontSize: '14px'
        }}>
          <strong>Principle:</strong> First element enqueued is the first element dequeued
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            margin: '20px 0'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#333', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="list" size={20} color="#667eea" />
              Queue Operations
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
              <button 
                onClick={() => enqueue(Math.floor(Math.random() * 100))}
                style={{
                  padding: '10px 15px',
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}
              >
                Enqueue (Random)
              </button>
              <button 
                onClick={dequeue}
                style={{
                  padding: '10px 15px',
                  background: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}
              >
                Dequeue
              </button>
              <button 
                onClick={peek}
                style={{
                  padding: '10px 15px',
                  background: '#FF9800',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}
              >
                Peek
              </button>
              <button 
                onClick={handleClear}
                style={{
                  padding: '10px 15px',
                  background: '#666',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}
              >
                Clear
              </button>
            </div>
            <div style={{
              background: '#E3F2FD',
              padding: '12px',
              borderRadius: '6px',
              fontSize: '13px',
              color: '#1976D2'
            }}>
              <strong>Operations:</strong> Enqueue (add to rear), Dequeue (remove from front), Peek (view front without removing)
            </div>
          </div>
        </div>

        <div>
          {operationCode && (
            <div style={{
              background: '#E3F2FD',
              padding: '15px',
              borderRadius: '8px',
              margin: '20px 0',
              border: '2px solid #2196F3'
            }}>
              <h4 style={{ 
                color: '#1976D2', 
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Icon name="code" size={18} color="#1976D2" />
                Operation Code
              </h4>
              <p style={{ color: '#666', fontSize: '13px', marginBottom: '10px' }}>
                {operationDescription}
              </p>
              <pre style={{
                margin: 0,
                fontFamily: 'monospace',
                fontSize: '12px',
                color: '#212529',
                background: 'white',
                padding: '12px',
                borderRadius: '4px',
                overflowX: 'auto',
                border: '1px solid #dee2e6'
              }}>
                {operationCode}
              </pre>
            </div>
          )}
          
          <ExplanationPanel
            explanation={currentExplanation}
            error={currentError}
          />
        </div>
      </div>

      <QueueVisualization
        elements={elements}
        capacity={QUEUE_CAPACITY}
        front={front}
        rear={rear}
        isEnqueuing={isEnqueuing}
        isDequeuing={isDequeuing}
      />
    </div>
  );
};

const guide: GuideContent = {
  title: 'Queue Operations',
  sections: [
    {
      id: 'intro',
      title: 'What is a Queue?',
      content: 'A queue is a FIFO (First In First Out) data structure where elements are added at the rear and removed from the front.'
    }
  ]
};

export const queueStructure: DataStructure = {
  id: 'queue',
  name: 'Queue',
  category: 'linear',
  description: 'A FIFO (First In First Out) data structure',
  available: true,
  Visualization: QueueVisualization,
  operations: [],
  guide: guide,
  Component: QueueComponent,
};

