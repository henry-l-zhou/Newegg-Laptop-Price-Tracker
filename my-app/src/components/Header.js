import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
const Header = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <Link to="/"><Button variant="dark">Home</Button></Link>
                    <Link to="/laptops"><Button variant="dark">Laptops</Button></Link>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Header