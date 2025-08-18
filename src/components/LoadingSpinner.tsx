"use client";

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
}

export default function LoadingSpinner({ 
  size = 'medium', 
  color = '#FF6B8A',
  text = 'Loading...'
}: LoadingSpinnerProps) {
  const sizeMap = {
    small: '20px',
    medium: '40px',
    large: '60px'
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          border: `3px solid #f3f3f3`,
          borderTop: `3px solid ${color}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: text ? '15px' : '0'
        }}
      />
      {text && (
        <p style={{
          color: '#666',
          fontSize: '14px',
          margin: 0,
          textAlign: 'center'
        }}>
          {text}
        </p>
      )}
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
