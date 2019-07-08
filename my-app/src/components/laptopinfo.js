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
    }

    componentDidMount() {
        
        const { match: { params } } = this.props
        console.log(this.props)
        fetch(`http://localhost:9000/api/laptops/${encodeURI(params.laptopId)}`)
            .then(results => {

                return results.json()
            }).then(data => {
                this.setState({ laptops: data })
            }).catch((e)=>
            {
                console.log(e)
            })
    }

    handleClose() {
        this.setState({ show: false })
        this.props.history.goBack()
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
            <div style = {{margin: "3rem"}}>
                <div style = {{ display:"flex", justifyContent: "center", marginBottom: "2rem"}}>
                    
                    {this.state.laptops[0].name && <>
                    <center><strong>{this.state.laptops[0].name}</strong></center>
                    </>
                    }                
                </div>

                <div style = {{ display:"flex", flexDirection: "row"}}>
                    <div style = {{width: "50%", height:"50%"}}>
                        <img src={this.state.laptops[0].image_url} onError={(e)=>{e.target.onerror = null; e.target.src="http://via.placeholder.com/300x225"}}/>                        
                    </div>
                    <div style = {{width: "100%", margin: "1rem", height:"50%"}}>
                        <CanvasJSChart options={options}></CanvasJSChart>
                    </div>
                </div>
                <div>
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
                </div>
            </div>
        )

    }
}
export default LaptopInfo;