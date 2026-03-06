import React from 'react';

const ProgressBar = ({ label, value }) => {
  const safeValue = Math.max(0, Math.min(100, value || 0));

  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.9rem',
          marginBottom: '0.25rem'
        }}
      >
        <span>{label}</span>
        <span>{safeValue}%</span>
      </div>
      <div
        style={{
          width: '100%',
          height: 18,
          borderRadius: 999,
          background: '#eceff1',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${safeValue}%`,
            height: '100%',
            borderRadius: 999,
            background:
              safeValue > 75
                ? '#66bb6a'
                : safeValue > 40
                ? '#ffa726'
                : '#ef5350',
            transition: 'width 0.3s ease'
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
