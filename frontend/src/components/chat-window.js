import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { socketOn, NEW_MESSAGE } from '../redux';
import { Message } from './reusable/message';


class ChatWindow extends Component {
  chatWindow = React.createRef();
  mesageRef = null;

  componentDidMount() {
    this.props.socketOn(NEW_MESSAGE, NEW_MESSAGE);
    this.props.socketOn('new-location-message');
  }

  componentDidUpdate() {
    this.handleAutoScroll();
  }

  setMessageRef = (ref) => {
    this.messageRef = ref;
  }

  renderMessages = () => {
    if(!this.props.messages) return;
    return _.map(this.props.messages, ({ from, createdAt, text }) => (
      <Message
        key={createdAt}
        from={from}
        createdAt={createdAt}
        text={text}
        messageRef={this.setMessageRef}
      />
    ))
  }


  handleAutoScroll = (e) => {
    if(!this.chatWindow.current) return;
    const { clientHeight, scrollHeight, scrollTop } = this.chatWindow.current;
    console.log(this.messageRef);
    if(!this.messageRef || clientHeight >= scrollHeight) return;
    if(clientHeight + scrollTop +this.messageRef.clientHeight >= scrollHeight) {
      this.chatWindow.scrollTop = scrollHeight;
    }
  }

  render() {
    return (
      <ul ref={this.chatWindow} id="chat-window" className="chat__messages">
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
