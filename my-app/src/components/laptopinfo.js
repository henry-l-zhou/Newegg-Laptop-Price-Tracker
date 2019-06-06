import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap'

class LaptopInfo extends Component {
    state = {
        laptops: []
    }

    componentDidMount() {
        const { match: { params } } = this.props
        fetch(`http://localhost:9000/api/laptops/${params.laptopId}`)
            .then(results => {

                return results.json()
            }).then(data => {
                this.setState({ laptops: data })
            }).then(lol => {
                console.log(this.state.laptops)
            })



    }
    render() {

        return (
            <div>
                {this.state.laptops.map((laptop) => {
                    return (
                        <div key={laptop.serial_id}>{laptop.name}</div>


                    )

                }
                )}

            </div>

                    );
                }
}
                export default LaptopInfo;