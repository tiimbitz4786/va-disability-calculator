import React, { useState } from 'react';
import { theme } from '../../constants/theme';
import ScreenWrapper from '../shared/ScreenWrapper';
import ContinueButton from '../shared/ContinueButton';

const RATING_OPTIONS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export default function EnterCurrentRatingsScreen({
  currentRatedConditions,
  onComplete,
  onBack,
  progress
}) {
  const [conditionIndex, setConditionIndex] = useState(0);
  const [ratings, setRatings] = useState({});

  const condition = currentRatedConditions[conditionIndex];
  const currentSelected = ratings[condition?.key];

  const handleSelect = (rating) => {
    const newRatings = { ...ratings, [condition.key]: rating };
    setRatings(newRatings);

    if (conditionIndex < currentRatedConditions.length - 1) {
      setConditionIndex(conditionIndex + 1);
    } else {
      // All done, pass ratings back
      onComplete(newRatings);
    }
  };

  const handlePrevious = () => {
    if (conditionIndex > 0) {
      setConditionIndex(conditionIndex - 1);
    } else {
      onBack();
    }
  };

  if (!condition) return null;

  const condProgress = Math.round(((conditionIndex + 1) / currentRatedConditions.length) * 100);

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
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', color: theme.purple, fontWeight: '600' }}>ENTER CURRENT RATINGS</span>
          <span style={{ fontSize: '12px', color: theme.gray }}>{conditionIndex + 1} of {currentRatedConditions.length}</span>
        </div>
        <div style={{ height: '6px', background: theme.grayLight, borderRadius: '3px', overflow: 'hidden', marginBottom: '16px' }}>
          <div style={{
            height: '100%',
            width: `${condProgress}%`,
            background: theme.purple,
            borderRadius: '3px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '40px' }}>{condition.icon}</span>
      </div>

      <h2 style={{
        fontSize: '18px',
        fontWeight: '700',
        color: theme.grayDark,
        marginBottom: '8px',
        textAlign: 'center'
      }}>
        {condition.name}
      </h2>

      <p style={{
        color: theme.gray,
        fontSize: '15px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        What is your current rating for this condition?
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '20px' }}>
        {RATING_OPTIONS.map(rating => (
          <button
            key={rating}
            onClick={() => handleSelect(rating)}
            style={{
              padding: '14px 8px',
              border: currentSelected === rating ? `2px solid ${theme.purple}` : '2px solid #E5E7EB',
              borderRadius: '10px',
              background: currentSelected === rating ? theme.purpleLight : theme.white,
              color: currentSelected === rating ? theme.purple : theme.grayDark,
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            {rating}%
          </button>
        ))}
      </div>

      <button
        onClick={handlePrevious}
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
        ← {conditionIndex > 0 ? 'Previous condition' : 'Back'}
      </button>
    </ScreenWrapper>
  );
}
