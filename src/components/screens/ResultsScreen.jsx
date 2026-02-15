import React from 'react';
import { theme } from '../../constants/theme';

export default function ResultsScreen({ results, leadInfo, veteranFirstName }) {
  const displayName = veteranFirstName || leadInfo.firstName;

  return (
    <div>
      {/* Thank You & What to Expect */}
      <div style={{
        background: theme.greenLight,
        borderRadius: '16px',
        padding: '28px 24px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
        <h3 style={{ fontSize: '22px', fontWeight: '800', color: theme.greenDark, marginBottom: '8px' }}>
          Thank You, {displayName}!
        </h3>
        <p style={{ color: theme.greenDark, fontSize: '15px', lineHeight: 1.5, marginBottom: '24px' }}>
          Your personalized VA benefits report has been sent to <strong>{leadInfo.email}</strong>
        </p>

        <div style={{ textAlign: 'left', marginBottom: '24px' }}>
          <div style={{ fontSize: '16px', fontWeight: '700', color: theme.greenDark, marginBottom: '12px' }}>
            What to Expect:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: theme.green, color: theme.white,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: '700', flexShrink: 0
              }}>1</div>
              <div style={{ color: theme.greenDark, fontSize: '14px', lineHeight: 1.5 }}>
                Check your email for your full results and personalized VA benefits report
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: theme.green, color: theme.white,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: '700', flexShrink: 0
              }}>2</div>
              <div style={{ color: theme.greenDark, fontSize: '14px', lineHeight: 1.5 }}>
                A VA disability expert will call you within 24 hours
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: theme.green, color: theme.white,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: '700', flexShrink: 0
              }}>3</div>
              <div style={{ color: theme.greenDark, fontSize: '14px', lineHeight: 1.5 }}>
                If we can help, we handle everything — you never pay a fee
              </div>
            </div>
          </div>
        </div>

        <p style={{ color: theme.greenDark, fontSize: '14px' }}>
          <strong>Questions?</strong> Call us at <a href="tel:1-866-445-5375" style={{ color: theme.greenDark }}>1-866-HILLER LAW</a>
        </p>
      </div>

      {/* Trust Badges */}
      <div style={{
        marginTop: '20px',
        textAlign: 'center',
        color: theme.gray,
        fontSize: '12px'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: '#FEF3C7',
          padding: '8px 16px',
          borderRadius: '20px',
          marginBottom: '16px'
        }}>
          <span>🛡️</span>
          <span style={{ color: '#92400E', fontWeight: '600' }}>No Fee Guarantee</span>
        </div>
        <div>Trusted by thousands of veterans</div>
      </div>
    </div>
  );
}
