import React from 'react';
import { theme } from '../../constants/theme';
import ScreenWrapper from '../shared/ScreenWrapper';
import ContinueButton from '../shared/ContinueButton';

export default function SelectIncreasedConditionsScreen({
  currentRatedConditions,
  increasedRatingConditions,
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
          Which conditions have gotten worse?
        </h2>
        <p style={{ color: theme.gray, fontSize: '14px' }}>Select the conditions you want to file for an increased rating.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
        {currentRatedConditions.map(cond => {
          const isSelected = increasedRatingConditions.find(c => c.key === cond.key);
          return (
            <button
              key={cond.key}
              onClick={() => onToggleCondition(cond.key)}
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
              <div style={{ flex: 1 }}>
                <span style={{
                  fontWeight: '500',
                  color: isSelected ? theme.purple : theme.grayDark,
                  fontSize: '15px'
                }}>
                  {cond.name}
                </span>
                <div style={{ fontSize: '12px', color: theme.gray }}>
                  Currently rated: {cond.currentRating}%
                </div>
              </div>
              {isSelected && <span style={{ color: theme.green, fontSize: '20px' }}>✓</span>}
            </button>
          );
        })}
      </div>

      {increasedRatingConditions.length > 0 && (
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
            {increasedRatingConditions.length} condition{increasedRatingConditions.length > 1 ? 's' : ''} selected for increase
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
          disabled={increasedRatingConditions.length === 0}
          style={{ flex: 1 }}
        />
      </div>
    </ScreenWrapper>
  );
}
