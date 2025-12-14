import React from 'react';
import Icon from '../shared/Icon';
import { useTheme } from '../../contexts/ThemeContext';

interface Props {
  explanation: string;
  error?: string;
  warning?: string;
}

const ExplanationPanel: React.FC<Props> = ({ explanation, error, warning }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const emptyBg = isDark ? 'rgba(30, 30, 40, 0.8)' : '#f8f9fa';
  const emptyText = isDark ? '#aaa' : '#666';
  const emptyBorder = isDark ? '#333' : '#ddd';

  const errorBg = isDark ? 'rgba(255, 100, 100, 0.15)' : '#FFE5E5';
  const errorBorder = isDark ? 'rgba(255, 100, 100, 0.4)' : '#FF0000';
  const errorText = isDark ? '#ff9999' : '#C00';
  const errorTitle = isDark ? '#ff6b6b' : '#FF0000';

  const warningBg = isDark ? 'rgba(255, 200, 100, 0.15)' : '#FFF4E5';
  const warningBorder = isDark ? 'rgba(255, 200, 100, 0.4)' : '#FFA500';
  const warningText = isDark ? '#ffcc99' : '#B8860B';
  const warningTitle = isDark ? '#ffaa44' : '#FFA500';

  const successBg = isDark ? 'rgba(100, 255, 150, 0.15)' : '#E8F5E9';
  const successBorder = isDark ? 'rgba(100, 255, 150, 0.4)' : '#4CAF50';
  const successText = isDark ? '#99ffaa' : '#1B5E20';
  const successTitle = isDark ? '#66ff88' : '#2E7D32';

  if (!explanation && !error && !warning) {
    return (
      <div style={{
        background: emptyBg,
        padding: '15px',
        borderRadius: '12px',
        margin: '20px 0',
        minHeight: '60px',
        border: `1px solid ${emptyBorder}`
      }}>
        <div style={{ color: emptyText, fontStyle: 'italic' }}>
          Execute a statement to see explanations here...
        </div>
      </div>
    );
  }

  const bg = error ? errorBg : warning ? warningBg : successBg;
  const border = error ? errorBorder : warning ? warningBorder : successBorder;

  return (
    <div style={{
      background: bg,
      padding: '15px',
      borderRadius: '12px',
      margin: '20px 0',
      border: `2px solid ${border}`
    }}>
      {error && (
        <div style={{ marginBottom: '10px' }}>
          <strong style={{ color: errorTitle, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="error" size={18} color={errorTitle} />
            Error:
          </strong>
          <div style={{ color: errorText, marginTop: '5px', fontSize: '14px' }}>
            {error}
          </div>
        </div>
      )}
      {warning && (
        <div style={{ marginBottom: '10px' }}>
          <strong style={{ color: warningTitle, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="warning" size={18} color={warningTitle} />
            Warning:
          </strong>
          <div style={{ color: warningText, marginTop: '5px', fontSize: '14px' }}>
            {warning}
          </div>
        </div>
      )}
      {explanation && (
        <div>
          <strong style={{ color: successTitle, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="info" size={18} color={successTitle} />
            Explanation:
          </strong>
          <div style={{ color: successText, marginTop: '5px', fontSize: '14px', lineHeight: '1.6' }}>
            {explanation}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplanationPanel;

