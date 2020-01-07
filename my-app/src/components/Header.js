import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap'
import {  Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faSearch} from '@fortawesome/free-solid-svg-icons'
import LaptopForm from './laptopform';
const Header = () => {
    return (
        <div style = {{marginBottom: '10rem'}}>
            <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
                <Nav style = {{display: "flex", flexDirection: "row"}}>
                    <Link to="/"><Button variant="dark" size = "lg"><FontAwesomeIcon icon = {faHome} /></Button></Link>
                    {/* <Link to="/laptops"><Button variant="dark" size = "lg"><FontAwesomeIcon icon = {faSearch}></FontAwesomeIcon></Button></Link> */}
                    {/* <Link to="/pricedrops"><Button variant="info" size = "lg">Top Price Drops</Button></Link> */}
                </Nav>
                <LaptopForm></LaptopForm>
            </Navbar>
        </div>
    )
}

export default Header