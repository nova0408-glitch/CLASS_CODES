import React, { useState, useCallback } from 'react';
import { DataStructure } from '../../base/StructureInterface';
import { GuideContent } from '../../base/types';
import StackVisualization from './components/StackVisualization';
import { StackElement } from './types';
import Icon from '../../../components/shared/Icon';
import ExplanationPanel from '../../../components/linked_list/ExplanationPanel';

const STACK_CAPACITY = 8;

const StackComponent: React.FC = () => {
  const [elements, setElements] = useState<StackElement[]>([]);
  const [top, setTop] = useState<number>(-1);
  const [isPushing, setIsPushing] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState('');
  const [currentError, setCurrentError] = useState<string | undefined>();
  const [operationCode, setOperationCode] = useState<string>('');
  const [operationDescription, setOperationDescription] = useState<string>('');

  const push = useCallback((value: number) => {
    if (top >= STACK_CAPACITY - 1) {
      setCurrentError('Stack overflow! Stack is full. Cannot push more elements.');
      return;
    }

    setIsPushing(true);
    const newTop = top + 1;
    const newElement: StackElement = {
      value,
      index: newTop,
      isPushing: true
    };

    setElements(prev => [...prev, newElement]);
    setTop(newTop);
    setCurrentExplanation(`Pushed ${value} onto the stack. Top is now at index ${newTop}. LIFO: Last In, First Out.`);
    setOperationCode(`// Push operation
if (top < capacity - 1) {
    top++;
    stack[top] = ${value};
} else {
    // Stack overflow
}`);

    setOperationDescription(`Adds an element to the top of the stack. Time complexity: O(1).`);

    setTimeout(() => {
      setIsPushing(false);
      setElements(prev => prev.map(e => ({ ...e, isPushing: false })));
    }, 600);
  }, [top]);

  const pop = useCallback(() => {
    if (top < 0) {
      setCurrentError('Stack underflow! Stack is empty. Cannot pop.');
      return;
    }

    setIsPopping(true);
    const poppedValue = elements.find(e => e.index === top)?.value;

    setCurrentExplanation(`Popped ${poppedValue} from the stack. Top is now at index ${top - 1 >= 0 ? top - 1 : 'Empty'}.`);
    setOperationCode(`// Pop operation
if (top >= 0) {
    int value = stack[top];
    top--;
    return value;
} else {
    // Stack underflow
    return -1;
}`);

    setOperationDescription(`Removes and returns the top element from the stack. Time complexity: O(1).`);

    setTimeout(() => {
      const newElements = elements.filter(e => e.index !== top);
      setElements(newElements);
      setTop(top - 1);
      setIsPopping(false);
    }, 600);
  }, [top, elements]);

  const peek = useCallback(() => {
    if (top < 0) {
      setCurrentError('Stack is empty. Cannot peek.');
      return;
    }

    const topValue = elements.find(e => e.index === top)?.value;
    setCurrentExplanation(`Peeked at top element: ${topValue}. Peek does not remove the element.`);
    setOperationCode(`// Peek operation
if (top >= 0) {
    return stack[top];  // Return without removing
} else {
    return -1;  // Stack empty
}`);
    setOperationDescription(`Returns the top element without removing it. Time complexity: O(1).`);
  }, [top, elements]);

  const handleClear = useCallback(() => {
    setElements([]);
    setTop(-1);
    setCurrentExplanation('');
    setCurrentError(undefined);
    setOperationCode('');
    setOperationDescription('');
    setIsPushing(false);
    setIsPopping(false);
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
          Stack Visualizer (C++)
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>
          Learn Stack - LIFO (Last In First Out) Data Structure
        </p>
        <div style={{ 
          background: 'rgba(255,255,255,0.2)', 
          padding: '10px', 
          borderRadius: '6px', 
          marginTop: '10px',
          fontSize: '14px'
        }}>
          <strong>Principle:</strong> Last element pushed is the first element popped
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
              Stack Operations
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '15px' }}>
              <button 
                onClick={() => push(Math.floor(Math.random() * 100))}
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
                Push (Random)
              </button>
              <button 
                onClick={pop}
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
                Pop
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
              <strong>Operations:</strong> Push (add to top), Pop (remove from top), Peek (view top without removing)
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

      <StackVisualization
        elements={elements}
        capacity={STACK_CAPACITY}
        top={top}
        isPushing={isPushing}
        isPopping={isPopping}
      />
    </div>
  );
};

const guide: GuideContent = {
  title: 'Stack Operations',
  sections: [
    {
      id: 'intro',
      title: 'What is a Stack?',
      content: 'A stack is a LIFO (Last In First Out) data structure where elements are added and removed from the top.'
    }
  ]
};

export const stackStructure: DataStructure = {
  id: 'stack',
  name: 'Stack',
  category: 'linear',
  description: 'A LIFO (Last In First Out) data structure',
  available: true,
  Visualization: StackVisualization,
  operations: [],
  guide: guide,
  Component: StackComponent,
};

