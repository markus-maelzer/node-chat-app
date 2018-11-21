import React, { Component } from 'react';

import ChatSidebar from './chat-sidebar';
import ChatWindow from './chat-window';
import MessageForm from './message-form';

export default class Chat extends Component {
  render() {
    return (
      <div className="chat">
        <ChatSidebar />
        <div className="chat__main">
          <ChatWindow />
          <div className="chat__footer">
            <MessageForm />
          </div>
        </div>
      </div>
    );
  }
}
