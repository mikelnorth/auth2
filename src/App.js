import React, { Component } from 'react';
import './App.css';
import axios from 'axios'



class App extends Component {

  // getUserData(){
  //   axios.get('', req, res => {

  //   })
  // }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href='http://localhost:3005/auth'><button>Log In</button></a>
          <button onClick={this.getUserData}></button>
        </header>
      </div>
    );
  }
}

export default App;
