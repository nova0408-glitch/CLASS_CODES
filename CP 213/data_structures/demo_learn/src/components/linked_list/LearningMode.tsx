import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from '../shared/Icon';

interface Props {
  onStep: (step: number) => void;
  onReset: () => void;
}

const LearningMode: React.FC<Props> = ({ onStep, onReset }) => {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);

  const isDark = theme === 'dark';
  const bgColor = isDark ? 'rgba(20, 20, 25, 0.8)' : '#ffffff';
  const textColor = isDark ? '#e0e0e0' : '#333';
  const borderColor = isDark ? '#333' : '#ddd';
  const buttonBg = isDark ? 'rgba(74, 158, 255, 0.2)' : '#E3F2FD';
  const buttonHover = isDark ? 'rgba(74, 158, 255, 0.3)' : '#BBDEFB';
  const accentColor = isDark ? '#4a9eff' : '#2196F3';

  const steps = [
    {
      title: 'Introduction to Linked Lists',
      content: 'A linked list is a linear data structure where elements are stored in nodes. Each node contains data and a pointer to the next node. Unlike arrays, nodes are not stored contiguously in memory.',
      action: 'Understanding the basic concept'
    },
    {
      title: 'Node Structure',
      content: 'Each node has two parts: DATA (stores the actual value) and LINK (pointer to the next node). In C++, we use struct Node with int data and Node* link fields.',
      action: 'Click "Create List" to see nodes in action'
    },
    {
      title: 'Head Pointer',
      content: 'The head pointer (Node* head) points to the first node. It\'s your entry point to the entire list. If head is nullptr, the list is empty.',
      action: 'Observe the red "head" pointer in the visualization'
    },
    {
      title: 'Inserting at Beginning',
      content: 'To insert at the beginning: Create a new node, set its link to current head, then update head to point to the new node. This is O(1) operation!',
      action: 'Try "Insert at Beginning" operation'
    },
    {
      title: 'Inserting at End',
      content: 'To insert at the end: Traverse to the last node (follow links until link is nullptr), then set that node\'s link to the new node. This requires O(n) traversal.',
      action: 'Try "Insert at End" operation'
    },
    {
      title: 'Traversal',
      content: 'Traversal means visiting each node. Start at head, follow the link pointers until you reach nullptr. Each step: current = current->link',
      action: 'Try "Traverse" to see all nodes'
    },
    {
      title: 'Memory Management',
      content: 'Nodes are created with "new" and must be deleted with "delete" to prevent memory leaks. Lost nodes in the visualization show what happens when pointers are lost before deletion.',
      action: 'Watch for lost nodes when deleting'
    },
    {
      title: 'Pointer Order Matters',
      content: 'When inserting in the middle, order is critical! First: newNode->link = p->link (preserve remainder). Then: p->link = newNode. Wrong order creates loops!',
      action: 'Try "Demonstrate Wrong Order" to see the problem'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      onStep(next);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      onStep(prev);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    onReset();
  };

  return (
    <div style={{
      background: bgColor,
      padding: '20px',
      borderRadius: '12px',
      border: `1px solid ${borderColor}`,
      marginBottom: '20px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <h3 style={{
          color: textColor,
          fontSize: '18px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Icon name="book" size={18} color={accentColor} />
          Step-by-Step Learning
        </h3>
        <div style={{
          color: isDark ? '#aaa' : '#666',
          fontSize: '14px'
        }}>
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>

      <div style={{
        background: isDark ? 'rgba(30, 30, 40, 0.5)' : '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '15px',
        border: `1px solid ${borderColor}`
      }}>
        <h4 style={{
          color: accentColor,
          marginBottom: '12px',
          fontSize: '16px'
        }}>
          {steps[currentStep].title}
        </h4>
        <p style={{
          color: isDark ? '#d0d0d0' : '#555',
          lineHeight: '1.7',
          marginBottom: '15px'
        }}>
          {steps[currentStep].content}
        </p>
        <div style={{
          background: buttonBg,
          padding: '10px',
          borderRadius: '6px',
          border: `1px solid ${isDark ? 'rgba(74, 158, 255, 0.3)' : '#2196F3'}`,
          color: accentColor,
          fontSize: '13px',
          fontWeight: '500'
        }}>
          💡 {steps[currentStep].action}
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            style={{
              padding: '10px 20px',
              background: currentStep === 0 
                ? (isDark ? 'rgba(60, 60, 70, 0.5)' : '#e0e0e0')
                : buttonBg,
              color: currentStep === 0 
                ? (isDark ? '#666' : '#999')
                : accentColor,
              border: 'none',
              borderRadius: '6px',
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (currentStep > 0) {
                e.currentTarget.style.background = buttonHover;
              }
            }}
            onMouseLeave={(e) => {
              if (currentStep > 0) {
                e.currentTarget.style.background = buttonBg;
              }
            }}
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            style={{
              padding: '10px 20px',
              background: currentStep === steps.length - 1
                ? (isDark ? 'rgba(60, 60, 70, 0.5)' : '#e0e0e0')
                : buttonBg,
              color: currentStep === steps.length - 1
                ? (isDark ? '#666' : '#999')
                : accentColor,
              border: 'none',
              borderRadius: '6px',
              cursor: currentStep === steps.length - 1 ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (currentStep < steps.length - 1) {
                e.currentTarget.style.background = buttonHover;
              }
            }}
            onMouseLeave={(e) => {
              if (currentStep < steps.length - 1) {
                e.currentTarget.style.background = buttonBg;
              }
            }}
          >
            Next →
          </button>
        </div>
        <button
          onClick={handleReset}
          style={{
            padding: '10px 20px',
            background: isDark ? 'rgba(100, 100, 110, 0.3)' : '#f5f5f5',
            color: textColor,
            border: `1px solid ${borderColor}`,
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
        >
          Reset Tutorial
        </button>
      </div>

      <div style={{
        marginTop: '15px',
        display: 'flex',
        gap: '4px',
        justifyContent: 'center'
      }}>
        {steps.map((_, idx) => (
          <div
            key={idx}
            onClick={() => {
              setCurrentStep(idx);
              onStep(idx);
            }}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: idx === currentStep ? accentColor : (isDark ? '#444' : '#ddd'),
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LearningMode;
