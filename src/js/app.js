import React, { Component } from 'react';
import { render } from 'react-dom';
import './../sass/styles.scss';

export default class App extends Component {
  render() {
    return (
      <h1>
        Hello from react
      </h1>
    );
  }
}

render(<App/>, document.getElementById('app'));
