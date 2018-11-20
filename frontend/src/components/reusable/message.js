import React from 'react';
import moment from 'moment';

export const Message = ({
  from,
  createdAt,
  text,
  className = '',
  messageRef = null
}) => {
  return (
    <li className={`message ${className}`} ref={messageRef}>
      <div className="message__title">
        <h4>{from}</h4>
        <span>{moment(createdAt).format('hh, m a')}</span>
      </div>
      <div className="message__body">
        {text}
      </div>
    </li>
  );
}
