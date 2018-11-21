import React, { Component } from 'react';

import './App.css';

class App extends Component {
  render() {
    var greeting = 'Road to learning react';
    return (
      <div className="App">
        <h1>{greeting}</h1>
      </div>
    );
  }
}

export default App;
