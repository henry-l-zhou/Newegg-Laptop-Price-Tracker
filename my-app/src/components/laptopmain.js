import React, { Component } from 'react';
import LaptopForm from "./laptopform";
import Laptops from "./laptops";
import Pagination from "./pagination"
class LaptopMain extends Component {
    constructor(){
        super()
        
        this.state = {
            laptops: [],
            pageOfItems: []
        }
        this.onChangePage = this.onChangePage.bind(this);
    }

    getLaptops = async (e) => {

        const laptopName = e.target.value;

        e.preventDefault();
        const api_call = await fetch(`http://localhost:9000/api/distinctlaptopsname/${laptopName}`);
        const data = await api_call.json();
        this.setState({ laptops: data })

    }
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }


    render() {
        console.log(this.state.laptops)
        console.log(this.state.pageOfItems)
        return (
            <div style={{ marginLeft: '1rem' }}>
                <LaptopForm getLaptops={this.getLaptops} />
                <Laptops laptops={this.state.pageOfItems}></Laptops>
                <Pagination items={this.state.laptops} onChangePage={this.onChangePage} />
            </div>
        );
    }
}
export default LaptopMain