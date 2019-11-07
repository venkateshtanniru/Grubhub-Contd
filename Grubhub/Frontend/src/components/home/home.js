import React, { Component } from 'react';
import './homestyle.css';
import { Redirect } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Background from '../../images/homeBackground.jpg';



var sectionStyle = {
    width: "100%",
    height: "700px",
    backgroundImage: `url(${Background})`
};


class Home extends Component {
    constructor() {
        super()
        this.state = {
            itemSearch: "",
            restResults:[

            ],
            cuisineResults:[

            ]
        }
        this.searchHandle = this.searchHandle.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }



    searchHandle = e => {
        e.preventDefault();
        this.setState({
            itemSearch: e.target.value
        });
        console.log(this.state.itemSearch.length);
        
        
    }


    submitSearch = async (e) =>{
        e.preventDefault()

        const data = {
            itemName: this.state.itemSearch,
            userEmail: localStorage.getItem('userEmail')
        }
        console.log(data.itemName)
        axios.post(rootUrl + '/restaurantsbyItemName', data)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    let restDetails = JSON.stringify(response.data)
                    console.log(response.data)
                    if (Object.keys(response.data).length>0){
                        sessionStorage.setItem("restaurantResults", restDetails)
                        sessionStorage.setItem("itemName",data.itemName);
                        this.props.history.push('/searchresults')
                    }
                    console.log("response is 200. data received")
                }
                else{
                    console.log("response is 400. data not received")
                }
            })
    }


    render() {
                
        return (
            <div >
                {/* {redirectVar} */}
                 
                <Navbar />
                <div style={ sectionStyle } >
                <div className="centerit">
                    <div className="col-12 col-md-10 col-lg-8">
                        <form className="card card-sm">
                            <div className="card-body row no-gutters align-items-center">
                                <div >
                                </div>
                                <div className="col">
                                    <input onChange={this.searchHandle} name = "searchbar" className="form-control form-control-lg form-control-borderless" type="text" placeholder="Search food items" />
                                </div> 
                                <div >
                                    <button id = "searchButton" onClick={this.submitSearch} className="btn btn-danger">Search</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}


export default Home;
