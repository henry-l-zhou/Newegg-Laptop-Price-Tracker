import React from 'react';
import { Card, Button } from 'react-bootstrap'
const Laptops = (props) => (

    props.laptops.map((laptop) => {

        return (
            <div key={laptop.serial_id} >
                <Card style={{ width: '20rem', display: 'inline', float: 'left' }} >
                    <Card.Img variant="top" src={laptop.image_url} />
                    <Card.Body>
                        <Card.Title>{laptop.name.length < 20 ? `${laptop.name}` : `${laptop.name.substring(0, 65)}...`}
                        </Card.Title>
                        <Button variant="primary">Learn More</Button>
                    </Card.Body>
                </Card>



            </div>
        );

    })
);

export default Laptops;