import React, { useState, useCallback } from 'react';
import { DataStructure } from '../../base/StructureInterface';
import { GuideContent } from '../../base/types';
import ArrayVisualization from './components/ArrayVisualization';
import ArrayNotes from './components/ArrayNotes';
import { ArrayElement, ArrayState } from './types';
import Icon from '../../../components/shared/Icon';
import OperationButtons from '../../../components/linked_list/OperationButtons';
import ExplanationPanel from '../../../components/linked_list/ExplanationPanel';

const ARRAY_CAPACITY = 10;

const ArrayComponent: React.FC = () => {
  const [elements, setElements] = useState<ArrayElement[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | undefined>();
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const [currentExplanation, setCurrentExplanation] = useState('');
  const [currentError, setCurrentError] = useState<string | undefined>();
  const [operationCode, setOperationCode] = useState<string>('');
  const [operationDescription, setOperationDescription] = useState<string>('');

  const clearHighlights = useCallback(() => {
    setTimeout(() => {
      setHighlightedIndex(undefined);
      setActiveIndex(undefined);
    }, 1000);
  }, []);

  const createArray = useCallback(() => {
    const newElements: ArrayElement[] = [
      { value: 10, index: 0 },
      { value: 20, index: 1 },
      { value: 30, index: 2 },
      { value: 40, index: 3 },
    ];
    setElements(newElements);
    setCurrentExplanation('Created an array with 4 elements: [10, 20, 30, 40]. Elements are stored in contiguous memory locations.');
    setOperationCode(`int arr[10] = {10, 20, 30, 40};
// Array of capacity 10, currently has 4 elements`);
    setOperationDescription('Creates a static array in C++ with initial values.');
  }, []);

  const insertAt = useCallback((index: number, value: number) => {
    if (index < 0 || index >= ARRAY_CAPACITY) {
      setCurrentError(`Index ${index} is out of bounds. Valid range: 0-${ARRAY_CAPACITY - 1}`);
      return;
    }
    if (elements.length >= ARRAY_CAPACITY) {
      setCurrentError('Array is full. Cannot insert more elements.');
      return;
    }

    setHighlightedIndex(index);
    setActiveIndex(index);

    const newElements = [...elements];
    // Shift elements to the right
    for (let i = newElements.length; i > index; i--) {
      const existing = newElements.find(e => e.index === i - 1);
      if (existing) {
        existing.index = i;
      }
    }
    newElements.push({ value, index });
    newElements.sort((a, b) => a.index - b.index);

    setElements(newElements);
    setCurrentExplanation(`Inserted value ${value} at index ${index}. Elements after index ${index} were shifted right. Time complexity: O(n).`);
    setOperationCode(`// Insert at index ${index}
for (int i = size; i > ${index}; i--) {
    arr[i] = arr[i-1];  // Shift right
}
arr[${index}] = ${value};
size++;`);
    setOperationDescription(`Inserts a value at a specific index, shifting existing elements to the right.`);
    clearHighlights();
  }, [elements, clearHighlights]);

  const deleteAt = useCallback((index: number) => {
    if (index < 0 || index >= elements.length) {
      setCurrentError(`Index ${index} is out of bounds. Array has ${elements.length} elements.`);
      return;
    }

    setHighlightedIndex(index);
    setActiveIndex(index);

    const newElements = elements.filter(e => e.index !== index);
    // Shift elements to the left
    newElements.forEach(e => {
      if (e.index > index) {
        e.index--;
      }
    });

    setElements(newElements);
    setCurrentExplanation(`Deleted element at index ${index}. Elements after index ${index} were shifted left. Time complexity: O(n).`);
    setOperationCode(`// Delete at index ${index}
for (int i = ${index}; i < size - 1; i++) {
    arr[i] = arr[i+1];  // Shift left
}
size--;`);
    setOperationDescription(`Deletes an element at a specific index, shifting remaining elements to the left.`);
    clearHighlights();
  }, [elements, clearHighlights]);

  const search = useCallback((value: number) => {
    setCurrentExplanation(`Searching for value ${value}...`);
    
    let foundIndex = -1;
    elements.forEach((element, idx) => {
      setTimeout(() => {
        setHighlightedIndex(element.index);
        if (element.value === value && foundIndex === -1) {
          foundIndex = element.index;
          setActiveIndex(element.index);
          setCurrentExplanation(`Found value ${value} at index ${element.index}. Time complexity: O(n) in worst case.`);
        }
      }, idx * 300);
    });

    setTimeout(() => {
      if (foundIndex === -1) {
        setCurrentExplanation(`Value ${value} not found in the array.`);
        clearHighlights();
      }
      setOperationCode(`// Linear search for value ${value}
for (int i = 0; i < size; i++) {
    if (arr[i] == ${value}) {
        return i;  // Found at index i
    }
}
return -1;  // Not found`);
      setOperationDescription(`Searches for a value by checking each element sequentially.`);
    }, elements.length * 300);
  }, [elements, clearHighlights]);

  const access = useCallback((index: number) => {
    if (index < 0 || index >= elements.length) {
      setCurrentError(`Index ${index} is out of bounds. Array has ${elements.length} elements.`);
      return;
    }

    const element = elements.find(e => e.index === index);
    if (element) {
      setHighlightedIndex(index);
      setActiveIndex(index);
      setCurrentExplanation(`Accessed element at index ${index}: value = ${element.value}. Time complexity: O(1) - direct access.`);
      setOperationCode(`int value = arr[${index}];
// Direct access using index - O(1) operation`);
      setOperationDescription(`Accesses an element directly using its index. This is O(1) because arrays use contiguous memory.`);
      clearHighlights();
    }
  }, [elements, clearHighlights]);

  const handleShowCode = useCallback((code: string, description: string) => {
    setOperationCode(code);
    setOperationDescription(description);
  }, []);

  const handleClear = useCallback(() => {
    setElements([]);
    setCurrentExplanation('');
    setCurrentError(undefined);
    setOperationCode('');
    setOperationDescription('');
    setHighlightedIndex(undefined);
    setActiveIndex(undefined);
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
          Array Visualizer (C++)
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>
          Learn Arrays - Contiguous Memory and Index-Based Access
        </p>
      </header>

      <ArrayNotes />

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
              Array Operations
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <button 
                onClick={createArray}
                style={{
                  padding: '10px 15px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}
              >
                Create Array
              </button>
              <button 
                onClick={() => insertAt(2, 25)}
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
                Insert at Index 2
              </button>
              <button 
                onClick={() => deleteAt(1)}
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
                Delete at Index 1
              </button>
              <button 
                onClick={() => search(30)}
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
                Search for 30
              </button>
              <button 
                onClick={() => access(0)}
                style={{
                  padding: '10px 15px',
                  background: '#9C27B0',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}
              >
                Access Index 0
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

      <ArrayVisualization
        elements={elements}
        capacity={ARRAY_CAPACITY}
        highlightedIndex={highlightedIndex}
        activeIndex={activeIndex}
      />
    </div>
  );
};

const guide: GuideContent = {
  title: 'Array Operations',
  sections: [
    {
      id: 'intro',
      title: 'What is an Array?',
      content: 'An array is a collection of elements stored in contiguous memory locations.'
    }
  ]
};

export const arrayStructure: DataStructure = {
  id: 'array',
  name: 'Array',
  category: 'linear',
  description: 'A collection of elements stored in contiguous memory locations',
  available: true,
  Visualization: ArrayVisualization,
  operations: [],
  guide: guide,
  Component: ArrayComponent,
};

