import React, { useState } from 'react';
import { theme } from '../../constants/theme';
import { isValidEmail, isValidPhone } from '../../utils/validation';
import ScreenWrapper from '../shared/ScreenWrapper';
import NoFeeGuarantee from '../shared/NoFeeGuarantee';
import TestimonialCard from '../shared/TestimonialCard';

export default function ResultsScreen({
  results,
  leadInfo,
  setLeadInfo,
  veteranFirstName,
  isSubmitting,
  leadSubmitted,
  onSubmit,
  testimonialIndex
}) {
  const displayName = veteranFirstName || leadInfo.firstName;

  const emailValid = !leadInfo.email || isValidEmail(leadInfo.email);
  const phoneValid = !leadInfo.phone || leadInfo.phone.length === 0 || isValidPhone(leadInfo.phone);

  const canSubmit = leadInfo.lastName &&
    isValidPhone(leadInfo.phone) &&
    isValidEmail(leadInfo.email) &&
    !isSubmitting;

  return (
    <ScreenWrapper>
      {/* Results Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{
          fontSize: '22px',
          fontWeight: '800',
          color: theme.grayDark,
          marginBottom: '8px',
          lineHeight: 1.2
        }}>
          {displayName}, Here Are Your Results
        </h2>
        <p style={{ color: theme.gray, fontSize: '14px' }}>
          Based on your answers, here's your estimated VA disability increase:
        </p>
      </div>

      {/* Rating Increase */}
      <div style={{
        background: theme.greenLight,
        borderRadius: '16px',
        padding: '24px',
        textAlign: 'center',
        marginBottom: '16px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '16px'
        }}>
          <div>
            <div style={{ fontSize: '13px', color: theme.gray, marginBottom: '4px' }}>Current</div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: theme.gray }}>{results.currentRating}%</div>
          </div>
          <div style={{ fontSize: '28px', color: theme.green }}>→</div>
          <div>
            <div style={{ fontSize: '13px', color: theme.greenDark, marginBottom: '4px' }}>Projected</div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: theme.green }}>{results.projectedRating}%</div>
          </div>
        </div>

        {results.qualifiesForIncrease ? (
          <div style={{
            background: theme.white,
            borderRadius: '12px',
            padding: '16px',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '12px', color: theme.gray, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Monthly Increase</div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: theme.green }}>
                  +${results.monthlyIncrease.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div style={{ borderTop: `1px solid ${theme.grayLight}`, paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '11px', color: theme.gray }}>Annual</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: theme.grayDark }}>
                    +${results.annualIncrease.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: theme.gray }}>5-Year Value</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: theme.grayDark }}>
                    +${results.fiveYearValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ fontSize: '15px', color: theme.greenDark, lineHeight: 1.5 }}>
            Based on your answers, we don't see a clear rating increase — but many factors can't be captured here. A free expert case review can uncover options the calculator can't.
          </div>
        )}
      </div>

      {/* Lead Form or Confirmation */}
      {!leadSubmitted ? (
        <div>
          <div style={{
            background: theme.white,
            border: `2px solid ${theme.purple}`,
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '16px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '800',
              color: theme.grayDark,
              textAlign: 'center',
              marginBottom: '6px'
            }}>
              Want Us to Fight for This Increase?
            </h3>
            <p style={{
              fontSize: '14px',
              color: theme.gray,
              textAlign: 'center',
              marginBottom: '16px',
              lineHeight: 1.5
            }}>
              Get a free expert case review. We handle everything — you never pay a fee.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
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
              {isSubmitting ? 'Submitting...' : 'Get My Free Expert Case Review'}
            </button>

            <div style={{
              marginTop: '10px',
              fontSize: '12px',
              color: theme.gray,
              lineHeight: 1.5,
              textAlign: 'center'
            }}>
              A VA disability expert will call you to discuss your case. There is never a fee to you.
            </div>
          </div>

          <NoFeeGuarantee style={{ marginBottom: '16px' }} />
          <TestimonialCard testimonialIndex={testimonialIndex} compact />
        </div>
      ) : (
        <div style={{
          background: theme.greenLight,
          borderRadius: '16px',
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>✅</div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: theme.greenDark, marginBottom: '8px' }}>
            You're All Set, {displayName}!
          </h3>
          <p style={{ color: theme.greenDark, fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>
            A VA disability expert will call you within 24 hours to discuss your case and how we can help you get this increase.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '18px' }}>📧</span>
              <span style={{ color: theme.greenDark, fontSize: '14px' }}>Full report sent to <strong>{leadInfo.email}</strong></span>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '18px' }}>📞</span>
              <span style={{ color: theme.greenDark, fontSize: '14px' }}>Expert will call you within 24 hours</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '18px' }}>🛡️</span>
              <span style={{ color: theme.greenDark, fontSize: '14px' }}>We handle everything — no fee, ever</span>
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <p style={{ color: theme.greenDark, fontSize: '14px' }}>
              <strong>Questions?</strong> Call us at <a href="tel:1-866-445-5375" style={{ color: theme.greenDark }}>1-866-HILLER LAW</a>
            </p>
          </div>
        </div>
      )}
    </ScreenWrapper>
  );
}
