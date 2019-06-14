import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap'
import CanvasJSReact from '../canvasjs.react'
import withRouter from 'react-router-dom'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LaptopInfo extends Component {
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            laptops: [],
            show: true,
        };
    }



    componentDidMount() {
        const { match: { params } } = this.props
        fetch(`http://localhost:9000/api/laptops/${params.laptopId}`)
            .then(results => {

                return results.json()
            }).then(data => {
                this.setState({ laptops: data })
            })
    }
    handleClose() {
        this.setState({ show: false });
        this.props.history.push(`/laptops/`)
    }

    handleShow() {
        this.setState({ show: true });
    }
    render() {
        var dps = []
        var options = {
            animationEnabled: true,

            title: {
                text: ''
            },
            axisX: {
                valueFormatString: "DD MMMM"
            },
            axisY: {
                title: 'Laptop Price',
                prefix: "$",
                includeZero: false
            },
            data: [{
                yValueFormatString: "$#,###",
                xValueFormatString: "DD MMMM YYYY",
                type: "line",
                dataPoints: dps
            }]
        }

        this.state.laptops.forEach(laptop => {
            dps.push({
                x: new Date(laptop.datecreated),
                y: laptop.price
            })
        })
        console.log(this.state)
        return (

            <>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>

                    </Modal.Header>

                    <CanvasJSChart options={options}></CanvasJSChart>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );

    }
}
export default LaptopInfo;