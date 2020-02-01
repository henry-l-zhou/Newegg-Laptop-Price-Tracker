import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
class LaptopForm extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(event) {
        event.preventDefault()
        this.setState({ value: event.target.value });

    }

    render() {

        return (
            <div style={{ marginBottom: "2rem", marginTop: "2rem", marginRight: "20%", marginLeft: "20%", width: '400rem'}}>
                <Form inline>
                    <Form.Control type="text" name="name" placeholder="Enter In A Laptop Name or Newegg Laptop ID" value={this.state.value}
                        onChange={this.handleChange}/>
                    <Link to={`/laptops/search/${encodeURIComponent(this.state.value)}`}>
                        <Button type = "submit" variant = "outline-info" value={this.state.value} style={{height: 40, width:40}}>
                            <FontAwesomeIcon icon = {faSearch} ></FontAwesomeIcon>
                        </Button>
                    </Link>
                </Form>
            </div>
        )
    }
}
export default LaptopForm;