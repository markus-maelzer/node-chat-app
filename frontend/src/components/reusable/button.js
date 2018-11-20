import React from 'react';

export const Button = ({
  className = '',
  onClick,
  children,
  text,
  disableButton
}) => (
  <button
    className={className}
    onClick={onClick}
    disabled={disableButton}
  >
    {text || children}
  </button>
)
