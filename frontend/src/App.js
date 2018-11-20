import React, { Component } from 'react';

import ChatSidebar from './components/chat-sidebar';
import ChatWindow from './components/chat-window';
import MessageForm from './components/message-form';

export default class App extends Component {
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
