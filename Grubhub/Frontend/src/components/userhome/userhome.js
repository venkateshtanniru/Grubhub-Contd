import React, { Component } from 'react';
import './homestyle.css';
import { Redirect } from 'react-router-dom'
import NavBar from '../Navbar/navbar'
import Background from '../../images/homeBackground.jpg';
import axios from 'axios'
import rootUrl from '../config/settings';
import { connect } from 'react-redux'
import {search }from'../../actions'
import { reduxForm } from 'redux-form'


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
            restResults: [

            ],
            cuisineResults: [

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
        // if(this.state.itemSearch.length >=2){
        //     document.getElementById("searchButton").disabled = false;
        // }

    }


    submitSearch = async (e) => {
        e.preventDefault()

        const data = {
            itemName: this.state.itemSearch,
            userEmail: localStorage.getItem('userEmail')
        }
        console.log(data.itemName)
        this.props.search(data, response => {
        
                console.log(response.status);
                if (response.status === 200) {
                    let restDetails = JSON.stringify(response.data)
                    console.log(response.data)
                    if (Object.keys(response.data).length > 0) {
                        localStorage.setItem("restaurantResults", restDetails)
                        localStorage.setItem("itemName", data.itemName);
                        this.props.history.push('/searchresults')
                    }
                    console.log("response is 200. data received")
                }
                
            })
    }


    render() {
        // for (let i = 0; i < localStorage.length; i++) {
        //     let k = localStorage.key(i);
        //     console.log(k)
        // }

        let redirectVar = null
        if (localStorage.getItem('accountType')!=='1') {
            redirectVar = <Redirect to='/login' />
        }
        // if(localStorage.getItem('restaurantResults')){
        //     console.log("get item rest");

        //     redirectVar = <Redirect to='/searchresults' />
        // }

        return (
            <div >
                {redirectVar}
                <NavBar />
                <div style={sectionStyle} >
                    <div className="centerit">
                        <div className="col-12 col-md-10 col-lg-8">
                            <form className="card card-sm">
                                <div className="card-body row no-gutters align-items-center">
                                    <div >
                                    </div>
                                    <div className="col">
                                        <input onChange={this.searchHandle} name="searchbar" className="form-control form-control-lg form-control-borderless" type="text" placeholder="Search food items" />
                                    </div>
                                    <div >
                                        <button id="searchButton" onClick={this.submitSearch} className="btn btn-lg btn-success"  >Search</button>
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


function mapStateToProps (state) {
    return {
      user: state.user
    }
  }
  
  // export default connect( mapStateToProps , {getProfile: getProfile, getUserImage:getUserImage})(Search);
  
  export default connect(
    mapStateToProps,
    { search }
  )(
    reduxForm({
      form: 'streamSearch'
      // validate: validate
    })(Home)
  )
