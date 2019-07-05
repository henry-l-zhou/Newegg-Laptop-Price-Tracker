import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap'
import CanvasJSReact from '../canvasjs.react'
import {  Link } from "react-router-dom";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LaptopInfo extends Component {
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            laptops: [{}],
            show: true,
        }
        console.log(props)
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
            zoomEnabled: true, 
            title: {
                text: ''
            },
            axisX: {
                valueFormatString: "DD MMMM",
                interlacedColor: "#F0F8FF" 
            },
            axisY: {
                title: '',
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
        console.log(this.state.laptops)
        return (
            
            <>
                <Modal size="lg" show={this.state.show} onHide={this.handleClose} centered>
                    <Modal.Header closeButton >
                        Laptop Details: {this.state.laptops[0].name}
                    </Modal.Header>    
                    
                    <div style = {{ display:"flex", flexDirection: "row"}}>
                        <div style = {{width: "50%"}}>
                            <Modal.Body>
                                <p>
                                {this.state.laptops[0].type && <>
                                    Type: {this.state.laptops[0].type}
                                    </>
                                }
                                </p>
                                <p>
                                {this.state.laptops[0].resolution && <>
                                    Resolution: {this.state.laptops[0].resolution}
                                    </>
                                }
                                </p>
                                <p>
                                {this.state.laptops[0].type && <>
                                    Weight: {this.state.laptops[0].weight}
                                    </>
                                }
                                </p>
                                <p>
                                {this.state.laptops[0].graphics_card && <>
                                    Graphics Card: {this.state.laptops[0].graphics_card}
                                    </>
                                }
                                </p>
        
                                <p>
                                {this.state.laptops[0].type && <>
                                    <a href={this.state.laptops[0].item_url} target="_blank" rel="noopener noreferrer"><Button variant="info">Buy</Button></a>
                                    </>
                                }
                                </p>
                            </Modal.Body>
                        </div>
                        <div style = {{width: "100%", margin: "1rem"}}>
                            <CanvasJSChart options={options}></CanvasJSChart>
                        </div>
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )

    }
}
export default LaptopInfo;