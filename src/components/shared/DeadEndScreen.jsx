import React from 'react';
import { theme } from '../../constants/theme';
import ScreenWrapper from './ScreenWrapper';

export default function DeadEndScreen({ icon, title, message, ctaText, ctaHref, onStartOver }) {
  return (
    <ScreenWrapper>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>{icon || '📋'}</div>
        <h2 style={{
          fontSize: '22px',
          fontWeight: '800',
          color: theme.grayDark,
          marginBottom: '12px',
          lineHeight: 1.2
        }}>
          {title}
        </h2>
        <p style={{
          color: theme.gray,
          fontSize: '15px',
          lineHeight: 1.6,
          marginBottom: '24px'
        }}>
          {message}
        </p>

        {ctaText && ctaHref && (
          <a
            href={ctaHref}
            style={{
              display: 'block',
              width: '100%',
              padding: '18px',
              background: theme.purple,
              color: theme.white,
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              textAlign: 'center',
              textDecoration: 'none',
              boxSizing: 'border-box',
              marginBottom: '16px'
            }}
          >
            {ctaText}
          </a>
        )}

        {onStartOver && (
          <button
            onClick={onStartOver}
            style={{
              background: 'none',
              border: 'none',
              color: theme.gray,
              fontSize: '14px',
              cursor: 'pointer',
              padding: '8px',
              textDecoration: 'underline'
            }}
          >
            Start Over
          </button>
        )}
      </div>
    </ScreenWrapper>
  );
}
