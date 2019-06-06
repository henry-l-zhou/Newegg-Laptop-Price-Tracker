import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap'
const LaptopForm = (props) => (
    <div className="col-md-4" style={{ marginBottom: "2rem", marginTop: "2rem", }}>
        <Form onSubmit={props.getLaptops}>
            <Form.Control type="text" name="name" placeholder="Search For Laptops" />
            <Button variant="secondary" type="submit">
                Submit
            </Button>
        </Form>

    </div>
)
export default LaptopForm;