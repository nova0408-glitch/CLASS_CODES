import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useFont } from '../../contexts/FontContext';
import { FiCode, FiChevronRight } from 'react-icons/fi';

interface LineExplanation {
  line: string;
  explanation: string;
}

interface Props {
  code: string;
  explanations: LineExplanation[];
  title?: string;
}

const LineByLineExplanation: React.FC<Props> = ({ code, explanations, title = 'Code Explanation' }) => {
  const { theme } = useTheme();
  const { codeFont, uiFont } = useFont();
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);

  const isDark = theme === 'dark';
  const lines = code.split('\n');

  const bgColor = isDark 
    ? 'rgba(20, 20, 30, 0.7)' 
    : 'rgba(255, 255, 255, 0.25)';
  const textColor = isDark ? '#e0e0e0' : '#333';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)';
  const codeBg = isDark ? '#1a1a1f' : '#f8f9fa';
  const accentColor = isDark ? '#4a9eff' : '#2196F3';
  const highlightBg = isDark ? 'rgba(74, 158, 255, 0.2)' : 'rgba(33, 150, 243, 0.1)';

  const getExplanationForLine = (lineNumber: number): string | null => {
    const exp = explanations.find(e => {
      const expLineNum = lines.findIndex(l => l.trim() === e.line.trim());
      return expLineNum === lineNumber;
    });
    return exp ? exp.explanation : null;
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
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <FiCode size={22} color={accentColor} />
        <h3 style={{
          color: textColor,
          fontSize: '18px',
          fontWeight: '600',
          margin: 0,
          fontFamily: uiFont
        }}>
          {title}
        </h3>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
      }}>
        <div style={{
          background: codeBg,
          padding: '20px',
          borderRadius: '12px',
          border: `1px solid ${borderColor}`,
          overflow: 'auto'
        }}>
          <div style={{
            fontFamily: codeFont,
            fontSize: '14px',
            lineHeight: '1.8'
          }}>
            {lines.map((line, idx) => {
              const isHighlighted = highlightedLine === idx;
              const hasExplanation = getExplanationForLine(idx) !== null;
              
              return (
                <div
                  key={idx}
                  onMouseEnter={() => hasExplanation && setHighlightedLine(idx)}
                  onMouseLeave={() => setHighlightedLine(null)}
                  style={{
                    padding: '8px 12px',
                    margin: '2px 0',
                    background: isHighlighted ? highlightBg : 'transparent',
                    borderRadius: '6px',
                    cursor: hasExplanation ? 'pointer' : 'default',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}
                >
                  <span style={{
                    color: isDark ? '#666' : '#999',
                    fontSize: '12px',
                    minWidth: '30px',
                    textAlign: 'right',
                    fontFamily: codeFont
                  }}>
                    {idx + 1}
                  </span>
                  <code style={{
                    color: isDark ? '#e0e0e0' : '#333',
                    flex: 1,
                    fontFamily: codeFont,
                    whiteSpace: 'pre'
                  }}>
                    {line || ' '}
                  </code>
                  {hasExplanation && (
                    <FiChevronRight 
                      size={16} 
                      color={isHighlighted ? accentColor : (isDark ? '#666' : '#999')}
                      style={{ marginTop: '2px' }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{
          background: isDark ? 'rgba(30, 30, 40, 0.6)' : 'rgba(255, 255, 255, 0.2)',
          padding: '20px',
          borderRadius: '12px',
          border: `1px solid ${borderColor}`,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          maxHeight: '500px',
          overflowY: 'auto'
        }}>
          {highlightedLine !== null && getExplanationForLine(highlightedLine) ? (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '15px'
              }}>
                <div style={{
                  background: accentColor,
                  color: 'white',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  fontFamily: codeFont
                }}>
                  {highlightedLine + 1}
                </div>
                <span style={{
                  color: textColor,
                  fontWeight: '600',
                  fontFamily: uiFont
                }}>
                  Line {highlightedLine + 1}
                </span>
              </div>
              <p style={{
                color: isDark ? '#d0d0d0' : '#555',
                lineHeight: '1.8',
                fontFamily: uiFont,
                fontSize: '14px'
              }}>
                {getExplanationForLine(highlightedLine)}
              </p>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: isDark ? '#666' : '#999',
              textAlign: 'center',
              fontFamily: uiFont
            }}>
              <FiCode size={48} style={{ marginBottom: '15px', opacity: 0.3 }} />
              <p style={{ fontSize: '14px', margin: 0 }}>
                Hover over a code line to see its explanation
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LineByLineExplanation;
