import React from 'react';
import { theme } from '../../constants/theme';
import ScreenWrapper from '../shared/ScreenWrapper';
import ContinueButton from '../shared/ContinueButton';

export default function CurrentRatingScreen({
  currentRating,
  setCurrentRating,
  hasSpouse,
  setHasSpouse,
  hasChildren,
  setHasChildren,
  onContinue,
  onBack,
  progress
}) {
  return (
    <ScreenWrapper>
      <div style={{ marginBottom: '20px' }}>
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
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: theme.grayDark, marginBottom: '8px' }}>
          What is your current combined VA rating?
        </h2>
        <p style={{ color: theme.gray, fontSize: '14px' }}>Select 0% if you don't have a rating yet.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '20px' }}>
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(rating => (
          <button
            key={rating}
            onClick={() => setCurrentRating(rating)}
            style={{
              padding: '14px 8px',
              border: currentRating === rating ? `2px solid ${theme.purple}` : '2px solid #E5E7EB',
              borderRadius: '10px',
              background: currentRating === rating ? theme.purpleLight : theme.white,
              color: currentRating === rating ? theme.purple : theme.grayDark,
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            {rating}%
          </button>
        ))}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={hasSpouse}
            onChange={e => setHasSpouse(e.target.checked)}
            style={{ width: '20px', height: '20px', accentColor: theme.purple }}
          />
          <span style={{ fontSize: '15px', color: theme.grayDark }}>I'm married</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={hasChildren}
            onChange={e => setHasChildren(e.target.checked)}
            style={{ width: '20px', height: '20px', accentColor: theme.purple }}
          />
          <span style={{ fontSize: '15px', color: theme.grayDark }}>I have dependent children</span>
        </label>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        {onBack && (
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
        )}
        <ContinueButton onClick={onContinue} style={{ flex: 1 }} />
      </div>
    </ScreenWrapper>
  );
}
