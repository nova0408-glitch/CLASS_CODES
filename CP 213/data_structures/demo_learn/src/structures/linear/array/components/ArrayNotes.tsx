import React, { useState } from 'react';
import Icon from '../../../../components/shared/Icon';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ArrayNotes: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Icon name="book" size={20} color="#667eea" />
          Array Notes & Summary
        </h3>
        {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
      </div>

      {isExpanded && (
        <div>
          <section style={{ marginBottom: '25px' }}>
            <h4 style={{ 
              color: '#667eea', 
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Icon name="help" size={16} />
              What is an Array?
            </h4>
            <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '10px' }}>
              An <strong>array</strong> is a collection of elements stored in <strong>contiguous memory locations</strong>. 
              Each element can be accessed directly using its <strong>index</strong> (position in the array).
            </p>
            <ul style={{ marginLeft: '20px', color: '#555', lineHeight: '1.8' }}>
              <li><strong>Index:</strong> Position of element (starts at 0 in C++)</li>
              <li><strong>Size:</strong> Number of elements currently in the array</li>
              <li><strong>Capacity:</strong> Maximum number of elements the array can hold</li>
              <li><strong>Random Access:</strong> O(1) time complexity to access any element</li>
            </ul>
          </section>

          <section style={{ marginBottom: '25px' }}>
            <h4 style={{ 
              color: '#667eea', 
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Icon name="code" size={16} />
              Array Declaration in C++
            </h4>
            <div style={{
              background: '#f8f9fa',
              padding: '15px',
              borderRadius: '6px',
              border: '1px solid #dee2e6'
            }}>
              <pre style={{
                margin: 0,
                fontFamily: 'monospace',
                fontSize: '13px',
                color: '#212529',
                background: 'white',
                padding: '10px',
                borderRadius: '4px',
                overflowX: 'auto'
              }}>
{`// Static array
int arr[10];  // Array of 10 integers

// Dynamic array
int* arr = new int[10];
// ... use array ...
delete[] arr;  // Free memory

// Initialize array
int arr[5] = {10, 20, 30, 40, 50};`}
              </pre>
            </div>
          </section>

          <section style={{ marginBottom: '25px' }}>
            <h4 style={{ 
              color: '#667eea', 
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Icon name="list" size={16} />
              Key Operations
            </h4>
            <div style={{ marginBottom: '15px' }}>
              <h5 style={{ color: '#495057', marginBottom: '8px', fontSize: '14px' }}>
                Access: O(1)
              </h5>
              <code style={{ background: '#f8f9fa', padding: '4px 8px', borderRadius: '4px' }}>
                value = arr[index];
              </code>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <h5 style={{ color: '#495057', marginBottom: '8px', fontSize: '14px' }}>
                Insert: O(n) - requires shifting
              </h5>
              <code style={{ background: '#f8f9fa', padding: '4px 8px', borderRadius: '4px' }}>
                // Shift elements right, then insert
              </code>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <h5 style={{ color: '#495057', marginBottom: '8px', fontSize: '14px' }}>
                Delete: O(n) - requires shifting
              </h5>
              <code style={{ background: '#f8f9fa', padding: '4px 8px', borderRadius: '4px' }}>
                // Shift elements left after deletion
              </code>
            </div>
            <div>
              <h5 style={{ color: '#495057', marginBottom: '8px', fontSize: '14px' }}>
                Search: O(n) - linear search
              </h5>
              <code style={{ background: '#f8f9fa', padding: '4px 8px', borderRadius: '4px' }}>
                {`for (int i = 0; i < size; i++) if (arr[i] == target) return i;`}
              </code>
            </div>
          </section>

          <section>
            <h4 style={{ 
              color: '#667eea', 
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Icon name="info" size={16} />
              Important Concepts
            </h4>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '20px',
              color: '#555',
              lineHeight: '1.8'
            }}>
              <li><strong>Contiguous Memory:</strong> Elements stored in adjacent memory locations</li>
              <li><strong>Zero-Based Indexing:</strong> First element is at index 0</li>
              <li><strong>Fixed Size (Static):</strong> Size determined at compile time</li>
              <li><strong>Dynamic Arrays:</strong> Can resize using new/delete in C++</li>
              <li><strong>Cache Friendly:</strong> Sequential access is very fast</li>
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};

export default ArrayNotes;

