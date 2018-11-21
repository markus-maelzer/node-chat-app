import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class StartScreen extends Component {
  state = {
    redirect: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      redirect: true,
    })
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
              <input type="text" name="name" autofocus />
            </div>
            <div className="form-field">
              <label>Display name</label>
              <input type="text" name="room" />
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
