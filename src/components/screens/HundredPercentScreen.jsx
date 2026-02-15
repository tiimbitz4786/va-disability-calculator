import React from 'react';
import { theme } from '../../constants/theme';
import ScreenWrapper from '../shared/ScreenWrapper';

export default function HundredPercentScreen({ onStartOver }) {
  return (
    <ScreenWrapper>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
        <h2 style={{
          fontSize: '22px',
          fontWeight: '800',
          color: theme.grayDark,
          marginBottom: '12px',
          lineHeight: 1.2
        }}>
          Thank You for Your Service
        </h2>
        <p style={{
          color: theme.gray,
          fontSize: '15px',
          lineHeight: 1.6,
          marginBottom: '16px'
        }}>
          Congratulations on receiving your 100% rating. This calculator is designed to help veterans find potential rating increases, so it isn't the right fit for your situation.
        </p>
        <p style={{
          color: theme.gray,
          fontSize: '15px',
          lineHeight: 1.6,
          marginBottom: '24px'
        }}>
          However, if you believe you may be entitled to an <strong>earlier effective date</strong> for your rating, we offer a free case analysis to review your timeline.
        </p>

        <a
          href="tel:1-866-445-5375"
          style={{
            display: 'block',
            width: '100%',
            padding: '18px',
            background: theme.purple,
            color: theme.white,
            border: 'none',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: '700',
            textAlign: 'center',
            textDecoration: 'none',
            boxSizing: 'border-box',
            marginBottom: '12px'
          }}
        >
          Call 1-866-HILLER LAW
        </a>
        <p style={{ fontSize: '13px', color: theme.gray, marginBottom: '20px' }}>
          Free case analysis — no obligation
        </p>

        <div style={{
          padding: '12px',
          background: '#FEF3C7',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <span style={{ fontSize: '18px' }}>🛡️</span>
          <span style={{ fontSize: '12px', color: '#92400E' }}>
            <strong>No Fee Guarantee.</strong> You pay nothing. If we win, the VA pays us.
          </span>
        </div>

        <button
          onClick={onStartOver}
          style={{
            background: 'none',
            border: 'none',
            color: theme.gray,
            fontSize: '14px',
            cursor: 'pointer',
            padding: '8px',
            textDecoration: 'underline'
          }}
        >
          Start Over
        </button>
      </div>
    </ScreenWrapper>
  );
}
