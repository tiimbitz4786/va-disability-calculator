import React from 'react';
import { theme } from '../../constants/theme';
import ScreenWrapper from '../shared/ScreenWrapper';
import ContinueButton from '../shared/ContinueButton';

export default function RatedReassureScreen({ currentRating, onContinue, onBack, progress }) {
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
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>📈</div>
        <h2 style={{
          fontSize: '22px',
          fontWeight: '800',
          color: theme.grayDark,
          marginBottom: '12px',
          lineHeight: 1.2
        }}>
          We Can Help You Get Higher
        </h2>
        <p style={{
          color: theme.gray,
          fontSize: '15px',
          lineHeight: 1.6,
          marginBottom: '12px'
        }}>
          We've helped thousands of veterans rated at {currentRating}% get the increase they deserve. Even a 10% increase can mean life-changing money.
        </p>
        <p style={{
          color: theme.gray,
          fontSize: '15px',
          lineHeight: 1.6
        }}>
          To give you the most accurate estimate, we need to know your individual ratings.
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
