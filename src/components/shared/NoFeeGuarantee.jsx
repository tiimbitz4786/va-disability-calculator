import React from 'react';

export default function NoFeeGuarantee({ style }) {
  return (
    <div style={{
      padding: '12px',
      background: '#FEF3C7',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      ...style
    }}>
      <span style={{ fontSize: '18px' }}>🛡️</span>
      <span style={{ fontSize: '12px', color: '#92400E' }}>
        <strong>No Fee Guarantee.</strong> You pay nothing. If we win, the VA pays us.
      </span>
    </div>
  );
}
