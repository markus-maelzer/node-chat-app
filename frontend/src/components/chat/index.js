import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


import { socket, simpleAction, USER } from '../../redux/';
import { JOIN } from './types';


import ChatSidebar from './chat-sidebar';
import ChatWindow from './chat-window';
import MessageForm from './message-form';

class Chat extends Component {
  state = {
    redirect: false,
  }
  componentDidMount() {
    if(!this.props.user.username) {
      this.setUser();
      return;
    }
    socket.emit(JOIN, this.props.user, this.handleJoinCallback);
  }
  handleJoinCallback = (err) => {
    console.log(err);
    if(err) this.setState({ redirect: true });
  }

  setUser = () => {
    const username = localStorage.getItem('username');
    const room = localStorage.getItem('room');

    if(!room || !username) {
      this.setState({
        redirect: true
      })
      return;
    }
    const user = {
      username,
      room
    };
    socket.emit(JOIN, user, this.handleJoinCallback);
    this.props.simpleAction(USER, user);
  }

  render() {
    if(this.state.redirect) return <Redirect to={{pathname: '/'}} />;
    return (
      <div className="chat">
        <ChatSidebar />
        <div className="chat__main">
          <ChatWindow />
          <div className="chat__footer">
            <MessageForm user={this.props.user} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user
})

export default connect(
  mapStateToProps, { simpleAction }
)(Chat);
