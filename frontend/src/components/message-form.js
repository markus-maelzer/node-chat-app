import React, { Component } from 'react';
import { connect } from 'react-redux';

import { socketEmit } from '../redux';

const CREATE_MESSAGE = 'create-message';

class MessageForm extends Component {
  state = {
    message: '',
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.socketEmit(CREATE_MESSAGE, )
  }

  handleInput = e => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({
      message: value
    });
  }

  generateMessage = () => {

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

const mapStateToProps = ({ user }) => ({
  user
})

export default connect(
  mapStateToProps, { socketEmit }
)(MessageForm);
