import React from 'react';
import moment from 'moment';

export const Message = ({
  from,
  createdAt,
  text,
  className = ''
}) => (
  <li className={`message ${className}`}>
    {`${from} ${moment(createdAt).format('hh, m a')}: ${text}`}
  </li>
);
