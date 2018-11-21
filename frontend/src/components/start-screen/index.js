import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { simpleAction, USER } from '../../redux';

class StartScreen extends Component {
  state = {
    redirect: false,
    username: localStorage.getItem('username') || '',
    room: localStorage.getItem('room') || 'test'
  }

  componentDidUpdate() {
    if(this.state.redirect || !this.props.user.username) return;
    this.setState({
      redirect: true,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setUser();
  }

  handleOnChange = e => {
    var name = e.target.getAttribute('name');
    this.setState({
      [name]: e.target.value
    })
  }

  setUser = () => {
    const { username, room } = this.state;
    if(!username || !room) return;

    localStorage.setItem('username', username);
    localStorage.setItem('room', room);
    this.props.simpleAction(USER, {
      username,
      room
    });
  }

  render() {
    if(this.state.redirect) return <Redirect to={{pathname: '/chat'}} />;
    return (
      <div className="centered-form">
        <div className="centered-form__form">
          <form onSubmit={this.handleSubmit}>
            <div className="form-field">
              <h3>Join a Chat</h3>
            </div>
            <div className="form-field">
              <label>Display name</label>
              <input
                onChange={this.handleOnChange}
                type="text" name="username" autoFocus
              />
            </div>
            <div className="form-field">
              <label>Room</label>
              <input
                onChange={this.handleOnChange}
                type="text" name="room"
              />
            </div>
            <div className="form-field">
              <button type="submit">Join</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(
  mapStateToProps,
  { simpleAction }
)(StartScreen);
