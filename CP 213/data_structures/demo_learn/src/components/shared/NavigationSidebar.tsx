import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useFont } from '../../contexts/FontContext';
import { 
  FiBook, 
  FiTrendingUp, 
  FiRefreshCw,
  FiInfo,
  FiList,
  FiChevronRight,
  FiMenu,
  FiX,
  FiHome,
  FiZap
} from 'react-icons/fi';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  section?: string;
  subsections?: { id: string; label: string }[];
}

interface Props {
  currentSection?: string;
  onNavigate?: (sectionId: string) => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

const NavigationSidebar: React.FC<Props> = ({ currentSection, onNavigate, isOpen: externalIsOpen, onToggle }) => {
  const { theme } = useTheme();
  const { uiFont } = useFont();
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = onToggle || setInternalIsOpen;
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['learn', 'practice']));

  const isDark = theme === 'dark';
  const bgColor = isDark 
    ? 'rgba(15, 15, 20, 0.95)' 
    : 'rgba(255, 255, 255, 0.95)';
  const textColor = isDark ? '#e0e0e0' : '#333';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const accentColor = isDark ? '#4a9eff' : '#2196F3';
  const hoverBg = isDark ? 'rgba(74, 158, 255, 0.15)' : 'rgba(33, 150, 243, 0.1)';
  const activeBg = isDark ? 'rgba(74, 158, 255, 0.25)' : 'rgba(33, 150, 243, 0.2)';

  const navigationItems: NavigationItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <FiHome size={18} />,
      section: 'overview'
    },
    {
      id: 'learn',
      label: 'Learning Resources',
      icon: <FiBook size={18} />,
      subsections: [
        { id: 'learning-mode', label: 'Step-by-Step Tutorial' },
        { id: 'eli5', label: "Explain Like I'm 5" },
        { id: 'line-by-line', label: 'Line-by-Line Explanations' },
        { id: 'educational-content', label: 'Educational Concepts' },
        { id: 'code-examples', label: 'Code Examples' }
      ]
    },
    {
      id: 'practice',
      label: 'Practice & Interactive',
      icon: <FiZap size={18} />,
      subsections: [
        { id: 'operations', label: 'Operations Panel' },
        { id: 'code-editor', label: 'Code Editor' },
        { id: 'visualization', label: 'Visualization' },
        { id: 'challenges', label: 'Challenges' },
        { id: 'traversal-guide', label: 'Traversal Guide' }
      ]
    },
    {
      id: 'algorithms',
      label: 'Algorithms & Sorting',
      icon: <FiRefreshCw size={18} />,
      subsections: [
        { id: 'sorting', label: 'Sorting Algorithms' },
        { id: 'search-algorithm', label: 'Search Algorithm' }
      ]
    },
    {
      id: 'complexity',
      label: 'Complexity Analysis',
      icon: <FiTrendingUp size={18} />,
      section: 'big-o-notation'
    },
    {
      id: 'references',
      label: 'References & Guides',
      icon: <FiInfo size={18} />,
      subsections: [
        { id: 'references', label: 'Quick References' },
        { id: 'complexity-table', label: 'Complexity Tables' }
      ]
    }
  ];

  const handleItemClick = (itemId: string, subsectionId?: string) => {
    const targetId = subsectionId || itemId;
    if (onNavigate) {
      onNavigate(targetId);
    }
    
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const sidebarContent = (
    <div style={{
      background: bgColor,
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      width: isOpen ? '280px' : '0',
      minWidth: isOpen ? '280px' : '0',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      borderRight: `1px solid ${borderColor}`,
      overflowY: 'auto',
      overflowX: 'hidden',
      transition: 'width 0.3s ease, min-width 0.3s ease',
      zIndex: 999,
      boxShadow: isDark ? '2px 0 10px rgba(0, 0, 0, 0.3)' : '2px 0 10px rgba(0, 0, 0, 0.1)',
      fontFamily: uiFont
    }}>
      <div style={{
        padding: '20px',
        borderBottom: `1px solid ${borderColor}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{
          color: textColor,
          fontSize: '20px',
          fontWeight: '700',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <FiList size={22} color={accentColor} />
          Navigation
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: textColor,
            cursor: 'pointer',
            padding: '5px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      <nav style={{ padding: '15px 0' }}>
        {navigationItems.map((item) => (
          <div key={item.id}>
            {item.subsections ? (
              <>
                <div
                  onClick={() => toggleExpanded(item.id)}
                  style={{
                    padding: '12px 20px',
                    color: textColor,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'background 0.2s',
                    fontWeight: '600'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = hoverBg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <FiChevronRight 
                    size={16} 
                    style={{
                      transform: expandedItems.has(item.id) ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s'
                    }}
                  />
                </div>
                {expandedItems.has(item.id) && (
                  <div style={{
                    background: isDark ? 'rgba(20, 20, 30, 0.5)' : 'rgba(240, 240, 240, 0.5)',
                    paddingLeft: '20px'
                  }}>
                    {item.subsections.map((sub) => {
                      const isActive = currentSection === sub.id;
                      return (
                        <div
                          key={sub.id}
                          onClick={() => handleItemClick(item.id, sub.id)}
                          style={{
                            padding: '10px 20px 10px 40px',
                            color: isActive ? accentColor : textColor,
                            cursor: 'pointer',
                            fontSize: '14px',
                            background: isActive ? activeBg : 'transparent',
                            borderLeft: isActive ? `3px solid ${accentColor}` : '3px solid transparent',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.background = hoverBg;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.background = 'transparent';
                            }
                          }}
                        >
                          {sub.label}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <div
                onClick={() => handleItemClick(item.id)}
                style={{
                  padding: '12px 20px',
                  color: currentSection === item.id ? accentColor : textColor,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontWeight: currentSection === item.id ? '600' : '400',
                  background: currentSection === item.id ? activeBg : 'transparent',
                  borderLeft: currentSection === item.id ? `3px solid ${accentColor}` : '3px solid transparent',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (currentSection !== item.id) {
                    e.currentTarget.style.background = hoverBg;
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentSection !== item.id) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {sidebarContent}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            left: '10px',
            top: '10px',
            zIndex: 1001,
            background: bgColor,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${borderColor}`,
            borderRadius: '8px',
            padding: '10px',
            color: textColor,
            cursor: 'pointer',
            boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <FiMenu size={20} />
        </button>
      )}
    </>
  );
};

export default NavigationSidebar;
