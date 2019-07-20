import React, { Component } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'react-bootstrap'
class TopPrices extends Component {
    constructor() {
        super()
        this.state ={
            laptops : [{}],
            loading: false
        } 
    }

    componentDidMount(){
        var dict = []
        var sorted = []
        this.setState({loading: true})
        fetch(`http://localhost:9000/api/pricehistory/1`).then( results => {
            return results.json()

        }).then( data => {
            
            data.forEach(element => {
                
                //fetched prices in order by date desc
                if (!(element.name in dict)){
                    dict[element.name] = [element]
                }
                else {
                    dict[element.name].push(element)
                    
                }
            })
            // calculates the percent decrease in price 
            for (var laptop in dict){
                sorted.push([dict[laptop], 
                    Math.floor(100 * (dict[laptop][0].price - dict[laptop][dict[laptop].length - 1].price) / dict[laptop][dict[laptop].length - 1].price),
                    dict[laptop][0].price - dict[laptop][dict[laptop].length - 1].price])
            }
            sorted.sort((a,b)=>{
                return a[1] - b[1]
            })
            return sorted
        }).then(sorted=>{
            this.setState({laptops: sorted, loading: false})
            
        })
    }

    render() {
        const settings = {
            arrows: true,
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            
            
        };
        console.log(this.state)
        console.log(this.state.laptops[0][1])
    return (
        <div style = {{marginLeft: "1rem", marginRight: "1rem"}}>

            <h2>Top Price Drops</h2>
            {this.state.loading &&
                <Spinner animation="border" variant="info" />
            }
            <Slider {...settings}>

                {this.state.laptops.length > 2 && 
                    this.state.laptops.slice(0,15).map(laptop=>{
                        return(
                            <>
                            
                            <Card  key = {laptop[0][0].serial_id}>
                                <Card.Img variant="top" src={laptop[0][0].image_url} onError={(e)=>{e.target.onerror = null; e.target.src="http://via.placeholder.com/300x225"}} />
                                <Card.Body style = {{backgroundColor: "#DCDCDC"}}>
                                    
                                    <Card.Title>
                                    <Link to={`/laptops/item/${encodeURIComponent(laptop[0][0].name)}`} target="_blank" rel="noopener noreferrer">
                                        <Button variant = "outline-info" className = "btn-circle">{laptop[0][0].name.length < 130 ? `${laptop[0][0].name}`: `${laptop[0][0].name.substring(0, 130)}...`}</Button>
                                    </Link>   
                                    </Card.Title>
                                
                                    <Card.Text style = {{color: "#52b817", textAlign: "center"}}>
                                    ${laptop[2] * -1} Drop
                                    </Card.Text>
                                    <Card.Text style = {{ textAlign: "center"}}>
                                    Original Price: ${laptop[0][laptop[0].length - 1].price}
                                    </Card.Text>
                                </Card.Body>  
                            </Card>                               
                            </>
                        
                        )
                    })
                    
                }
            </Slider>
        </div>
    );
}

}

export default TopPrices