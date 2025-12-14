import React from 'react';
import { DataStructure } from '../../structures/base/StructureInterface';

interface Props {
  structures: DataStructure[];
  currentStructureId: string | null;
  onSelectStructure: (structureId: string) => void;
}

const StructureSelector: React.FC<Props> = ({ 
  structures, 
  currentStructureId, 
  onSelectStructure 
}) => {
  const linearStructures = structures.filter(s => s.category === 'linear');
  const nonLinearStructures = structures.filter(s => s.category === 'non-linear');

  const renderStructureCard = (structure: DataStructure) => {
    const isActive = currentStructureId === structure.id;
    const isAvailable = structure.available;

    return (
      <div
        key={structure.id}
        onClick={() => isAvailable && onSelectStructure(structure.id)}
        style={{
          background: isActive ? '#E3F2FD' : isAvailable ? '#f8f9fa' : '#e9ecef',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '10px',
          border: isActive ? '2px solid #2196F3' : '1px solid #ddd',
          cursor: isAvailable ? 'pointer' : 'not-allowed',
          opacity: isAvailable ? 1 : 0.6,
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          if (isAvailable) {
            e.currentTarget.style.background = isActive ? '#BBDEFB' : '#e9ecef';
          }
        }}
        onMouseLeave={(e) => {
          if (isAvailable) {
            e.currentTarget.style.background = isActive ? '#E3F2FD' : '#f8f9fa';
          }
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ 
              margin: 0, 
              marginBottom: '5px', 
              color: isActive ? '#1976D2' : '#333',
              fontWeight: isActive ? 'bold' : 'normal'
            }}>
              {structure.name}
            </h4>
            <p style={{ 
              margin: 0, 
              fontSize: '12px', 
              color: '#666' 
            }}>
              {structure.description}
            </p>
          </div>
          {!isAvailable && (
            <span style={{ 
              fontSize: '10px', 
              color: '#999',
              fontStyle: 'italic'
            }}>
              Coming Soon
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      margin: '20px 0'
    }}>
      <h2 style={{ 
        marginBottom: '20px', 
        color: '#333',
        textAlign: 'center'
      }}>
        Data Structures Learning Platform
      </h2>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          color: '#667eea', 
          marginBottom: '15px',
          borderBottom: '2px solid #667eea',
          paddingBottom: '5px'
        }}>
          Linear Data Structures
        </h3>
        <p style={{ 
          fontSize: '12px', 
          color: '#666', 
          marginBottom: '15px',
          fontStyle: 'italic'
        }}>
          Elements are arranged in a sequential manner. Each element has a unique predecessor and successor (except first and last).
        </p>
        {linearStructures.map(renderStructureCard)}
      </div>

      <div>
        <h3 style={{ 
          color: '#764ba2', 
          marginBottom: '15px',
          borderBottom: '2px solid #764ba2',
          paddingBottom: '5px'
        }}>
          Non-Linear Data Structures
        </h3>
        <p style={{ 
          fontSize: '12px', 
          color: '#666', 
          marginBottom: '15px',
          fontStyle: 'italic'
        }}>
          Elements are not arranged sequentially. Elements can have multiple predecessors and successors.
        </p>
        {nonLinearStructures.map(renderStructureCard)}
      </div>
    </div>
  );
};

export default StructureSelector;

