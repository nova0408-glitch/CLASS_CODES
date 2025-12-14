import React, { useState } from 'react';
import Icon from '../shared/Icon';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';

interface Props {
  onStepTraverse?: () => void;
}

const TraversalGuide: React.FC<Props> = ({ onStepTraverse }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isExpanded, setIsExpanded] = useState(false);

  const bgColor = isDark ? 'rgba(20, 20, 25, 0.8)' : '#ffffff';
  const textColor = isDark ? '#e0e0e0' : '#333';
  const borderColor = isDark ? '#333' : '#ddd';
  const headerBg = isDark ? 'rgba(30, 30, 40, 0.5)' : '#f8f9fa';
  const codeBg = isDark ? '#1a1a1f' : 'white';
  const accentColor = isDark ? '#4a9eff' : '#667eea';

  const algorithmSteps = [
    {
      step: 1,
      description: 'Initialize a Node* pointer variable (e.g., current) to point to the head of the list',
      code: 'Node* current = head;'
    },
    {
      step: 2,
      description: 'While the current pointer is not nullptr, continue the loop',
      code: 'while (current != nullptr) {'
    },
    {
      step: 3,
      description: 'Process the current node using the arrow operator (e.g., display its info field)',
      code: '  cout << current->info << " ";'
    },
    {
      step: 4,
      description: 'Move the pointer to the next node by following the link pointer',
      code: '  current = current->link;'
    },
    {
      step: 5,
      description: 'End the loop when current becomes nullptr (reached end of list)',
      code: '}'
    }
  ];

  const commonPatterns = [
    {
      name: 'Forward Traversal',
      description: 'Visit each node from head to tail sequentially',
      useCase: 'Displaying all elements, searching for a value, counting nodes'
    },
    {
      name: 'Traversal with Condition',
      description: 'Stop traversal when a condition is met',
      useCase: 'Finding a specific value, checking if list contains an element'
    },
    {
      name: 'Traversal to End',
      description: 'Traverse until reaching the last node (before NULL)',
      useCase: 'Inserting at the end, finding the tail of the list'
    }
  ];

  return (
    <div style={{
      background: bgColor,
      padding: '20px',
      borderRadius: '12px',
      border: `1px solid ${borderColor}`,
      margin: '20px 0'
    }}>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          marginBottom: isExpanded ? '15px' : 0
        }}
      >
        <h3 style={{ 
          margin: 0, 
          color: textColor,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Icon name="book" size={20} color={accentColor} />
          Traversal Guide
        </h3>
        {isExpanded ? <FiChevronUp size={20} color={textColor} /> : <FiChevronDown size={20} color={textColor} />}
      </div>

      {isExpanded && (
        <div>
          {/* What is Traversal Section */}
          <section style={{ marginBottom: '25px' }}>
            <h4 style={{ 
              color: accentColor, 
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Icon name="help" size={16} />
              What is Traversal?
            </h4>
            <p style={{ 
              color: isDark ? '#c0c0c0' : '#555', 
              lineHeight: '1.6',
              marginBottom: '10px'
            }}>
              Traversal is the process of visiting each node in a linked list exactly once. 
              It allows you to access and process every element in the list systematically.
            </p>
            <p style={{ 
              color: '#555', 
              lineHeight: '1.6',
              marginBottom: '10px'
            }}>
              In C++, we use <strong>Node*</strong> pointers to traverse the list. Each node is a 
              <strong> struct</strong> containing an <code>info</code> field (data) and a 
              <code>link</code> field (pointer to next node).
            </p>
            <p style={{ 
              color: '#555', 
              lineHeight: '1.6'
            }}>
              In a singly linked list, traversal always proceeds in one direction: from the head 
              (first node) to the tail (last node), following the link pointers using the arrow 
              operator (-&gt;).
            </p>
          </section>

          {/* Algorithm Steps */}
          <section style={{ marginBottom: '25px' }}>
            <h4 style={{ 
              color: accentColor, 
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Icon name="list" size={16} />
              Step-by-Step Traversal Algorithm
            </h4>
            <div style={{
              background: headerBg,
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '15px',
              border: `1px solid ${borderColor}`
            }}>
              {algorithmSteps.map((item) => (
                <div key={item.step} style={{ marginBottom: '15px' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}>
                    <div style={{
                      background: accentColor,
                      color: 'white',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      flexShrink: 0
                    }}>
                      {item.step}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ 
                        margin: 0, 
                        marginBottom: '5px',
                        color: textColor
                      }}>
                        {item.description}
                      </p>
                      {item.code && (
                        <code style={{
                          display: 'block',
                          background: codeBg,
                          padding: '8px',
                          borderRadius: '6px',
                          fontFamily: 'monospace',
                          fontSize: '13px',
                          color: isDark ? '#ff88aa' : '#d63384',
                          marginTop: '5px',
                          border: `1px solid ${borderColor}`
                        }}>
                          {item.code}
                        </code>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Complete Algorithm */}
            <div style={{
              background: headerBg,
              padding: '15px',
              borderRadius: '8px',
              border: `1px solid ${borderColor}`,
              marginBottom: '15px'
            }}>
              <h5 style={{ margin: '0 0 10px 0', color: textColor }}>
                Node Structure Definition (C++):
              </h5>
              <pre style={{
                margin: '0 0 15px 0',
                fontFamily: 'monospace',
                fontSize: '13px',
                color: isDark ? '#e0e0e0' : '#212529',
                background: codeBg,
                padding: '10px',
                borderRadius: '6px',
                overflowX: 'auto',
                border: `1px solid ${borderColor}`
              }}>
{`struct Node {
    int info;        // Data field
    Node* link;     // Pointer to next node
};`}
              </pre>
              <h5 style={{ margin: '0 0 10px 0', color: textColor }}>
                Complete C++ Traversal Function:
              </h5>
              <pre style={{
                margin: 0,
                fontFamily: 'monospace',
                fontSize: '13px',
                color: isDark ? '#e0e0e0' : '#212529',
                background: codeBg,
                padding: '10px',
                borderRadius: '6px',
                overflowX: 'auto',
                border: `1px solid ${borderColor}`
              }}>
{`void traverseList(Node* head) {
    Node* current = head;  // Pointer to traverse the list
    
    while (current != nullptr) {
        // Process current node's info field
        cout << current->info << " ";
        
        // Move pointer to next node via link field
        current = current->link;
    }
}`}
              </pre>
            </div>
          </section>

          {/* Common Patterns */}
          <section style={{ marginBottom: '25px' }}>
            <h4 style={{ 
              color: accentColor, 
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Icon name="target" size={16} />
              Common Traversal Patterns
            </h4>
            <div>
              {commonPatterns.map((pattern, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: headerBg,
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    border: `1px solid ${borderColor}`
                  }}
                >
                  <h5 style={{ 
                    margin: '0 0 8px 0', 
                    color: textColor,
                    fontSize: '14px'
                  }}>
                    {pattern.name}
                  </h5>
                  <p style={{ 
                    margin: '0 0 5px 0', 
                    color: isDark ? '#b0b0b0' : '#6c757d',
                    fontSize: '13px'
                  }}>
                    {pattern.description}
                  </p>
                  <p style={{ 
                    margin: 0, 
                    color: isDark ? '#999' : '#868e96',
                    fontSize: '12px',
                    fontStyle: 'italic'
                  }}>
                    Use case: {pattern.useCase}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Points */}
          <section>
            <h4 style={{ 
              color: accentColor, 
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Icon name="info" size={16} />
              Key Points to Remember
            </h4>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '20px',
              color: isDark ? '#c0c0c0' : '#555',
              lineHeight: '1.8'
            }}>
              <li>Always check if the list is empty (head == nullptr) before traversing</li>
              <li>Use Node* pointer type to traverse the list</li>
              <li>The loop condition checks if current is not nullptr</li>
              <li>Access struct members using the arrow operator (-&gt;): current-&gt;info and current-&gt;link</li>
              <li>Move to the next node using current = current-&gt;link</li>
              <li>Never modify the head pointer during traversal (use a temporary Node* pointer)</li>
              <li>Traversal stops automatically when current becomes nullptr</li>
              <li>In C++, use nullptr instead of NULL for null pointer constants</li>
              <li>Time complexity: O(n) where n is the number of nodes</li>
              <li>Space complexity: O(1) - only uses a constant amount of extra space for the pointer</li>
            </ul>
          </section>

          {onStepTraverse && (
            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: isDark ? 'rgba(74, 158, 255, 0.15)' : '#E3F2FD',
              borderRadius: '8px',
              border: `1px solid ${isDark ? 'rgba(74, 158, 255, 0.4)' : '#2196F3'}`
            }}>
              <button
                onClick={onStepTraverse}
                style={{
                  padding: '10px 20px',
                  background: isDark ? 'rgba(74, 158, 255, 0.3)' : '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isDark ? 'rgba(74, 158, 255, 0.4)' : '#1976D2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isDark ? 'rgba(74, 158, 255, 0.3)' : '#2196F3';
                }}
              >
                <Icon name="play" size={16} />
                Try Interactive Traversal
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TraversalGuide;

