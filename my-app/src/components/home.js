import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap'
const Home = () => {
    return (
        <div>
            <Jumbotron style={{ height: '12rem' }}>
                <h2>Henry's Newegg Laptop Searcher</h2>
                <p>
                    Searches for Laptops and graphs their prices over time!
            </p>

            </Jumbotron>
        </div>
    );
}


export default Home;
