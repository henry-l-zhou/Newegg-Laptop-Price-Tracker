import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap'
import {  Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faSearch} from '@fortawesome/free-solid-svg-icons'
const Header = () => {
    return (
        <div>
            <Navbar expand="lg" bg="info" variant="info">
                <Nav className="mr-auto" style = {{display: "flex", flexDirection: "row"}}>
                    <Link to="/"><Button variant="info" size = "lg"><FontAwesomeIcon icon = {faHome} /></Button></Link>
                    <Link to="/laptops"><Button variant="info" size = "lg"><FontAwesomeIcon icon = {faSearch}></FontAwesomeIcon></Button></Link>
                    {/* <Link to="/pricedrops"><Button variant="info" size = "lg">Top Price Drops</Button></Link> */}
                </Nav>
            </Navbar>
        </div>
    )
}

export default Header