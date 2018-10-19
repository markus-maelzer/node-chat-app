import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { socketEmit, CREATE_MESSAGE } from '../redux';
import { Button } from './reusable';


class MessageForm extends Component {
  state = {
    message: '',
    locationLoading: false,
  }

  handleSubmit = e => {
    e.preventDefault();
    const { message } = this.state;
    if(message.length === 0) return;

    this.props.socketEmit(CREATE_MESSAGE, {
      from: this.props.user.username,
      text: message,
      createdAt: moment().valueOf()
    }, () => {
      this.setState({ message: '' });
    })
  }


  handleInput = e => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({
      message: value
    });
  }

  handleLocationButton = () => {
    if(!navigator.geolocation) {
      return alert('Geolocation not supported by your browser :( (better get chrome ;b)');
    }
    this.setState({
      locationLoading: true,
    })
    navigator.geolocation.getCurrentPosition(({coords: { latitude, longitude}}) => {
      this.props.socketEmit(CREATE_MESSAGE, {
        from: this.props.user.username,
        text: this.state.message,
        createdAt: moment().valueOf()
      }, () => {
        this.setState({
          message: '',
          locationLoading: false,
        });
      })
    });
  }

  render() {
    const { locationLoading } = this.state;
    return (
      <React.Fragment>
        <form id="message-form" onSubmit={this.handleSubmit}>
          <input
            name="message"
            placeholder="message"
            autoFocus
            autoComplete="off"
            value={this.state.message}
            onChange={this.handleInput}
          />
          <Button> send</Button>
        </form>
        <Button
          onClick={this.handleLocationButton}
        >
          {locationLoading ? 'Loading Location' : 'Send Location'}
        </Button>
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
