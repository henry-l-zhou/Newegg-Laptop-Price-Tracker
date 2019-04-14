import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from "./components/Form";

class App extends Component {
  getLaptops = (e) => {
    const laptopName = e.target.elements.laptopName.value;
    e.preventDefault();
    console.log(laptopName)
  }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Laptop Search</h1>
        </header>
        <Form getLaptops={this.getLaptops} />
      </div>
    );
  }
}

export default App;
