import React, { Component } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import Quote from './Quote';
import Landing from './Landing';
import { Transition, config } from 'react-spring'

class App extends Component {
  render() {
    return (
      <Router>
        <Route
          render={({ location }) => (

            <Transition
              config={config.slow}
              keys={location.pathname}
              from={{ opacity: 0, transform: 'translate(50px, 0px)' }}
              enter={{ opacity: 1, transform: 'translate(0px, 0px)' }}
              leave={{ opacity: 0, transform: 'translate(-400px, 0px)' }}>
              {style => (
                <Switch location={location}>
                  <Route exact path="/" render={props => <Landing {...props} style={style} />} />
                  <Route exact path="/quote" render={props => <Quote {...props} style={style} />} />
                  <Redirect to="/" />
                </Switch>
              )}
            </Transition>
          )} />
      </Router>
    );
  }
}

export default App;
