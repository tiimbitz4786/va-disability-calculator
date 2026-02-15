import React from 'react';
import { theme } from '../../constants/theme';
import ScreenWrapper from '../shared/ScreenWrapper';
import ContinueButton from '../shared/ContinueButton';

export default function DeniedReassureScreen({ onContinue, onBack, progress }) {
  return (
    <ScreenWrapper>
      {progress !== undefined && (
        <div style={{ marginBottom: '12px' }}>
          <div style={{ height: '8px', background: theme.grayLight, borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${theme.purple}, ${theme.green})`,
              borderRadius: '4px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      )}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🤝</div>
        <h2 style={{
          fontSize: '22px',
          fontWeight: '800',
          color: theme.grayDark,
          marginBottom: '12px',
          lineHeight: 1.2
        }}>
          Don't Give Up
        </h2>
        <p style={{
          color: theme.gray,
          fontSize: '15px',
          lineHeight: 1.6
        }}>
          We've helped thousands of veterans who were denied before get the benefits they earned. A denial doesn't mean you don't qualify — it often just means the claim needs better support.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={onBack}
          style={{
            padding: '16px 24px',
            background: theme.grayLight,
            color: theme.gray,
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          ← Back
        </button>
        <ContinueButton onClick={onContinue} style={{ flex: 1 }} />
      </div>
    </ScreenWrapper>
  );
}
