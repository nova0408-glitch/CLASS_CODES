import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useFont } from '../../contexts/FontContext';
import { FiChevronDown, FiChevronUp, FiTrendingUp } from 'react-icons/fi';

const BigONotation: React.FC = () => {
  const { theme } = useTheme();
  const { uiFont, codeFont } = useFont();
  const [expanded, setExpanded] = useState<string | null>('operations');

  const isDark = theme === 'dark';
  const bgColor = isDark 
    ? 'rgba(20, 20, 30, 0.7)' 
    : 'rgba(255, 255, 255, 0.25)';
  const textColor = isDark ? '#e0e0e0' : '#333';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)';
  const headerBg = isDark ? 'rgba(30, 30, 40, 0.6)' : 'rgba(240, 240, 240, 0.4)';
  const accentColor = isDark ? '#4a9eff' : '#2196F3';

  const operations = [
    { name: 'Insert at Beginning', time: 'O(1)', space: 'O(1)', explanation: 'Direct head update, no traversal needed' },
    { name: 'Insert at End', time: 'O(n)', space: 'O(1)', explanation: 'Must traverse to last node (n steps)' },
    { name: 'Insert at Position', time: 'O(n)', space: 'O(1)', explanation: 'Traverse to position (average n/2 steps)' },
    { name: 'Delete at Beginning', time: 'O(1)', space: 'O(1)', explanation: 'Direct head update, no traversal' },
    { name: 'Delete at End', time: 'O(n)', space: 'O(1)', explanation: 'Traverse to second-to-last node' },
    { name: 'Delete at Position', time: 'O(n)', space: 'O(1)', explanation: 'Traverse to position before deletion' },
    { name: 'Search', time: 'O(n)', space: 'O(1)', explanation: 'Worst case: traverse entire list' },
    { name: 'Access by Index', time: 'O(n)', space: 'O(1)', explanation: 'Must traverse from head to index' },
    { name: 'Traverse', time: 'O(n)', space: 'O(1)', explanation: 'Visit each node once' },
    { name: 'Find Length', time: 'O(n)', space: 'O(1)', explanation: 'Count nodes by traversing' },
  ];

  const sortingAlgorithms = [
    {
      name: 'Bubble Sort',
      time: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
      space: 'O(1)',
      stable: 'Yes',
      explanation: 'Compare adjacent elements, swap if needed. Repeat until sorted.'
    },
    {
      name: 'Selection Sort',
      time: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
      space: 'O(1)',
      stable: 'No',
      explanation: 'Find minimum, swap with first unsorted position.'
    },
    {
      name: 'Insertion Sort',
      time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      space: 'O(1)',
      stable: 'Yes',
      explanation: 'Build sorted list one element at a time by inserting in correct position.'
    },
    {
      name: 'Merge Sort',
      time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
      space: 'O(n)',
      stable: 'Yes',
      explanation: 'Divide list in half recursively, merge sorted halves.'
    },
    {
      name: 'Quick Sort',
      time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
      space: 'O(log n)',
      stable: 'No',
      explanation: 'Pick pivot, partition around pivot, recursively sort partitions.'
    }
  ];

  const complexityInfo = {
    operations: {
      title: 'Operation Time Complexities',
      icon: '⚡',
      content: (
        <div>
          <p style={{ marginBottom: '20px', lineHeight: '1.7', color: isDark ? '#d0d0d0' : '#555', fontFamily: uiFont }}>
            Big O notation describes how an algorithm's runtime grows as input size increases. 
            For linked lists, most operations depend on list length (n).
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ background: headerBg, backdropFilter: 'blur(10px)' }}>
                <th style={{ padding: '12px', textAlign: 'left', border: `1px solid ${borderColor}`, color: textColor, fontFamily: uiFont }}>Operation</th>
                <th style={{ padding: '12px', textAlign: 'center', border: `1px solid ${borderColor}`, color: textColor, fontFamily: codeFont }}>Time</th>
                <th style={{ padding: '12px', textAlign: 'center', border: `1px solid ${borderColor}`, color: textColor, fontFamily: codeFont }}>Space</th>
                <th style={{ padding: '12px', textAlign: 'left', border: `1px solid ${borderColor}`, color: textColor, fontFamily: uiFont }}>Explanation</th>
              </tr>
            </thead>
            <tbody>
              {operations.map((op, idx) => (
                <tr 
                  key={idx}
                  style={{ 
                    background: idx % 2 === 0 
                      ? (isDark ? 'rgba(30, 30, 40, 0.3)' : 'rgba(250, 250, 250, 0.3)')
                      : 'transparent'
                  }}
                >
                  <td style={{ padding: '10px', border: `1px solid ${borderColor}`, color: textColor, fontFamily: uiFont }}>{op.name}</td>
                  <td style={{ 
                    padding: '10px', 
                    border: `1px solid ${borderColor}`, 
                    color: op.time === 'O(1)' ? (isDark ? '#4ade80' : '#10b981') : accentColor,
                    fontFamily: codeFont,
                    fontWeight: '600',
                    textAlign: 'center'
                  }}>
                    {op.time}
                  </td>
                  <td style={{ 
                    padding: '10px', 
                    border: `1px solid ${borderColor}`, 
                    color: op.space === 'O(1)' ? (isDark ? '#4ade80' : '#10b981') : accentColor,
                    fontFamily: codeFont,
                    fontWeight: '600',
                    textAlign: 'center'
                  }}>
                    {op.space}
                  </td>
                  <td style={{ padding: '10px', border: `1px solid ${borderColor}`, color: isDark ? '#b0b0b0' : '#666', fontSize: '13px', fontFamily: uiFont }}>{op.explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
    sorting: {
      title: 'Sorting Algorithm Complexities',
      icon: '🔄',
      content: (
        <div>
          <p style={{ marginBottom: '20px', lineHeight: '1.7', color: isDark ? '#d0d0d0' : '#555', fontFamily: uiFont }}>
            Sorting linked lists requires different algorithms than arrays due to lack of random access. 
            Here are common sorting algorithms and their complexities:
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ background: headerBg, backdropFilter: 'blur(10px)' }}>
                <th style={{ padding: '12px', textAlign: 'left', border: `1px solid ${borderColor}`, color: textColor, fontFamily: uiFont }}>Algorithm</th>
                <th style={{ padding: '12px', textAlign: 'center', border: `1px solid ${borderColor}`, color: textColor, fontFamily: codeFont }}>Best Time</th>
                <th style={{ padding: '12px', textAlign: 'center', border: `1px solid ${borderColor}`, color: textColor, fontFamily: codeFont }}>Average Time</th>
                <th style={{ padding: '12px', textAlign: 'center', border: `1px solid ${borderColor}`, color: textColor, fontFamily: codeFont }}>Worst Time</th>
                <th style={{ padding: '12px', textAlign: 'center', border: `1px solid ${borderColor}`, color: textColor, fontFamily: codeFont }}>Space</th>
                <th style={{ padding: '12px', textAlign: 'center', border: `1px solid ${borderColor}`, color: textColor, fontFamily: uiFont }}>Stable</th>
              </tr>
            </thead>
            <tbody>
              {sortingAlgorithms.map((alg, idx) => (
                <tr 
                  key={idx}
                  style={{ 
                    background: idx % 2 === 0 
                      ? (isDark ? 'rgba(30, 30, 40, 0.3)' : 'rgba(250, 250, 250, 0.3)')
                      : 'transparent'
                  }}
                >
                  <td style={{ padding: '10px', border: `1px solid ${borderColor}`, color: textColor, fontFamily: uiFont, fontWeight: '600' }}>{alg.name}</td>
                  <td style={{ 
                    padding: '10px', 
                    border: `1px solid ${borderColor}`, 
                    color: alg.time.best.includes('n²') ? (isDark ? '#f87171' : '#ef4444') : (isDark ? '#4ade80' : '#10b981'),
                    fontFamily: codeFont,
                    fontWeight: '600',
                    textAlign: 'center'
                  }}>
                    {alg.time.best}
                  </td>
                  <td style={{ 
                    padding: '10px', 
                    border: `1px solid ${borderColor}`, 
                    color: alg.time.average.includes('n²') ? (isDark ? '#f87171' : '#ef4444') : (isDark ? '#4ade80' : '#10b981'),
                    fontFamily: codeFont,
                    fontWeight: '600',
                    textAlign: 'center'
                  }}>
                    {alg.time.average}
                  </td>
                  <td style={{ 
                    padding: '10px', 
                    border: `1px solid ${borderColor}`, 
                    color: alg.time.worst.includes('n²') ? (isDark ? '#f87171' : '#ef4444') : (isDark ? '#4ade80' : '#10b981'),
                    fontFamily: codeFont,
                    fontWeight: '600',
                    textAlign: 'center'
                  }}>
                    {alg.time.worst}
                  </td>
                  <td style={{ 
                    padding: '10px', 
                    border: `1px solid ${borderColor}`, 
                    color: alg.space === 'O(1)' ? (isDark ? '#4ade80' : '#10b981') : accentColor,
                    fontFamily: codeFont,
                    fontWeight: '600',
                    textAlign: 'center'
                  }}>
                    {alg.space}
                  </td>
                  <td style={{ 
                    padding: '10px', 
                    border: `1px solid ${borderColor}`, 
                    color: alg.stable === 'Yes' ? (isDark ? '#4ade80' : '#10b981') : (isDark ? '#f87171' : '#ef4444'),
                    fontFamily: uiFont,
                    textAlign: 'center',
                    fontWeight: '600'
                  }}>
                    {alg.stable}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{
            background: isDark ? 'rgba(74, 158, 255, 0.15)' : '#E3F2FD',
            padding: '15px',
            borderRadius: '10px',
            border: `1px solid ${isDark ? 'rgba(74, 158, 255, 0.4)' : '#2196F3'}`,
            marginTop: '20px'
          }}>
            <strong style={{ color: accentColor, fontFamily: uiFont }}>Key Insights:</strong>
            <ul style={{ marginTop: '10px', marginLeft: '20px', lineHeight: '1.8', color: isDark ? '#c0c0c0' : '#666', fontFamily: uiFont }}>
              <li><strong>Merge Sort</strong> is often preferred for linked lists (O(n log n) guaranteed)</li>
              <li><strong>Quick Sort</strong> works well on average but has O(n²) worst case</li>
              <li><strong>Insertion Sort</strong> is simple and efficient for nearly-sorted lists (O(n) best case)</li>
              <li><strong>Bubble/Selection Sort</strong> are educational but inefficient (O(n²))</li>
            </ul>
          </div>
        </div>
      )
    },
    examples: {
      title: 'Complexity Examples',
      icon: '📊',
      content: (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: accentColor, marginBottom: '12px', fontFamily: uiFont }}>O(1) - Constant Time</h4>
            <p style={{ color: isDark ? '#c0c0c0' : '#666', marginBottom: '10px', fontFamily: uiFont }}>
              Execution time doesn't depend on list size. Perfect!
            </p>
            <pre style={{
              background: isDark ? '#1a1a1f' : '#f8f9fa',
              padding: '15px',
              borderRadius: '8px',
              border: `1px solid ${borderColor}`,
              color: isDark ? '#e0e0e0' : '#333',
              fontFamily: codeFont,
              fontSize: '13px',
              overflowX: 'auto'
            }}>
{`// Insert at beginning - O(1)
Node* newNode = new Node;
newNode->data = value;
newNode->next = head;
head = newNode;  // Always 4 operations!`}
            </pre>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: accentColor, marginBottom: '12px', fontFamily: uiFont }}>O(n) - Linear Time</h4>
            <p style={{ color: isDark ? '#c0c0c0' : '#666', marginBottom: '10px', fontFamily: uiFont }}>
              Execution time grows linearly with list size. Good for small-medium lists.
            </p>
            <pre style={{
              background: isDark ? '#1a1a1f' : '#f8f9fa',
              padding: '15px',
              borderRadius: '8px',
              border: `1px solid ${borderColor}`,
              color: isDark ? '#e0e0e0' : '#333',
              fontFamily: codeFont,
              fontSize: '13px',
              overflowX: 'auto'
            }}>
{`// Search - O(n) worst case
Node* current = head;
while (current != nullptr) {
    if (current->data == target) 
        return true;
    current = current->next;  // Visit each node
}
return false;  // Could check all n nodes`}
            </pre>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: accentColor, marginBottom: '12px', fontFamily: uiFont }}>O(n²) - Quadratic Time</h4>
            <p style={{ color: isDark ? '#c0c0c0' : '#666', marginBottom: '10px', fontFamily: uiFont }}>
              Execution time grows quadratically. Slow for large lists - avoid if possible!
            </p>
            <pre style={{
              background: isDark ? '#1a1a1f' : '#f8f9fa',
              padding: '15px',
              borderRadius: '8px',
              border: `1px solid ${borderColor}`,
              color: isDark ? '#e0e0e0' : '#333',
              fontFamily: codeFont,
              fontSize: '13px',
              overflowX: 'auto'
            }}>
{`// Bubble Sort - O(n²)
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n-i-1; j++) {
        // Compare and swap
        // n iterations × n iterations = n²`}
            </pre>
          </div>

          <div>
            <h4 style={{ color: accentColor, marginBottom: '12px', fontFamily: uiFont }}>O(n log n) - Linearithmic Time</h4>
            <p style={{ color: isDark ? '#c0c0c0' : '#666', marginBottom: '10px', fontFamily: uiFont }}>
              Much better than O(n²)! Best general-purpose sorting complexity.
            </p>
            <pre style={{
              background: isDark ? '#1a1a1f' : '#f8f9fa',
              padding: '15px',
              borderRadius: '8px',
              border: `1px solid ${borderColor}`,
              color: isDark ? '#e0e0e0' : '#333',
              fontFamily: codeFont,
              fontSize: '13px',
              overflowX: 'auto'
            }}>
{`// Merge Sort - O(n log n)
// Divide: log n levels
// Merge: n operations per level
// Total: n × log n = O(n log n)`}
            </pre>
          </div>
        </div>
      )
    }
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
      boxShadow: isDark ? '0 8px 32px 0 rgba(0, 0, 0, 0.3)' : '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
      fontFamily: uiFont
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <FiTrendingUp size={24} color={accentColor} />
        <h3 style={{
          color: textColor,
          fontSize: '20px',
          fontWeight: '700',
          margin: 0,
          fontFamily: uiFont
        }}>
          Big O Notation & Complexities
        </h3>
      </div>

      {Object.entries(complexityInfo).map(([key, section]) => (
        <div
          key={key}
          style={{
            marginBottom: '15px',
            border: `1px solid ${borderColor}`,
            borderRadius: '12px',
            overflow: 'hidden',
            background: headerBg,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
        >
          <div
            onClick={() => setExpanded(expanded === key ? null : key)}
            style={{
              padding: '15px 18px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark 
                ? 'rgba(40, 40, 50, 0.8)' 
                : 'rgba(250, 250, 250, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = headerBg;
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>{section.icon}</span>
              <span style={{ color: textColor, fontWeight: '600', fontSize: '16px', fontFamily: uiFont }}>
                {section.title}
              </span>
            </div>
            {expanded === key ? <FiChevronUp size={18} color={textColor} /> : <FiChevronDown size={18} color={textColor} />}
          </div>

          {expanded === key && (
            <div style={{
              padding: '20px',
              borderTop: `1px solid ${borderColor}`,
              background: isDark ? 'rgba(15, 15, 20, 0.5)' : 'rgba(255, 255, 255, 0.15)',
              fontFamily: uiFont
            }}>
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BigONotation;
