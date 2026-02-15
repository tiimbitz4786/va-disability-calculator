import React from 'react';
import { theme } from '../../constants/theme';
import { CONDITIONS } from '../../constants/conditions';
import ScreenWrapper from '../shared/ScreenWrapper';
import ContinueButton from '../shared/ContinueButton';

export default function CurrentRatedConditionsScreen({
  currentRatedConditions,
  onToggleCondition,
  onContinue,
  onBack,
  progress
}) {
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
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: theme.grayDark, marginBottom: '8px' }}>
          What conditions are you currently rated for?
        </h2>
        <p style={{ color: theme.gray, fontSize: '14px' }}>Select all conditions you currently have a VA rating for.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', maxHeight: '400px', overflowY: 'auto' }}>
        {Object.entries(CONDITIONS).map(([key, cond]) => {
          const isSelected = currentRatedConditions.find(c => c.key === key);
          return (
            <button
              key={key}
              onClick={() => onToggleCondition(key)}
              style={{
                width: '100%',
                padding: '14px 16px',
                border: isSelected ? `2px solid ${theme.purple}` : '2px solid #E5E7EB',
                borderRadius: '12px',
                background: isSelected ? theme.purpleLight : theme.white,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '24px' }}>{cond.icon}</span>
              <span style={{
                flex: 1,
                fontWeight: '500',
                color: isSelected ? theme.purple : theme.grayDark,
                fontSize: '15px'
              }}>
                {cond.name}
              </span>
              {isSelected && <span style={{ color: theme.green, fontSize: '20px' }}>✓</span>}
            </button>
          );
        })}
      </div>

      {currentRatedConditions.length > 0 && (
        <div style={{
          background: theme.greenLight,
          padding: '12px 16px',
          borderRadius: '10px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ color: theme.greenDark, fontWeight: '500' }}>
            {currentRatedConditions.length} condition{currentRatedConditions.length > 1 ? 's' : ''} selected
          </span>
          <span style={{ color: theme.green, fontSize: '20px' }}>✓</span>
        </div>
      )}

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
        <ContinueButton
          onClick={onContinue}
          disabled={currentRatedConditions.length === 0}
          style={{ flex: 1 }}
        />
      </div>
    </ScreenWrapper>
  );
}
