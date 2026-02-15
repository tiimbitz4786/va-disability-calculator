import React from 'react';
import { theme } from '../../constants/theme';
import { CONDITIONS } from '../../constants/conditions';
import ScreenWrapper from '../shared/ScreenWrapper';
import ContinueButton from '../shared/ContinueButton';

export default function ConditionsScreen({
  selectedConditions,
  excludeKeys,
  onToggleCondition,
  onSetBilateralSide,
  onContinue,
  onBack,
  progress
}) {
  const excludeSet = new Set(excludeKeys || []);

  const canProceed = selectedConditions.length > 0 &&
    selectedConditions.every(c => !c.bilateral || c.side);

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
          What conditions affect you?
        </h2>
        <p style={{ color: theme.gray, fontSize: '14px' }}>Select all that apply. These should be connected to your service.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', maxHeight: '400px', overflowY: 'auto' }}>
        {Object.entries(CONDITIONS).filter(([key]) => !excludeSet.has(key)).map(([key, cond]) => {
          const isSelected = selectedConditions.find(c => c.key === key);
          return (
            <div key={key}>
              <button
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

              {isSelected && cond.bilateral && (
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '8px',
                  marginLeft: '48px',
                  marginBottom: '4px'
                }}>
                  {['Left', 'Right', 'Both'].map(side => (
                    <button
                      key={side}
                      onClick={() => onSetBilateralSide(isSelected.id, side)}
                      style={{
                        padding: '8px 16px',
                        border: isSelected.side === side ? `2px solid ${theme.purple}` : '1px solid #E5E7EB',
                        borderRadius: '8px',
                        background: isSelected.side === side ? theme.purpleLight : theme.white,
                        color: isSelected.side === side ? theme.purple : theme.gray,
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      {side}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedConditions.length > 0 && (
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
            {selectedConditions.length} condition{selectedConditions.length > 1 ? 's' : ''} selected
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
          disabled={!canProceed}
          style={{ flex: 1 }}
        />
      </div>
    </ScreenWrapper>
  );
}
