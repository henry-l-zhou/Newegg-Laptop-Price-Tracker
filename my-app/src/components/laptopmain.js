import React, { Component } from 'react';
import LaptopForm from "./laptopform";
import Laptops from "./laptops";
class LaptopMain extends Component {
    state = {
        laptops: []
    }

    getLaptops = async (e) => {

        const laptopName = e.target.elements.name.value;
        console.log(laptopName);
        e.preventDefault();
        const api_call = await fetch(`http://localhost:9000/api/distinctlaptopsname/${laptopName}`);
        const data = await api_call.json();
        this.setState({ laptops: data })
        console.log(this.state.laptops)
    }

    render() {
        return (
            <div>
                <LaptopForm getLaptops={this.getLaptops} />
                <Laptops laptops={this.state.laptops}></Laptops>
            </div>
        );
    }
}
export default LaptopMain