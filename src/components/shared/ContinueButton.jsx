import React from 'react';
import { theme } from '../../constants/theme';

export default function ContinueButton({ onClick, disabled, children, style }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '16px',
        background: disabled ? '#D1D5DB' : theme.purple,
        color: theme.white,
        border: 'none',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style
      }}
    >
      {children || 'Continue →'}
    </button>
  );
}
