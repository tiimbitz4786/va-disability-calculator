import React from 'react';
import { theme } from '../../constants/theme';
import { TESTIMONIALS } from '../../constants/conditions';

export default function TestimonialCard({ testimonialIndex, setTestimonialIndex, compact }) {
  const testimonial = TESTIMONIALS[testimonialIndex];

  if (compact) {
    return (
      <div style={{
        background: theme.grayLight,
        borderRadius: '10px',
        padding: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ fontSize: '24px' }}>⭐</div>
          <div>
            <p style={{
              fontSize: '13px',
              color: theme.grayDark,
              fontStyle: 'italic',
              lineHeight: 1.5,
              marginBottom: '6px'
            }}>
              "{testimonial.quote}"
            </p>
            <div style={{ fontSize: '12px', color: theme.gray, fontWeight: '600' }}>
              — {testimonial.name}, {testimonial.detail}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: theme.grayLight,
      borderRadius: '12px',
      padding: '16px',
      minHeight: '85px'
    }}>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
        {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#FBBF24', fontSize: '14px' }}>★</span>)}
      </div>
      <p style={{
        fontSize: '13px',
        color: theme.grayDark,
        fontStyle: 'italic',
        lineHeight: 1.5,
        marginBottom: '8px'
      }}>
        "{testimonial.quote}"
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '12px', color: theme.gray, fontWeight: '600' }}>
          — {testimonial.name}, {testimonial.detail}
        </div>
        {setTestimonialIndex && (
          <div style={{ display: 'flex', gap: '4px' }}>
            {TESTIMONIALS.map((_, i) => (
              <div
                key={i}
                onClick={() => setTestimonialIndex(i)}
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: i === testimonialIndex ? theme.purple : '#D1D5DB',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
