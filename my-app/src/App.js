import React, { Component } from 'react';
import './App.css';
import LaptopForm from "./components/LaptopForm";
import Laptops from "./components/laptops";
import { Card, Button, Jumbotron } from 'react-bootstrap'
class App extends Component {
  state = {
    laptops: []
  };


  getLaptops = async (e) => {

    const laptopName = e.target.elements.name.value;
    console.log(laptopName);
    e.preventDefault();
    const api_call = await fetch(`http://localhost:9000/api/distinctlaptops/${laptopName}`);
    const data = await api_call.json();
    this.setState({ laptops: data })
    console.log(this.state.laptops)
  }


  render() {

    return (
      <div >
        <Jumbotron>
          <h1>Henry's Laptop Searcher</h1>
          <p>
            Quickly Searches for Laptops and graphs their prices over time!
          </p>
        </Jumbotron>
        <LaptopForm getLaptops={this.getLaptops} />
        <Laptops laptops={this.state.laptops}></Laptops>
      </div>
    );
  }
}

export default App;
