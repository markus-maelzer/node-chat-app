import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { socketOn, NEW_MESSAGE } from '../redux';
import { Message } from './reusable/message';


class ChatWindow extends Component {

  componentDidMount() {
    this.props.socketOn(NEW_MESSAGE, NEW_MESSAGE);
    this.props.socketOn('new-location-message');
  }

  renderMessages = () => {
    if(!this.props.messages) return;
    console.log(this.props.messages);
    return _.map(this.props.messages, ({ from, createdAt, text }) => (
      <Message
        key={createdAt}
        from={from}
        createdAt={createdAt}
        text={text}
      />
    ))
  }

  render() {
    return (
      <ul id="chat-window" className="chat__messages">
        {this.renderMessages()}
      </ul>
    );
  }
}

const mapStateToProps = ({ user, messages }) => ({
  user,
  messages
})

export default connect(
  mapStateToProps, { socketOn }
)(ChatWindow);
