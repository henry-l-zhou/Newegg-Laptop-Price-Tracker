import React, { Component } from 'react';
import './App.css';
import LaptopMain from "./components/laptopmain"
import Header from "./components/Header"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "./components/home"
import LaptopInfo from './components/laptopinfo';
import LaptopForm from './components/laptopform';
import PriceDropPage from './components/pricedroppage';

class App extends Component {
  render() {
    return (
      <Router>
        <Header></Header>
        <Route exact path="/" component={Home}></Route>
        {/* <Route path="/laptops" component={LaptopForm}></Route> */}
        <Route exact path="/laptops/search/:laptopId" component={LaptopMain}></Route>
        <Route exact path="/laptops/item/:laptopId" component={LaptopInfo}></Route>
        <Route exact path="/pricedrops" component = {PriceDropPage}></Route>
      </Router>

    );
  }
}

export default App;
