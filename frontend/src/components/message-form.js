import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { socketEmit, NEW_MESSAGE } from '../redux';
import { Button, Input } from './reusable';


class MessageForm extends Component {
  state = {
    message: '',
    locationLoading: false,
    disableButton: false,
  }

  handleSubmit = e => {
    e.preventDefault();
    const { message, disableButton } = this.state;
    if(message.length === 0 || disableButton) return;
    this.setState({
      disableButton: true,
    })

    this.props.socketEmit(NEW_MESSAGE, 'create-message', {
      from: this.props.user.username,
      text: message,
      createdAt: moment().valueOf()
    }, () => {
      this.setState({ message: '', disableButton: false });
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
    const { locationLoading } = this.state;
    if(locationLoading) return;

    this.setState({
      locationLoading: true,
    })
    navigator.geolocation.getCurrentPosition(({coords: { latitude, longitude }}) => {
      this.props.socketEmit(NEW_MESSAGE, 'create-location-message', {
        from: this.props.user.username,
        latitude,
        longitude,
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
    const { locationLoading, disableButton } = this.state;
    return (
      <React.Fragment>
        <form id="message-form" onSubmit={this.handleSubmit}>
          <Input
            name="message"
            placeholder="message"
            autoFocus
            autoComplete="off"
            value={this.state.message}
            onChange={this.handleInput}
          />
          <Button>send</Button>
        </form>
        <Button
          onClick={this.handleLocationButton}
          disableButton={disableButton}
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
