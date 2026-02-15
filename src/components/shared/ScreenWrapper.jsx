import React from 'react';
import { theme } from '../../constants/theme';

export default function ScreenWrapper({ children, style }) {
  return (
    <div style={{
      background: theme.white,
      borderRadius: '20px',
      padding: '28px 24px',
      boxShadow: '0 10px 40px rgba(93,58,142,0.15)',
      ...style
    }}>
      {children}
    </div>
  );
}
