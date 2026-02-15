import React, { useState } from 'react';
import { theme } from '../../constants/theme';
import ScreenWrapper from '../shared/ScreenWrapper';
import ContinueButton from '../shared/ContinueButton';

const SERVICE_OPTIONS = [
  { key: 'in-service', label: 'I got sick or injured during my service' },
  { key: 'pre-service', label: 'I had a condition before service that got worse' },
  { key: 'post-service', label: 'My condition is related to my service but appeared after I left the military' },
  { key: 'none', label: 'None of the above' }
];

export default function ServiceConnectionScreen({ onContinue, onBack, progress }) {
  const [selected, setSelected] = useState([]);

  const toggleOption = (key) => {
    if (key === 'none') {
      setSelected(['none']);
      return;
    }
    const without = selected.filter(s => s !== 'none');
    if (without.includes(key)) {
      setSelected(without.filter(s => s !== key));
    } else {
      setSelected([...without, key]);
    }
  };

  const canContinue = selected.length > 0;
  const isNoneSelected = selected.includes('none');

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
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔗</div>
        <h2 style={{
          fontSize: '22px',
          fontWeight: '800',
          color: theme.grayDark,
          marginBottom: '8px',
          lineHeight: 1.2
        }}>
          Select all that are true about your medical condition or conditions:
        </h2>
        <p style={{
          color: theme.gray,
          fontSize: '14px',
          lineHeight: 1.5
        }}>
          Select all that apply.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        {SERVICE_OPTIONS.map(opt => {
          const isChecked = selected.includes(opt.key);
          return (
            <button
              key={opt.key}
              onClick={() => toggleOption(opt.key)}
              style={{
                width: '100%',
                padding: '14px 16px',
                border: isChecked ? `2px solid ${theme.purple}` : '2px solid #E5E7EB',
                borderRadius: '12px',
                background: isChecked ? theme.purpleLight : theme.white,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '4px',
                border: isChecked ? `2px solid ${theme.purple}` : '2px solid #D1D5DB',
                background: isChecked ? theme.purple : theme.white,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {isChecked && <span style={{ color: theme.white, fontSize: '14px' }}>✓</span>}
              </div>
              <span style={{
                flex: 1,
                fontWeight: '500',
                color: isChecked ? theme.purple : theme.grayDark,
                fontSize: '15px'
              }}>
                {opt.label}
              </span>
            </button>
          );
        })}
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
        <ContinueButton
          onClick={() => onContinue(selected)}
          disabled={!canContinue}
          style={{ flex: 1 }}
        />
      </div>
    </ScreenWrapper>
  );
}
