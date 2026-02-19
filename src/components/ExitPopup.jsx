import React from 'react';
import { theme } from '../constants/theme';

export default function ExitPopup({ results, onCTA, onDismiss }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '32px 24px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <button
          onClick={onDismiss}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            color: theme.gray,
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          ×
        </button>

        <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚠️</div>

        <h2 style={{
          fontSize: '24px',
          fontWeight: '800',
          color: theme.grayDark,
          marginBottom: '12px'
        }}>
          Wait - You Could Be Leaving Money Behind
        </h2>

        <div style={{
          background: theme.greenLight,
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '14px', color: theme.gray, marginBottom: '4px' }}>
            Based on your results
          </div>
          <div style={{ fontSize: '36px', fontWeight: '800', color: theme.green }}>
            +${results?.monthlyIncrease?.toFixed(0) || '0'}/month
          </div>
        </div>

        <p style={{
          color: theme.gray,
          fontSize: '15px',
          marginBottom: '24px',
          lineHeight: 1.5
        }}>
          Every month you wait is money lost. Let us help you get what you've earned.
        </p>

        <button
          onClick={onCTA}
          style={{
            width: '100%',
            padding: '18px',
            background: theme.green,
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: '700',
            cursor: 'pointer',
            marginBottom: '12px'
          }}
        >
          Have Someone Call Me →
        </button>

        <button
          onClick={onDismiss}
          style={{
            background: 'none',
            border: 'none',
            color: theme.gray,
            fontSize: '14px',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          No thanks, I'll leave
        </button>

        <div style={{
          marginTop: '16px',
          padding: '12px',
          background: '#FEF3C7',
          borderRadius: '8px',
          fontSize: '12px',
          color: '#92400E'
        }}>
          🛡️ <strong>No Fee Guarantee</strong> — You never pay out of pocket.
        </div>
      </div>
    </div>
  );
}
