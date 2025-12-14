import { useState, useEffect } from 'react';
import StructureSelector from './components/shared/StructureSelector';
import { StructureRegistry } from './structures/base/StructureInterface';
import { linkedListStructure } from './structures/linear/linked_list';
import { arrayStructure } from './structures/linear/array';
import { stackStructure } from './structures/linear/stack';
import { queueStructure } from './structures/linear/queue';
import { binaryTreeStructure } from './structures/non_linear/tree';
import { graphStructure } from './structures/non_linear/graph';
import { FiHome } from 'react-icons/fi';
import Icon from './components/shared/Icon';
import { useTheme } from './contexts/ThemeContext';
import { useFont } from './contexts/FontContext';

// Register all structures
StructureRegistry.register(linkedListStructure);
StructureRegistry.register(arrayStructure);
StructureRegistry.register(stackStructure);
StructureRegistry.register(queueStructure);
StructureRegistry.register(binaryTreeStructure);
StructureRegistry.register(graphStructure);

// Placeholder structures for future (if needed)
const placeholderStructures: any[] = [];

function App() {
  const { theme } = useTheme();
  const { uiFont } = useFont();
  const isDark = theme === 'dark';
  const [currentStructureId, setCurrentStructureId] = useState<string | null>(null);
  const [allStructures, setAllStructures] = useState<any[]>([]);

  useEffect(() => {
    const registered = StructureRegistry.getAll();
    const combined = [...registered, ...placeholderStructures];
    setAllStructures(combined);
    
    // Auto-select linked list if available
    if (registered.length > 0) {
      setCurrentStructureId(registered[0].id);
    }
  }, []);

  const handleSelectStructure = (structureId: string) => {
    setCurrentStructureId(structureId);
  };

  const handleBackToSelector = () => {
    setCurrentStructureId(null);
  };

  const currentStructure = currentStructureId 
    ? StructureRegistry.get(currentStructureId)
    : null;

  const textColor = isDark ? '#e0e0e0' : '#333';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)';

  if (currentStructureId && currentStructure) {
    const StructureComponent = currentStructure.Component;
    return (
      <div>
        <button
          onClick={handleBackToSelector}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            padding: '12px 20px',
            background: isDark ? 'rgba(20, 20, 30, 0.85)' : 'rgba(102, 126, 234, 0.9)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            color: 'white',
            border: `1px solid ${borderColor}`,
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 1000,
            boxShadow: isDark ? '0 4px 16px rgba(0, 0, 0, 0.3)' : '0 4px 16px rgba(0, 0, 0, 0.2)',
            fontFamily: uiFont,
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <FiHome size={18} />
          Back to Structures
        </button>
        <StructureComponent />
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      minHeight: '100vh',
      fontFamily: uiFont
    }}>
      <header style={{ 
        textAlign: 'center', 
        marginBottom: '40px',
        padding: '40px 30px',
        background: isDark ? 'rgba(20, 20, 30, 0.6)' : 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderRadius: '20px',
        border: `1px solid ${borderColor}`,
        boxShadow: isDark ? '0 8px 32px 0 rgba(0, 0, 0, 0.3)' : '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ 
          fontSize: '42px', 
          marginBottom: '15px', 
          textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '2px 2px 4px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px',
          color: textColor,
          fontFamily: uiFont,
          fontWeight: '700'
        }}>
          <Icon name="list" size={40} />
          Data Structures Visualizer
        </h1>
        <p style={{ fontSize: '20px', opacity: 0.9, color: textColor, fontFamily: uiFont }}>
          Interactive Learning Platform for CS2 Data Structures
        </p>
        <p style={{ fontSize: '14px', opacity: 0.8, marginTop: '10px', color: textColor, fontFamily: uiFont }}>
          Learn Linear and Non-Linear data structures through hands-on visualization
        </p>
      </header>

      <StructureSelector
        structures={allStructures}
        currentStructureId={currentStructureId}
        onSelectStructure={handleSelectStructure}
      />
    </div>
  );
}

export default App;

