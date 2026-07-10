'use client';

import React from 'react';
import { RefreshCw } from 'lucide-react';

export default function PlayAgainButton({ 
  onClick, 
  colorTheme = 'purple', 
  label = 'Run another trial' 
}) {
  const themes = {
    purple: { bg: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)', shadow: '0 0 22px rgba(124,58,237,0.4)' },
    blue:   { bg: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)', shadow: '0 0 22px rgba(37,99,235,0.4)' },
    green:  { bg: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)', shadow: '0 0 22px rgba(5,150,105,0.4)' },
    orange: { bg: 'linear-gradient(135deg, #ea580c 0%, #d97706 100%)', shadow: '0 0 22px rgba(234,88,12,0.4)' },
    rose:   { bg: 'linear-gradient(135deg, #e11d48 0%, #db2777 100%)', shadow: '0 0 22px rgba(225,29,72,0.4)' },
  };

  const theme = themes[colorTheme] || themes.purple;

  return (
    <button
      onPointerDown={(e) => e.stopPropagation()}
      onClick={onClick}
      style={{
        background: theme.bg,
        boxShadow: theme.shadow,
        flex: 1,
        padding: '0.75rem',
        color: '#ffffff',
        fontWeight: 700,
        borderRadius: '0.75rem',
        fontSize: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        fontFamily: 'monospace',
        transition: 'all 0.2s',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
      }}
      onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.15)'}
      onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
    >
      <RefreshCw size={14} />
      {label}
    </button>
  );
}
