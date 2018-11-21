import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import StartScreen from './components/start-screen';
import Chat from './components/chat';
// import MainWrapper from './components/main-wrapper';

class MainRouter extends Component { 
  render() {
    return (
      <React.Fragment>
        {/* <Route path="/" component={MainWrapper} /> */}
        <Switch>
          <Route path="/chat" component={Chat} />
          <Route path="/" component={StartScreen} />
          {/* <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
          <PrivateRoute path="/log/success" component={SuccessLog} />
          <PrivateRoute path="/log/error" component={ErrorLog} /> */}
        </Switch>
      </React.Fragment>
    )
  }
}

export default MainRouter;
