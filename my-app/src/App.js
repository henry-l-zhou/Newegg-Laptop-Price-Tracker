import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from "./components/Form";

class App extends Component {
  state = {
    laptops: []
  };


  getLaptops = async (e) => {

    const laptopName = e.target.elements.laptopName.value;
    e.preventDefault();
    const api_call = await fetch(`http://localhost:9000/api/distinctlaptops/${laptopName}`);
    const data = await api_call.json();
    this.setState({ laptops: data })
    console.log(this.state.laptops)
  }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Laptop Search</h1>
        </header>
        <Form getLaptops={this.getLaptops} />
        {this.state.laptops.map((laptop) => {
          return <p key={laptop.serial_id}>{laptop.name}</p>
        })}
      </div>
    );
  }
}

export default App;
