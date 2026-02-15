import React, { useState } from 'react';
import { theme } from '../../constants/theme';
import ScreenWrapper from '../shared/ScreenWrapper';
import ContinueButton from '../shared/ContinueButton';

export default function FirstNameScreen({ title, subtitle, veteranFirstName, onContinue, onBack, progress }) {
  const [name, setName] = useState(veteranFirstName || '');

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
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
        <h2 style={{
          fontSize: '22px',
          fontWeight: '800',
          color: theme.grayDark,
          marginBottom: '8px',
          lineHeight: 1.2
        }}>
          {title || 'Everything Looks Good!'}
        </h2>
        <p style={{
          color: theme.gray,
          fontSize: '15px',
          lineHeight: 1.5
        }}>
          {subtitle || 'What is your first name?'}
        </p>
      </div>

      <input
        type="text"
        placeholder="First Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          width: '100%',
          padding: '16px',
          border: '2px solid #E5E7EB',
          borderRadius: '10px',
          fontSize: '16px',
          boxSizing: 'border-box',
          marginBottom: '20px'
        }}
        autoFocus
      />

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
          onClick={() => onContinue(name.trim())}
          disabled={!name.trim()}
          style={{ flex: 1 }}
        />
      </div>
    </ScreenWrapper>
  );
}
