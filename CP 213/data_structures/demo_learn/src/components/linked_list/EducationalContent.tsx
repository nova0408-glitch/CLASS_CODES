import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useFont } from '../../contexts/FontContext';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const EducationalContent: React.FC = () => {
  const { theme } = useTheme();
  const { uiFont } = useFont();
  const [expanded, setExpanded] = useState<string | null>('analogy');

  const isDark = theme === 'dark';
  const bgColor = isDark 
    ? 'rgba(20, 20, 30, 0.7)' 
    : 'rgba(255, 255, 255, 0.25)';
  const textColor = isDark ? '#e0e0e0' : '#333';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)';
  const headerBg = isDark ? 'rgba(30, 30, 40, 0.6)' : 'rgba(240, 240, 240, 0.4)';
  const accentColor = isDark ? '#4a9eff' : '#2196F3';

  const sections = {
    analogy: {
      title: 'Restaurant Waiter Analogy',
      icon: '🍽️',
      content: (
        <div>
          <p style={{ marginBottom: '15px', lineHeight: '1.7', color: isDark ? '#d0d0d0' : '#555' }}>
            Think of a linked list like a restaurant where tables are scattered throughout the building, 
            and a waiter needs to move between them to serve customers.
          </p>
          
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: accentColor }}>Tables = Nodes:</strong>
            <p style={{ marginLeft: '20px', color: isDark ? '#c0c0c0' : '#666', marginTop: '5px' }}>
              Each table (node) has:
            </p>
            <ul style={{ marginLeft: '40px', color: isDark ? '#c0c0c0' : '#666', lineHeight: '1.8' }}>
              <li><strong>Order (info/data):</strong> What the customer wants</li>
              <li><strong>Next Table Card (link/pointer):</strong> Directions to the next table to visit</li>
            </ul>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: accentColor }}>Head Waiter (head pointer):</strong>
            <p style={{ marginLeft: '20px', color: isDark ? '#c0c0c0' : '#666', marginTop: '5px' }}>
              The head pointer is like the head waiter who knows which table to start from. 
              They follow the "next table" cards to visit each table in sequence.
            </p>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: accentColor }}>Why This Structure?</strong>
            <p style={{ marginLeft: '20px', color: isDark ? '#c0c0c0' : '#666', marginTop: '5px' }}>
              Just like tables can be added or removed anywhere in a restaurant without moving others, 
              linked list nodes can be inserted or deleted efficiently. You don't need to shift everything 
              like in an array - you just update the "directions" (pointers)!
            </p>
          </div>

          <div style={{
            background: isDark ? 'rgba(74, 158, 255, 0.1)' : '#E3F2FD',
            padding: '12px',
            borderRadius: '6px',
            border: `1px solid ${isDark ? 'rgba(74, 158, 255, 0.3)' : '#2196F3'}`,
            marginTop: '15px'
          }}>
            <strong style={{ color: accentColor }}>Real-world benefit:</strong>
            <p style={{ margin: '5px 0 0 0', color: isDark ? '#c0c0c0' : '#666' }}>
              When a new customer arrives, the waiter can be directed to a new table without reorganizing 
              the entire restaurant layout - just update the pointer chain!
            </p>
          </div>
        </div>
      )
    },
    games: {
      title: 'Game Development Use Cases',
      icon: '🎮',
      content: (
        <div>
          <p style={{ marginBottom: '15px', lineHeight: '1.7', color: isDark ? '#d0d0d0' : '#555' }}>
            Linked lists are extensively used in game development for dynamic, frequently-changing data.
          </p>

          <div style={{ marginBottom: '20px' }}>
            <strong style={{ color: accentColor }}>1. Enemy Management</strong>
            <p style={{ marginLeft: '20px', color: isDark ? '#c0c0c0' : '#666', marginTop: '5px' }}>
              In a shooter game, enemies spawn and die constantly. A linked list stores active enemies:
            </p>
            <ul style={{ marginLeft: '40px', color: isDark ? '#c0c0c0' : '#666', lineHeight: '1.8' }}>
              <li>When enemy dies: Remove node in O(1) if you have pointer to it</li>
              <li>When enemy spawns: Add node at any position easily</li>
              <li>Traverse through all active enemies to update AI, physics, rendering</li>
            </ul>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <strong style={{ color: accentColor }}>2. Particle Systems</strong>
            <p style={{ marginLeft: '20px', color: isDark ? '#c0c0c0' : '#666', marginTop: '5px' }}>
              Explosions, magic effects, fire - particles appear and disappear rapidly:
            </p>
            <ul style={{ marginLeft: '40px', color: isDark ? '#c0c0c0' : '#666', lineHeight: '1.8' }}>
              <li>Each particle is a node with position, velocity, lifetime</li>
              <li>Remove dead particles by updating pointers</li>
              <li>Memory efficient - no wasted space for inactive particles</li>
            </ul>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <strong style={{ color: accentColor }}>3. Inventory Systems</strong>
            <p style={{ marginLeft: '20px', color: isDark ? '#c0c0c0' : '#666', marginTop: '5px' }}>
              Player inventory where items are added/removed dynamically:
            </p>
            <ul style={{ marginLeft: '40px', color: isDark ? '#c0c0c0' : '#666', lineHeight: '1.8' }}>
              <li>Add items anywhere without shifting other items</li>
              <li>Remove items efficiently</li>
              <li>Traverse to display inventory UI</li>
            </ul>
          </div>

          <div style={{
            background: isDark ? 'rgba(74, 158, 255, 0.1)' : '#E3F2FD',
            padding: '12px',
            borderRadius: '6px',
            border: `1px solid ${isDark ? 'rgba(74, 158, 255, 0.3)' : '#2196F3'}`,
            marginTop: '15px'
          }}>
            <strong style={{ color: accentColor }}>Why linked lists for games?</strong>
            <p style={{ margin: '5px 0 0 0', color: isDark ? '#c0c0c0' : '#666' }}>
              Games need O(1) insertion/deletion, dynamic sizing, and efficient traversal - 
              all strengths of linked lists. Arrays would require shifting elements, wasting performance.
            </p>
          </div>
        </div>
      )
    },
    pointers: {
      title: 'Pointers & Memory Management',
      icon: '🔗',
      content: (
        <div>
          <p style={{ marginBottom: '15px', lineHeight: '1.7', color: isDark ? '#d0d0d0' : '#555' }}>
            Pointers are the foundation of linked lists. They enable dynamic memory allocation and 
            create connections between nodes stored in different memory locations.
          </p>

          <div style={{ marginBottom: '20px' }}>
            <strong style={{ color: accentColor }}>What is a Pointer?</strong>
            <p style={{ marginLeft: '20px', color: isDark ? '#c0c0c0' : '#666', marginTop: '5px' }}>
              A pointer stores the memory address of another variable. In linked lists:
            </p>
            <ul style={{ marginLeft: '40px', color: isDark ? '#c0c0c0' : '#666', lineHeight: '1.8' }}>
              <li><code style={{ background: isDark ? '#1a1a1f' : '#f0f0f0', padding: '2px 6px', borderRadius: '3px' }}>Node*</code> - Pointer to a Node struct</li>
              <li><code style={{ background: isDark ? '#1a1a1f' : '#f0f0f0', padding: '2px 6px', borderRadius: '3px' }}>head</code> - Points to first node</li>
              <li><code style={{ background: isDark ? '#1a1a1f' : '#f0f0f0', padding: '2px 6px', borderRadius: '3px' }}>node-&gt;link</code> - Points to next node</li>
            </ul>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <strong style={{ color: accentColor }}>Memory Allocation</strong>
            <p style={{ marginLeft: '20px', color: isDark ? '#c0c0c0' : '#666', marginTop: '5px' }}>
              Nodes are created dynamically on the heap:
            </p>
            <div style={{
              background: isDark ? '#1a1a1f' : '#f8f9fa',
              padding: '12px',
              borderRadius: '6px',
              marginTop: '8px',
              fontFamily: 'monospace',
              fontSize: '13px',
              color: isDark ? '#e0e0e0' : '#212529'
            }}>
              <div>Node* newNode = new Node;  // Allocate memory</div>
              <div>newNode-&gt;data = 10;      // Set data</div>
              <div>newNode-&gt;link = nullptr; // Initialize link</div>
              <div style={{ marginTop: '10px', color: accentColor }}>// Later...</div>
              <div>delete newNode;             // Free memory</div>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <strong style={{ color: accentColor }}>Why Pointers Matter</strong>
            <ul style={{ marginLeft: '20px', color: isDark ? '#c0c0c0' : '#666', lineHeight: '1.8' }}>
              <li><strong>Non-contiguous storage:</strong> Nodes don't need to be next to each other in memory</li>
              <li><strong>Dynamic size:</strong> Allocate nodes as needed, no pre-defined size</li>
              <li><strong>Efficient insertion/deletion:</strong> Just update pointers, no shifting</li>
              <li><strong>Memory management:</strong> You control when memory is allocated/freed</li>
            </ul>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <strong style={{ color: accentColor }}>Common Pointer Operations</strong>
            <div style={{
              background: isDark ? '#1a1a1f' : '#f8f9fa',
              padding: '12px',
              borderRadius: '6px',
              marginTop: '8px',
              fontFamily: 'monospace',
              fontSize: '13px',
              color: isDark ? '#e0e0e0' : '#212529'
            }}>
              <div>Node* current = head;           // Copy pointer</div>
              <div>current = current-&gt;link;      // Follow pointer</div>
              <div>current-&gt;data = 42;           // Access data via arrow</div>
              <div>(*current).data = 42;           // Alternative syntax</div>
              <div>current = nullptr;              // Null pointer</div>
            </div>
          </div>

          <div style={{
            background: isDark ? 'rgba(255, 100, 100, 0.15)' : '#FFEBEE',
            padding: '12px',
            borderRadius: '6px',
            border: `1px solid ${isDark ? 'rgba(255, 100, 100, 0.4)' : '#F44336'}`,
            marginTop: '15px'
          }}>
            <strong style={{ color: isDark ? '#ff6b6b' : '#d32f2f' }}>⚠️ Memory Leak Warning:</strong>
            <p style={{ margin: '5px 0 0 0', color: isDark ? '#ff9999' : '#c62828' }}>
              Always <code style={{ background: isDark ? '#2a1a1a' : '#fff', padding: '2px 6px', borderRadius: '3px' }}>delete</code> nodes before 
              losing their pointers, or you'll have memory leaks! In the visualization, lost nodes show this problem.
            </p>
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
      boxShadow: isDark ? '0 8px 32px 0 rgba(0, 0, 0, 0.3)' : '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{
        color: textColor,
        marginBottom: '15px',
        fontSize: '18px',
        fontWeight: '600',
        fontFamily: uiFont
      }}>
        Educational Concepts
      </h3>

      {Object.entries(sections).map(([key, section]) => (
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
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
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
              <span style={{ color: textColor, fontWeight: '600', fontFamily: uiFont }}>{section.title}</span>
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

export default EducationalContent;
