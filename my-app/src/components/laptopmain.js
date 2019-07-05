import React, { Component } from 'react';
import LaptopForm from "./laptopform";
import Laptops from "./laptops";
import Pagination from "./pagination"

class LaptopMain extends Component {
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            laptops: [],
            pageOfItems: [],
            pager: {}
        }
        this.onChangePage = this.onChangePage.bind(this)
        this.updatePage = this.updatePage.bind(this)
    }

    componentDidMount = async () => {
        const laptopName = this.props.match.params.laptopId
            
            const api_call = await fetch(`http://localhost:9000/api/distinctlaptopsname/${laptopName}`);
            const data = await api_call.json()
            this.setState({ laptops: data })
    }
    componentDidUpdate = async (prevProps) => {
        
        if (this.props != prevProps){
            const laptopName = this.props.match.params.laptopId
            
            const api_call = await fetch(`http://localhost:9000/api/distinctlaptopsname/${laptopName}`);
            const data = await api_call.json()
            this.setState({ laptops: data })
        }
        
    }

    updatePage(childPager){
        this.setState({ pager: childPager })
    }
    
    onChangePage(pageOfItems) {
        // update state with new page of items
        
        this.setState({ pageOfItems: pageOfItems })
    }


    render() {
        //console.log(this.state.pageOfItems)
        //console.log(this.state.laptops)
        //console.log(this.state)
        return (
            <div style={{ marginLeft: '1rem',marginRight: '1rem',  height: 200, width: "auto", display:"flex", flexDirection: "column"}} >
                
                <div> {this.state.laptops.length > 0 &&
                    <div>
                        Displaying {this.state.pager.startIndex + 1}-{this.state.pager.endIndex + 1} out of {this.state.laptops.length} results
                    </div>
                }
                </div>
                
                <div> {this.state.laptops.length > 0 &&
                    <div>
                        <Laptops laptops={this.state.pageOfItems}></Laptops>
                    </div>
                }   
                </div>
                <Pagination items={this.state.laptops} onChangePage={this.onChangePage} updatePage={this.updatePage} pager={this.state.pager}/>
            </div>
        );
    }
}
export default LaptopMain