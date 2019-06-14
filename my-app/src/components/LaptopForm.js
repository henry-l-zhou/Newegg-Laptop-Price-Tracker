import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";

class LaptopForm extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(event) {
        this.setState({ value: event.target.value });

    }

    render() {

        return (
            <div className="col-md-4" style={{ marginBottom: "2rem", marginTop: "2rem", }}>
                <Form>
                    <Form.Control type="text" name="name" placeholder="Search For Laptops" value={this.state.value}
                        onChange={this.handleChange} />
                    <Link to={`/laptops/search/${this.state.value}`}>
                        <Button variant="secondary" type="submit" onClick={this.props.getLaptops} value={this.state.value}>Submit</Button>
                    </Link>

                </Form>
            </div>
        )
    }
}
export default LaptopForm;