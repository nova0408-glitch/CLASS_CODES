import React, { useState } from 'react';
import Icon from '../shared/Icon';
import { useTheme } from '../../contexts/ThemeContext';
import { useFont } from '../../contexts/FontContext';

interface Props {
  onExecute: (statement: string) => void;
  onClear: () => void;
  suggestions?: string[];
  disabled?: boolean;
}

const CodeEditor: React.FC<Props> = ({ onExecute, onClear, disabled = false }) => {
  const { theme } = useTheme();
  const { uiFont, codeFont } = useFont();
  const isDark = theme === 'dark';
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const bgColor = isDark 
    ? 'rgba(20, 20, 30, 0.7)' 
    : 'rgba(255, 255, 255, 0.25)';
  const textColor = isDark ? '#e0e0e0' : '#333';
  const borderColor = isDark ? '#333' : '#ddd';
  const inputBg = isDark ? '#1a1a1f' : '#ffffff';
  const inputBorder = isDark ? '#444' : '#ddd';
  const infoBg = isDark ? 'rgba(74, 158, 255, 0.15)' : '#E3F2FD';
  const infoText = isDark ? '#4a9eff' : '#1976D2';
  const buttonBg = disabled 
    ? (isDark ? 'rgba(60, 60, 70, 0.5)' : '#ccc')
    : (isDark ? 'rgba(74, 158, 255, 0.3)' : '#4A90E2');
  const clearButtonBg = disabled
    ? (isDark ? 'rgba(60, 60, 70, 0.5)' : '#ccc')
    : (isDark ? 'rgba(255, 100, 100, 0.3)' : '#e74c3c');
  const suggestionBg = isDark ? 'rgba(30, 30, 40, 0.8)' : '#f8f9fa';
  const historyBg = isDark ? 'rgba(30, 30, 40, 0.8)' : '#f8f9fa';

  const commonStatements = [
    'p = head',
    'p = head->link',
    'p = nullptr',
    'newNode = new Node',
    'newNode->info = 50',
    'newNode->link = p->link',
    'p->link = newNode',
    'head = newNode',
    'delete p',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    
    setHistory(prev => [...prev, input.trim()]);
    onExecute(input.trim());
    setInput('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div style={{ 
      background: bgColor,
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      padding: '25px', 
      borderRadius: '16px',
      border: `1px solid ${borderColor}`,
      margin: '20px 0',
      boxShadow: isDark ? '0 8px 32px 0 rgba(0, 0, 0, 0.3)' : '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ marginBottom: '15px', color: textColor, display: 'flex', alignItems: 'center', gap: '8px', fontFamily: uiFont }}>
        <Icon name="code" size={20} color={isDark ? '#4a9eff' : '#667eea'} />
        C++ Code Editor (Struct & Pointers)
      </h3>
      
      <div style={{ 
        background: infoBg, 
        padding: '10px', 
        borderRadius: '8px', 
        marginBottom: '15px',
        fontSize: '12px',
        color: infoText,
        border: `1px solid ${isDark ? 'rgba(74, 158, 255, 0.3)' : '#2196F3'}`
      }}>
        <strong>Node Structure:</strong> <code style={{fontFamily: 'monospace', color: infoText}}>struct Node {'{'} int info; Node* link; {'}'};</code>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter C++ statement (e.g., p = head->link)"
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '14px',
              border: `2px solid ${inputBorder}`,
              borderRadius: '8px',
              fontFamily: codeFont,
              background: inputBg,
              color: textColor
            }}
            disabled={disabled}
          />
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            style={{
              padding: '10px 20px',
              background: buttonBg,
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Icon name="play" size={14} />
            Execute
          </button>
          <button
            type="button"
            onClick={onClear}
            disabled={disabled}
            style={{
              padding: '10px 20px',
              background: clearButtonBg,
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            Clear
          </button>
        </div>
      </form>

      {commonStatements.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          <div style={{ fontSize: '12px', color: isDark ? '#aaa' : '#666', marginBottom: '8px' }}>
            Quick statements:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {commonStatements.map((stmt, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(stmt)}
                disabled={disabled}
                style={{
                  padding: '6px 12px',
                  background: disabled 
                    ? (isDark ? 'rgba(60, 60, 70, 0.5)' : '#f0f0f0')
                    : suggestionBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '6px',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  color: textColor
                }}
              >
                {stmt}
              </button>
            ))}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div>
          <div style={{ fontSize: '12px', color: isDark ? '#aaa' : '#666', marginBottom: '8px' }}>
            Execution history:
          </div>
          <div style={{ 
            maxHeight: '150px', 
            overflowY: 'auto',
            background: historyBg,
            padding: '10px',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '12px',
            border: `1px solid ${borderColor}`
          }}>
            {history.slice(-10).reverse().map((stmt, idx) => (
              <div key={idx} style={{ marginBottom: '4px', color: isDark ? '#c0c0c0' : '#555' }}>
                {history.length - idx}. {stmt}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;

