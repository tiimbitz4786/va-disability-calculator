import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
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

  const fmtMoney = (val) => val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      {/* Team Photo Banner */}
      <div style={{
        width: '100%',
        marginBottom: '0',
        borderRadius: '20px 20px 0 0',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
      }}>
        <img
          src="/team-photo1.jpg"
          alt="Hiller Comerford Attorneys"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      <div style={{
        background: theme.white,
        borderRadius: '0 0 20px 20px',
        padding: '28px 24px',
        boxShadow: '0 10px 40px rgba(93,58,142,0.15)',
        marginTop: '0'
      }}>
      {results.qualifiesForIncrease ? (
        <>
          {/* Big Money Hero */}
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <h2 style={{
              fontSize: '22px',
              fontWeight: '800',
              color: theme.grayDark,
              lineHeight: 1.3,
              marginBottom: '12px'
            }}>
              {displayName}, You Could Be Receiving an Extra
            </h2>
            <div style={{
              fontSize: '52px',
              fontWeight: '900',
              color: theme.green,
              lineHeight: 1.1,
              marginBottom: '4px'
            }}>
              ${fmtMoney(results.monthlyIncrease)}
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: theme.grayDark
            }}>
              every single month
            </div>
          </div>

          {/* Rating Badge */}
          <div style={{
            background: theme.greenLight,
            borderRadius: '12px',
            padding: '14px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '12px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: theme.gray }}>Current Rating</div>
              <div style={{ fontSize: '26px', fontWeight: '800', color: theme.gray }}>{results.currentRating}%</div>
            </div>
            <div style={{ fontSize: '24px', color: theme.green }}>→</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: theme.greenDark, fontWeight: '600' }}>Your Potential Rating</div>
              <div style={{ fontSize: '26px', fontWeight: '800', color: theme.green }}>{results.projectedRating}%</div>
            </div>
          </div>

          {/* Stacked Dollar Amounts */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '16px'
          }}>
            <div style={{
              flex: 1,
              background: '#F0FDF4',
              borderRadius: '10px',
              padding: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', color: theme.gray, marginBottom: '2px' }}>Per Year</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: theme.grayDark }}>
                ${fmtMoney(results.annualIncrease)}
              </div>
            </div>
            <div style={{
              flex: 1,
              background: '#F0FDF4',
              borderRadius: '10px',
              padding: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', color: theme.gray, marginBottom: '2px' }}>Over 5 Years</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: theme.grayDark }}>
                ${fmtMoney(results.fiveYearValue)}
              </div>
            </div>
          </div>

          {/* Urgency / Value Statement */}
          <div style={{
            background: '#FEF3C7',
            borderRadius: '10px',
            padding: '12px 16px',
            marginBottom: '20px',
            textAlign: 'center',
            fontSize: '14px',
            color: '#92400E',
            lineHeight: 1.5,
            fontWeight: '600'
          }}>
            Every month you wait is another ${fmtMoney(results.monthlyIncrease)} you're leaving on the table. Most veterans who qualify never file.
          </div>
        </>
      ) : (
        /* Non-qualifying flow */
        <div style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{
            fontSize: '22px',
            fontWeight: '800',
            color: theme.grayDark,
            marginBottom: '8px'
          }}>
            {displayName}, Let's Take a Closer Look
          </h2>
          <div style={{
            background: theme.greenLight,
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '12px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: theme.gray }}>Current</div>
                <div style={{ fontSize: '26px', fontWeight: '800', color: theme.gray }}>{results.currentRating}%</div>
              </div>
              <div style={{ fontSize: '24px', color: theme.green }}>→</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: theme.greenDark }}>Projected</div>
                <div style={{ fontSize: '26px', fontWeight: '800', color: theme.green }}>{results.projectedRating}%</div>
              </div>
            </div>
            <p style={{ fontSize: '14px', color: theme.greenDark, lineHeight: 1.5 }}>
              Our calculator can only capture so much. Veterans often have conditions and secondary connections that don't show up here. Our attorneys regularly find increases the calculator misses.
            </p>
          </div>
        </div>
      )}

      {/* Lead Form or Confirmation */}
      {!leadSubmitted ? (
        <div ref={formRef}>
          <div style={{
            background: theme.white,
            border: `2px solid ${theme.green}`,
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '16px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '800',
              color: theme.grayDark,
              textAlign: 'center',
              marginBottom: '4px'
            }}>
              {results.qualifiesForIncrease
                ? "Don't Leave This Money Unclaimed"
                : "Get a Free Expert Case Review"}
            </h3>
            <p style={{
              fontSize: '14px',
              color: theme.gray,
              textAlign: 'center',
              marginBottom: '16px',
              lineHeight: 1.5
            }}>
              {results.qualifiesForIncrease
                ? "Our VA disability attorneys will review your case, file your claim, and fight for your increase — you'll never pay anything out of pocket."
                : "Our attorneys have helped thousands of veterans uncover benefits they didn't know they qualified for. Let us take a look — it's completely free."}
            </p>

            {/* What You Get */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginBottom: '16px',
              padding: '12px',
              background: theme.grayLight,
              borderRadius: '10px'
            }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: theme.grayDark }}>
                <span style={{ color: theme.green, fontWeight: '800' }}>+</span> Free case review by a VA disability attorney
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: theme.grayDark }}>
                <span style={{ color: theme.green, fontWeight: '800' }}>+</span> We handle all the paperwork and filing
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: theme.grayDark }}>
                <span style={{ color: theme.green, fontWeight: '800' }}>+</span> No Fee Guarantee — you never pay out of pocket
              </div>
            </div>

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
              {isSubmitting
                ? 'Submitting...'
                : results.qualifiesForIncrease
                  ? 'Claim My Free Case Review'
                  : 'Get My Free Case Review'}
            </button>

            <div style={{
              marginTop: '10px',
              fontSize: '12px',
              color: theme.gray,
              lineHeight: 1.5,
              textAlign: 'center'
            }}>
              A VA disability expert from our team will call you to discuss your case. No obligation. No out-of-pocket cost.
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
              <span style={{ color: theme.greenDark, fontSize: '14px' }}>We handle everything — No Fee Guarantee</span>
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <p style={{ color: theme.greenDark, fontSize: '14px' }}>
              <strong>Questions?</strong> Call us at <a href="tel:1-866-445-5375" style={{ color: theme.greenDark }}>1-866-HILLER LAW</a>
            </p>
          </div>
        </div>
      )}
      </div>

      {/* Sticky CTA Button — rendered via portal to escape stacking context */}
      {!leadSubmitted && createPortal(
        <div style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          padding: '12px 16px',
          paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
          background: 'linear-gradient(transparent, rgba(255,255,255,0.95) 20%)',
          zIndex: 9999
        }}>
          <button
            onClick={scrollToForm}
            style={{
              width: '100%',
              maxWidth: '500px',
              margin: '0 auto',
              display: 'block',
              padding: '18px',
              background: theme.green,
              color: theme.white,
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
            }}
          >
            Claim My Free Case Review
          </button>
        </div>,
        document.body
      )}
    </>
  );
}
