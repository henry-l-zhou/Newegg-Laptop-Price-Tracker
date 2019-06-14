import React, { Component } from 'react';
import LaptopForm from "./laptopform";
import Laptops from "./laptops";
class LaptopMain extends Component {
    state = {
        laptops: []
    }

    getLaptops = async (e) => {

        const laptopName = e.target.value;

        e.preventDefault();
        const api_call = await fetch(`http://localhost:9000/api/distinctlaptopsname/${laptopName}`);
        const data = await api_call.json();
        this.setState({ laptops: data })

    }

    render() {

        return (
            <div style={{ marginLeft: '2rem' }}>
                <LaptopForm getLaptops={this.getLaptops} />
                <Laptops laptops={this.state.laptops}></Laptops>
            </div>
        );
    }
}
export default LaptopMain