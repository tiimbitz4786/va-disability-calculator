import React from 'react';
import { theme } from '../../constants/theme';
import ScreenWrapper from '../shared/ScreenWrapper';

export default function IncreasedRatingPromptScreen({ veteranFirstName, onAnswer, onBack, progress }) {
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
          {veteranFirstName}, do you want to file for increased ratings?
        </h2>
        <p style={{
          color: theme.gray,
          fontSize: '15px',
          lineHeight: 1.6
        }}>
          If any of your current conditions have gotten worse, you may qualify for a higher individual rating.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => onAnswer(true)}
          style={{
            width: '100%',
            padding: '16px',
            border: '2px solid #E5E7EB',
            borderRadius: '12px',
            background: theme.white,
            textAlign: 'center',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            color: theme.grayDark
          }}
          onMouseOver={e => {
            e.currentTarget.style.borderColor = theme.purple;
            e.currentTarget.style.background = theme.purpleLight;
          }}
          onMouseOut={e => {
            e.currentTarget.style.borderColor = '#E5E7EB';
            e.currentTarget.style.background = theme.white;
          }}
        >
          Yes, my conditions have gotten worse
        </button>
        <button
          onClick={() => onAnswer(false)}
          style={{
            width: '100%',
            padding: '16px',
            border: '2px solid #E5E7EB',
            borderRadius: '12px',
            background: theme.white,
            textAlign: 'center',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            color: theme.grayDark
          }}
          onMouseOver={e => {
            e.currentTarget.style.borderColor = theme.purple;
            e.currentTarget.style.background = theme.purpleLight;
          }}
          onMouseOut={e => {
            e.currentTarget.style.borderColor = '#E5E7EB';
            e.currentTarget.style.background = theme.white;
          }}
        >
          No, skip this
        </button>
      </div>

      <button
        onClick={onBack}
        style={{
          width: '100%',
          padding: '12px',
          background: 'transparent',
          color: theme.gray,
          border: 'none',
          fontSize: '14px',
          cursor: 'pointer'
        }}
      >
        ← Back
      </button>
    </ScreenWrapper>
  );
}
