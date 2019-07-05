import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap'
import {  Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faSearch } from '@fortawesome/free-solid-svg-icons'
const Header = () => {
    return (
        <div>
            <Navbar bg="info" variant="info">
                <Nav className="mr-auto">
                    <Link to="/"><Button variant="info"><FontAwesomeIcon icon = {faHome}></FontAwesomeIcon></Button></Link>
                    <Link to="/laptops"><Button variant="info"><FontAwesomeIcon icon = {faSearch}></FontAwesomeIcon></Button></Link>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Header