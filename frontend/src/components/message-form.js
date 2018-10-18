import React, { Component } from 'react';

export default class  extends Component {
  state = {
    message: '',
  }

  handleSubmit = e => {
    e.preventDefault();
  }

  handleInput = e => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({
      message: value
    });
  }

  render() {
    return (
      <React.Fragment>
        <form id="message-form" onSubmit={this.handleSubmit}>
          <input
            id="message" name="message"
            placeholder="message"
            autoFocus
            autoComplete="off"
            onChange={this.handleInput}
          />
          <button id="send">send</button>
        </form>
        <button id="send-location">Send Location</button>
      </React.Fragment>
    );
  }
}
