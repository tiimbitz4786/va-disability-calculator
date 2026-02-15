import React from 'react';
import { theme } from '../../constants/theme';
import { isValidEmail, isValidPhone } from '../../utils/validation';
import ScreenWrapper from '../shared/ScreenWrapper';
import NoFeeGuarantee from '../shared/NoFeeGuarantee';
import TestimonialCard from '../shared/TestimonialCard';

export default function LeadGateScreen({
  leadInfo,
  setLeadInfo,
  veteranFirstName,
  isSubmitting,
  qualifiesForIncrease,
  onSubmit,
  onBack,
  testimonialIndex,
  progress
}) {
  const emailValid = !leadInfo.email || isValidEmail(leadInfo.email);
  const phoneValid = !leadInfo.phone || leadInfo.phone.length === 0 || isValidPhone(leadInfo.phone);

  const canSubmit = leadInfo.firstName &&
    leadInfo.lastName &&
    isValidPhone(leadInfo.phone) &&
    isValidEmail(leadInfo.email) &&
    !isSubmitting;

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
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
        <h2 style={{
          fontSize: '22px',
          fontWeight: '800',
          color: theme.grayDark,
          marginBottom: '8px',
          lineHeight: 1.2
        }}>
          {qualifiesForIncrease === false
            ? 'Let Us Take a Closer Look'
            : 'Great News — You May Qualify!'}
        </h2>
        <p style={{ color: theme.gray, fontSize: '15px', lineHeight: 1.5 }}>
          {qualifiesForIncrease === false
            ? "Based on your answers, we don't see a rating increase. However, many factors can't be captured here. We recommend a free case analysis."
            : "Based on your answers, we've calculated your potential rating increase. Enter your info to see your results."}
        </p>
      </div>

      {qualifiesForIncrease !== false && (
        <div style={{
          background: theme.greenLight,
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '14px', color: theme.greenDark, marginBottom: '4px' }}>Your results are ready!</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: theme.green }}>
            See Your Potential Increase →
          </div>
        </div>
      )}

      {/* Lead Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="First Name"
          value={leadInfo.firstName}
          readOnly={!!veteranFirstName}
          onChange={e => setLeadInfo({ ...leadInfo, firstName: e.target.value })}
          style={{
            width: '100%',
            padding: '16px',
            border: '2px solid #E5E7EB',
            borderRadius: '10px',
            fontSize: '16px',
            boxSizing: 'border-box',
            background: veteranFirstName ? theme.grayLight : theme.white
          }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={leadInfo.lastName}
          onChange={e => setLeadInfo({ ...leadInfo, lastName: e.target.value })}
          style={{
            width: '100%',
            padding: '16px',
            border: '2px solid #E5E7EB',
            borderRadius: '10px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={leadInfo.email}
          onChange={e => setLeadInfo({ ...leadInfo, email: e.target.value })}
          style={{
            width: '100%',
            padding: '16px',
            border: `2px solid ${!emailValid ? '#EF4444' : '#E5E7EB'}`,
            borderRadius: '10px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
        {leadInfo.email && !emailValid && (
          <div style={{ color: '#EF4444', fontSize: '13px', marginTop: '-8px' }}>
            Please enter a valid email address
          </div>
        )}
        <input
          type="tel"
          placeholder="Phone Number (10 digits)"
          value={leadInfo.phone}
          onChange={e => {
            const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
            setLeadInfo({ ...leadInfo, phone: digits });
          }}
          style={{
            width: '100%',
            padding: '16px',
            border: `2px solid ${!phoneValid ? '#EF4444' : '#E5E7EB'}`,
            borderRadius: '10px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
        {leadInfo.phone && leadInfo.phone.length > 0 && leadInfo.phone.length !== 10 && (
          <div style={{ color: '#EF4444', fontSize: '13px', marginTop: '-8px' }}>
            Please enter 10 digits ({leadInfo.phone.length}/10)
          </div>
        )}
      </div>

      <button
        onClick={onSubmit}
        disabled={!canSubmit}
        style={{
          width: '100%',
          padding: '18px',
          background: !canSubmit ? '#D1D5DB' : theme.green,
          color: theme.white,
          border: 'none',
          borderRadius: '12px',
          fontSize: '18px',
          fontWeight: '700',
          cursor: !canSubmit ? 'not-allowed' : 'pointer'
        }}
      >
        {isSubmitting ? 'Loading...' : 'Get My Free Results & Expert Case Review'}
      </button>

      {/* Transparency box */}
      <div style={{
        marginTop: '12px',
        padding: '12px',
        background: theme.grayLight,
        borderRadius: '8px',
        fontSize: '12px',
        color: theme.gray,
        lineHeight: 1.5,
        textAlign: 'center'
      }}>
        By submitting, your personalized results will be emailed to you, and a VA disability expert from our team will call you to discuss how we can help. There is never a fee to you.
      </div>

      <NoFeeGuarantee style={{ marginTop: '16px' }} />

      <div style={{ marginTop: '16px' }}>
        <TestimonialCard testimonialIndex={testimonialIndex} compact />
      </div>

      <button
        onClick={onBack}
        style={{
          width: '100%',
          marginTop: '12px',
          padding: '10px',
          background: 'transparent',
          color: theme.gray,
          border: 'none',
          fontSize: '13px',
          cursor: 'pointer'
        }}
      >
        ← Back
      </button>
    </ScreenWrapper>
  );
}
