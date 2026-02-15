import React from 'react';
import { theme } from '../../constants/theme';
import TestimonialCard from '../shared/TestimonialCard';

const TEAM_PHOTO_URL = '/team-photo1.jpg';

export default function WelcomeScreen({ testimonialIndex, setTestimonialIndex, onStart }) {
  return (
    <>
      <div style={{
        width: '100%',
        marginBottom: '0',
        borderRadius: '20px 20px 0 0',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
      }}>
        <img
          src={TEAM_PHOTO_URL}
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
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎖️</div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '800',
            color: theme.grayDark,
            marginBottom: '8px',
            lineHeight: 1.2
          }}>
            Are You Getting the VA Benefits You've <span style={{ color: theme.purple }}>Earned?</span>
          </h1>
          <p style={{ color: theme.gray, fontSize: '15px', lineHeight: 1.5 }}>
            Find out in 60 seconds if you qualify for a higher rating and more compensation.
          </p>
        </div>

        <div style={{
          background: theme.greenLight,
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '28px' }}>💰</div>
            <div>
              <div style={{ fontWeight: '700', color: theme.greenDark, fontSize: '15px' }}>
                Veterans Leave Money on the Table
              </div>
              <div style={{ color: theme.greenDark, fontSize: '13px' }}>
                The average increase we find is worth $15,000+ over 5 years
              </div>
            </div>
          </div>
        </div>

        <div style={{
          background: '#FEF3C7',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px',
          border: '2px solid #F59E0B'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '28px' }}>🛡️</div>
            <div>
              <div style={{ fontWeight: '700', color: '#92400E', fontSize: '15px' }}>
                No Fee Guarantee
              </div>
              <div style={{ color: '#92400E', fontSize: '13px' }}>
                You'll never owe us a penny. If we win, the VA pays us directly.
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <TestimonialCard
            testimonialIndex={testimonialIndex}
            setTestimonialIndex={setTestimonialIndex}
          />
        </div>

        <button
          onClick={onStart}
          style={{
            width: '100%',
            padding: '18px',
            background: `linear-gradient(135deg, ${theme.purple}, ${theme.purpleDark})`,
            color: theme.white,
            border: 'none',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(93,58,142,0.3)'
          }}
        >
          Check My Benefits →
        </button>

        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: theme.gray }}>
          ✓ Free &nbsp; ✓ Takes 60 seconds &nbsp; ✓ No obligation
        </p>
      </div>
    </>
  );
}
