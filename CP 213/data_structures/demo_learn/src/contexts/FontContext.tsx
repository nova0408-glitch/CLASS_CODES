import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type FontFamily = 'Inter' | 'JetBrains Mono' | 'Fira Code';
export type CodeFont = 'JetBrains Mono' | 'Fira Code';

interface FontContextType {
  uiFont: FontFamily;
  codeFont: CodeFont;
  setUiFont: (font: FontFamily) => void;
  setCodeFont: (font: CodeFont) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [uiFont, setUiFont] = useState<FontFamily>(() => {
    const saved = localStorage.getItem('uiFont');
    return (saved as FontFamily) || 'Inter';
  });

  const [codeFont, setCodeFont] = useState<CodeFont>(() => {
    const saved = localStorage.getItem('codeFont');
    return (saved as CodeFont) || 'JetBrains Mono';
  });

  useEffect(() => {
    localStorage.setItem('uiFont', uiFont);
    localStorage.setItem('codeFont', codeFont);
    document.documentElement.style.setProperty('--ui-font', uiFont);
    document.documentElement.style.setProperty('--code-font', codeFont);
  }, [uiFont, codeFont]);

  useEffect(() => {
    const link1 = document.createElement('link');
    link1.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    link1.rel = 'stylesheet';

    const link2 = document.createElement('link');
    link2.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap';
    link2.rel = 'stylesheet';

    const link3 = document.createElement('link');
    link3.href = 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap';
    link3.rel = 'stylesheet';

    document.head.appendChild(link1);
    document.head.appendChild(link2);
    document.head.appendChild(link3);

    return () => {
      document.head.removeChild(link1);
      document.head.removeChild(link2);
      document.head.removeChild(link3);
    };
  }, []);

  return (
    <FontContext.Provider value={{ uiFont, codeFont, setUiFont, setCodeFont }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
};
