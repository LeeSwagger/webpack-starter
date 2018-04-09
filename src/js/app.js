import React, { Component } from 'react';
import { render } from 'react-dom';
import styles from './../sass/styles.scss';

export default class App extends Component {
  render() {
    return (
      <h1 className={styles["header-custom"]}>
        Hello from react
      </h1>
    );
  }
}

render(<App/>, document.getElementById('app'));
