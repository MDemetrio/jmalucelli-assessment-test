import React, { Component } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import Quote from './Quote';
import Landing from './Landing';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/quote" component={Quote} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;
