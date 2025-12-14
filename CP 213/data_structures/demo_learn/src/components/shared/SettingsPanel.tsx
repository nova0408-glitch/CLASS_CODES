import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useFont, FontFamily, CodeFont } from '../../contexts/FontContext';
import { FiSettings, FiType, FiCode, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const SettingsPanel: React.FC = () => {
  const { theme } = useTheme();
  const { uiFont, codeFont, setUiFont, setCodeFont } = useFont();
  const [isOpen, setIsOpen] = useState(false);

  const isDark = theme === 'dark';
  const bgColor = isDark 
    ? 'rgba(20, 20, 30, 0.85)' 
    : 'rgba(255, 255, 255, 0.9)';
  const textColor = isDark ? '#e0e0e0' : '#333';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';
  const accentColor = isDark ? '#4a9eff' : '#2196F3';

  const uiFonts: FontFamily[] = ['Inter', 'JetBrains Mono', 'Fira Code'];
  const codeFonts: CodeFont[] = ['JetBrains Mono', 'Fira Code'];

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: bgColor,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: `1px solid ${borderColor}`,
          borderRadius: '12px',
          padding: '12px 16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: textColor,
          fontSize: '14px',
          fontWeight: '600',
          boxShadow: isDark ? '0 4px 16px rgba(0, 0, 0, 0.3)' : '0 4px 16px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s',
          fontFamily: 'var(--ui-font)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <FiSettings size={18} />
        Settings
        {isOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '50px',
          right: 0,
          background: bgColor,
          backdropFilter: 'blur(30px) saturate(200%)',
          WebkitBackdropFilter: 'blur(30px) saturate(200%)',
          border: `1px solid ${borderColor}`,
          borderRadius: '16px',
          padding: '20px',
          minWidth: '300px',
          boxShadow: isDark ? '0 8px 32px rgba(0, 0, 0, 0.4)' : '0 8px 32px rgba(0, 0, 0, 0.15)'
        }}>
          <h3 style={{
            color: textColor,
            marginBottom: '20px',
            fontSize: '18px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--ui-font)'
          }}>
            <FiSettings size={20} />
            Editor Settings
          </h3>

          <div style={{ marginBottom: '25px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '12px'
            }}>
              <FiType size={18} color={accentColor} />
              <label style={{
                color: textColor,
                fontWeight: '600',
                fontSize: '14px',
                fontFamily: 'var(--ui-font)'
              }}>
                UI Font
              </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {uiFonts.map((font) => (
                <button
                  key={font}
                  onClick={() => setUiFont(font)}
                  style={{
                    padding: '10px 14px',
                    background: uiFont === font 
                      ? (isDark ? 'rgba(74, 158, 255, 0.2)' : 'rgba(33, 150, 243, 0.1)')
                      : (isDark ? 'rgba(40, 40, 50, 0.6)' : 'rgba(240, 240, 240, 0.8)'),
                    border: `1px solid ${uiFont === font ? accentColor : borderColor}`,
                    borderRadius: '8px',
                    color: textColor,
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: font,
                    fontSize: '14px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (uiFont !== font) {
                      e.currentTarget.style.background = isDark 
                        ? 'rgba(50, 50, 60, 0.8)' 
                        : 'rgba(230, 230, 230, 1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (uiFont !== font) {
                      e.currentTarget.style.background = isDark 
                        ? 'rgba(40, 40, 50, 0.6)' 
                        : 'rgba(240, 240, 240, 0.8)';
                    }
                  }}
                >
                  {font}
                  {uiFont === font && ' ✓'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '12px'
            }}>
              <FiCode size={18} color={accentColor} />
              <label style={{
                color: textColor,
                fontWeight: '600',
                fontSize: '14px',
                fontFamily: 'var(--ui-font)'
              }}>
                Code Font
              </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {codeFonts.map((font) => (
                <button
                  key={font}
                  onClick={() => setCodeFont(font)}
                  style={{
                    padding: '10px 14px',
                    background: codeFont === font 
                      ? (isDark ? 'rgba(74, 158, 255, 0.2)' : 'rgba(33, 150, 243, 0.1)')
                      : (isDark ? 'rgba(40, 40, 50, 0.6)' : 'rgba(240, 240, 240, 0.8)'),
                    border: `1px solid ${codeFont === font ? accentColor : borderColor}`,
                    borderRadius: '8px',
                    color: textColor,
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: font,
                    fontSize: '14px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (codeFont !== font) {
                      e.currentTarget.style.background = isDark 
                        ? 'rgba(50, 50, 60, 0.8)' 
                        : 'rgba(230, 230, 230, 1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (codeFont !== font) {
                      e.currentTarget.style.background = isDark 
                        ? 'rgba(40, 40, 50, 0.6)' 
                        : 'rgba(240, 240, 240, 0.8)';
                    }
                  }}
                >
                  {font}
                  {codeFont === font && ' ✓'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
