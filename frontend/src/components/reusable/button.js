import React from 'react';

export const Button = ({
  className = '',
  onClick = false,
  children,
  text
}) => (
  <button
    className={className}
    onClick={onClick}
  >
    {text || children}
  </button>
)
