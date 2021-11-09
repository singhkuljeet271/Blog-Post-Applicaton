import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import App from "./App";
import Profile from "./Profile";

import Forgot from "./Forgot";
import Reset from "./Reset";
class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/App" component={App} />
          <Route path="/Login" component={Login} />
          <Route path="/Profile" component={Profile} />
          <Route path="/Forgot" component={Forgot} />
          <Route path="/Reset/:id" component={Reset} />
        </Switch>
      </div>
    );
  }
}

export default Main;
