import React from 'react';
import { Jumbotron } from 'react-bootstrap'
import TopPrices from './topprices';
const Home = () => {
    //style = {{marginLeft: "10rem", marginRight: "10rem", marginTop: "1rem", marginBottom: "1rem"}}
    return (
        <div style = {{marginLeft: "1rem", marginRight: "1rem", marginTop: "1rem", marginBottom: "1rem"}}>
            <Jumbotron style={{ height: '12rem' }}>
                <h2>Henry's Newegg Laptop Searcher</h2>
                <p>
                    Searches for Laptops and graphs their prices over time!
                </p>
                <strong>
                    Note: Gathers the top 1000 most popular laptops and graphs their prices.
                </strong>
            </Jumbotron>
            <TopPrices></TopPrices>
        </div>
    );
}


export default Home;
