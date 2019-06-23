import React from 'react';
import { Card, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import LaptopInfo from "./laptopinfo";

const Laptops = (props) => (

    props.laptops.map((laptop) => {

        return (

            <div key={laptop.serial_id} >
                <Card border="secondary" style={{ width: '20rem', display: 'flex', float: 'left' }} >
                    <Card.Img variant="top" src={laptop.image_url} onError={(e)=>{e.target.onerror = null; e.target.src="http://via.placeholder.com/300x225"}} />
                    <Card.Body>
                        <Card.Title>{laptop.name.length < 20 ? `${laptop.name}` : `${laptop.name.substring(0, 65)}...`}
                        </Card.Title>
                        <Card.Text>
                            Laptop Price: ${laptop.price}
                        </Card.Text>
                        <Link to={`/laptops/${laptop.id}`}><Button variant="dark">Learn More</Button></Link>
                    </Card.Body>
                </Card>
                <div>

                </div>

            </div>


        );

    })
);

export default Laptops;