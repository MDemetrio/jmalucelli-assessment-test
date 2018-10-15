import React, { Component } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import Quote from './Quote';
import Landing from './Landing';

class App extends Component {
  
  componentDidMount() {
    localStorage.setItem('ACCESS-TOKEN', 23456789)
  }

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
