import React from 'react';

export const Input = ({
  name = '',
  placeholder = '',
  autoFocus = false,
  autoComplete = '',
  value = '',
  onChange = false,
}) => (
  <input
    name={name}
    placeholder={placeholder}
    autoFocus={autoFocus}
    autoComplete={autoComplete}
    value={value}
    onChange={onChange}
  />
)
