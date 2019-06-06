import React, { Component } from 'react';
import './App.css';
import LaptopMain from "./components/laptopmain"
import Header from "./components/Header"
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Home from "./components/home"
import LaptopInfo from './components/laptopinfo';

class App extends Component {
  render() {
    return (
      <Router >
        <Header></Header>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/laptops" component={LaptopMain}></Route>
        <Route path="/laptops/:laptopId" component={LaptopInfo}></Route>
      </Router>

    );
  }
}

export default App;
