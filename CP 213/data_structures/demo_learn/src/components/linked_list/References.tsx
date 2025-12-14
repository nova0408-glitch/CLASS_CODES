import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const References: React.FC = () => {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState<string | null>(null);

  const isDark = theme === 'dark';
  const bgColor = isDark ? 'rgba(20, 20, 25, 0.8)' : '#ffffff';
  const textColor = isDark ? '#e0e0e0' : '#333';
  const borderColor = isDark ? '#333' : '#ddd';
  const headerBg = isDark ? 'rgba(30, 30, 40, 0.9)' : '#f0f0f0';
  const linkColor = isDark ? '#4a9eff' : '#2196F3';

  const references = {
    complexity: {
      title: 'Time & Space Complexity',
      content: (
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ background: isDark ? 'rgba(40, 40, 50, 0.8)' : '#f0f0f0' }}>
                <th style={{ padding: '10px', textAlign: 'left', border: `1px solid ${borderColor}`, color: textColor }}>Operation</th>
                <th style={{ padding: '10px', textAlign: 'left', border: `1px solid ${borderColor}`, color: textColor }}>Time Complexity</th>
                <th style={{ padding: '10px', textAlign: 'left', border: `1px solid ${borderColor}`, color: textColor }}>Space Complexity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor }}>Insert at beginning</td>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor, fontFamily: 'monospace' }}>O(1)</td>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor, fontFamily: 'monospace' }}>O(1)</td>
              </tr>
              <tr style={{ background: isDark ? 'rgba(30, 30, 40, 0.5)' : '#fafafa' }}>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor }}>Insert at end</td>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor, fontFamily: 'monospace' }}>O(n)</td>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor, fontFamily: 'monospace' }}>O(1)</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor }}>Insert at position</td>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor, fontFamily: 'monospace' }}>O(n)</td>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor, fontFamily: 'monospace' }}>O(1)</td>
              </tr>
              <tr style={{ background: isDark ? 'rgba(30, 30, 40, 0.5)' : '#fafafa' }}>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor }}>Delete at beginning</td>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor, fontFamily: 'monospace' }}>O(1)</td>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor, fontFamily: 'monospace' }}>O(1)</td>
              </tr>
              <tr style={{ background: isDark ? 'rgba(30, 30, 40, 0.5)' : '#fafafa' }}>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor }}>Delete at end</td>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor, fontFamily: 'monospace' }}>O(n)</td>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor, fontFamily: 'monospace' }}>O(1)</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor }}>Search</td>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor, fontFamily: 'monospace' }}>O(n)</td>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor, fontFamily: 'monospace' }}>O(1)</td>
              </tr>
              <tr style={{ background: isDark ? 'rgba(30, 30, 40, 0.5)' : '#fafafa' }}>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor }}>Traversal</td>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor, fontFamily: 'monospace' }}>O(n)</td>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor, fontFamily: 'monospace' }}>O(1)</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor }}>Space for n nodes</td>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor, fontFamily: 'monospace' }}>-</td>
                <td style={{ padding: '8px', border: `1px solid ${borderColor}`, color: textColor, fontFamily: 'monospace' }}>O(n)</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    vsArray: {
      title: 'Linked List vs Array',
      content: (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <strong style={{ color: linkColor }}>Linked List Advantages:</strong>
            <ul style={{ marginLeft: '20px', marginTop: '8px', lineHeight: '1.8', color: isDark ? '#c0c0c0' : '#666' }}>
              <li>Dynamic size - grow/shrink as needed</li>
              <li>O(1) insertion/deletion at beginning</li>
              <li>No memory waste for unused elements</li>
              <li>Efficient memory usage (only allocates what's needed)</li>
            </ul>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <strong style={{ color: linkColor }}>Array Advantages:</strong>
            <ul style={{ marginLeft: '20px', marginTop: '8px', lineHeight: '1.8', color: isDark ? '#c0c0c0' : '#666' }}>
              <li>O(1) random access by index</li>
              <li>Better cache locality (elements close together)</li>
              <li>No extra memory for pointers</li>
              <li>Simpler implementation</li>
            </ul>
          </div>
          <div style={{
            background: isDark ? 'rgba(74, 158, 255, 0.1)' : '#E3F2FD',
            padding: '12px',
            borderRadius: '6px',
            border: `1px solid ${isDark ? 'rgba(74, 158, 255, 0.3)' : '#2196F3'}`
          }}>
            <strong style={{ color: linkColor }}>When to use Linked Lists:</strong>
            <p style={{ margin: '8px 0 0 0', color: isDark ? '#c0c0c0' : '#666' }}>
              Use when you frequently insert/delete at the beginning, size is unknown or variable, 
              and random access by index is not needed. Perfect for stacks, queues, and dynamic data.
            </p>
          </div>
        </div>
      )
    },
    resources: {
      title: 'Additional Resources',
      content: (
        <div>
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: linkColor }}>Key Concepts to Master:</strong>
            <ul style={{ marginLeft: '20px', marginTop: '8px', lineHeight: '1.8', color: isDark ? '#c0c0c0' : '#666' }}>
              <li>Pointer arithmetic and dereferencing</li>
              <li>Memory allocation (new/delete)</li>
              <li>Arrow operator (-&gt;) vs dot operator (.)</li>
              <li>Null pointer handling</li>
              <li>Memory leak prevention</li>
            </ul>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: linkColor }}>Common Patterns:</strong>
            <ul style={{ marginLeft: '20px', marginTop: '8px', lineHeight: '1.8', color: isDark ? '#c0c0c0' : '#666' }}>
              <li>Two-pointer technique (fast/slow)</li>
              <li>Dummy head node for easier manipulation</li>
              <li>Recursive traversal</li>
              <li>Reverse linked list</li>
            </ul>
          </div>
          <div style={{
            background: isDark ? 'rgba(100, 100, 110, 0.3)' : '#f5f5f5',
            padding: '12px',
            borderRadius: '6px',
            border: `1px solid ${borderColor}`
          }}>
            <strong style={{ color: linkColor }}>Practice Exercises:</strong>
            <p style={{ margin: '8px 0 0 0', color: isDark ? '#c0c0c0' : '#666' }}>
              Implement: reverse list, find middle element, detect cycle, merge two sorted lists, 
              remove duplicates. These patterns appear frequently in coding interviews!
            </p>
          </div>
        </div>
      )
    }
  };

  return (
    <div style={{
      background: bgColor,
      padding: '20px',
      borderRadius: '12px',
      border: `1px solid ${borderColor}`,
      marginBottom: '20px'
    }}>
      <h3 style={{
        color: textColor,
        marginBottom: '15px',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        Quick References
      </h3>

      {Object.entries(references).map(([key, ref]) => (
        <div
          key={key}
          style={{
            marginBottom: '15px',
            border: `1px solid ${borderColor}`,
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        >
          <div
            onClick={() => setExpanded(expanded === key ? null : key)}
            style={{
              background: headerBg,
              padding: '12px 15px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span style={{ color: textColor, fontWeight: '600' }}>{ref.title}</span>
            {expanded === key ? <FiChevronUp size={18} color={textColor} /> : <FiChevronDown size={18} color={textColor} />}
          </div>

          {expanded === key && (
            <div style={{
              padding: '15px',
              borderTop: `1px solid ${borderColor}`
            }}>
              {ref.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default References;
