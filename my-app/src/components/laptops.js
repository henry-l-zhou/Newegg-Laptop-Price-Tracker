import React, { Component } from "react";
import { Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";

class Laptops extends Component{
    constructor(props) {
        super(props)
        //console.log(props)
    }

    render(){
        //console.log(this.props)
        return this.props.laptops.map((laptop) => {
            return (
                <div key={laptop.serial_id} style={{ width: '25%', minWidth: 250,height: 625,display: 'flex', float: 'left', marginBottom: 25}}>
                    <Card border="info"  >
                        <Card.Img variant="top" src={laptop.image_url} onError={(e)=>{e.target.onerror = null; e.target.src="http://via.placeholder.com/300x225"}} />
                        <Card.Body>
                            <Card.Title>{`${laptop.name}`}
                            </Card.Title>
                            <Card.Text>
                                Laptop Price: ${laptop.price}
                            </Card.Text>
                            <div style = {{ bottom: 0, position: "absolute", marginBottom: 25}}>
                                <Link to={`/laptops/${laptop.name}`}><Button variant="info">Learn More</Button></Link>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            )
        })
    
        
    }
    
}

export default Laptops;