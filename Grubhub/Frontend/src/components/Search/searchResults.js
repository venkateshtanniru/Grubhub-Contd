import React, { Component, PureComponent } from 'react';
import Navbar from '../Navbar/navbar';
import RestCard from './restCards';
import LeftPanel from './leftPanel';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import rootUrl from '../config/settings';
import cookie from 'react-cookies';
import './cardstyles.css';
import { connect } from 'react-redux'
import { vRestaurant, cRestaurant }from'../../actions'
import { reduxForm } from 'redux-form'




class searchResults extends Component {
    constructor() {
        super()
        this.state = {
            restSearchResults: "",
            restCuisineResults: "",
            uniquecuisines: ""
        }
    }

    componentDidMount() {
        if (localStorage.getItem("restaurantResults")) {
            let restResultsBySearch = localStorage.getItem("restaurantResults")
            let restDetails = JSON.parse(restResultsBySearch);
            this.setState({

                restSearchResults: restDetails
            })
            console.log(restDetails)
        }
        let cuisineDetails = JSON.parse(localStorage.getItem("restaurantResults"));
        let lookup = {};
        let items = cuisineDetails;
        let result = [];

        for (let item, i = 0; item = items[i++];) {
            let itemtype = item.cuisineName;

            if (!(itemtype in lookup)) {
                lookup[itemtype] = 1;
                result.push(itemtype);
            }
        }
        console.log(result)
        result.sort()
        this.setState({
            uniquecuisines : result
        })
        if (localStorage.getItem("restCuisineDetails")) {
            let restResultsBySearch = localStorage.getItem("restCuisineDetails")
            let restDetails = JSON.parse(restResultsBySearch);
            this.setState({

                restCuisineResults: restDetails
            })
        }
    }


    visitRestaurant = (restId) => {
        console.log("in VisitRestaurant method");
        console.log(restId)

        const data = {
            restId: restId,
            userEmail: localStorage.getItem('userEmail')
        }
        this.props.vRestaurant(data, response => {
                console.log(response)
                if (response.status === 200) {
                    let itemDetails = JSON.stringify(response.data)
                    console.log(response.data);

                    localStorage.setItem('itemsByRestaurant', itemDetails)
                    console.log("itemDetails:" + typeof itemDetails)
                    this.props.history.push('/resthome')
                }
                else {
                    console.log("Didn't fetch items data")
                }
            })

    }
    visitCuisine = (cuisineName) => {
        //e.preventDefault()
        console.log("in VisitCuisine method");
        console.log(cuisineName);

        //console.log(copyResults[id])
        let itemName = localStorage.getItem("itemName")
        const data = {
            cuisineName: cuisineName,
            itemName: itemName,
            userEmail: localStorage.getItem('userEmail')
        }
        console.log(data)
        if (data.cuisineName) {
            this.props.cRestaurant(data, response => {
                    console.log(response)
                    if (response.status === 200) {
                        let restCuisineDetails = JSON.stringify(response.data)
                        console.log(response.data);

                        localStorage.setItem('restCuisineDetails', restCuisineDetails)
                        console.log("itemDetails:" + restCuisineDetails)
                        window.location.reload();
                        // this.props.history.push('/searchresults')
                    }
                    else {
                        console.log("Didn't fetch items data")
                    }
                })
        }
        else {
            alert("Please try again")
        }
    }


    render() {
        let redirectVar = null;
        if (localStorage.getItem("accountType") !== '1') {
            redirectVar = <Redirect to="/login" />
        }

        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }
        let route = null
        if (this.state.restCuisineResults) {
            route = this.state.restCuisineResults;
            localStorage.removeItem("restCuisineDetails")
        }
        else if (this.state.restSearchResults) {
            route = this.state.restSearchResults;
        }
        if (route) {
            let restCards = route.map((restaurant, index) => {
                return (
                    <RestCard
                        key={restaurant.restId}
                        restIndividual={restaurant}
                        visitRest={this.visitRestaurant.bind(this)}
                    />
                )
            })

            let cuisinePanel = this.state.uniquecuisines.map((cuisine, ind) => {
                return (
                    <LeftPanel
                        key={cuisine}
                        cuisineIndividual={cuisine}
                        visitCuisine={this.visitCuisine.bind(this)}
                    />
                )
            })
            return (
                <div>
                    {redirectVar}
                    <Navbar />
                    <div>
                        <div className="restLeft" id="left">
                            <div className="list-group">
                                {cuisinePanel}
                            </div>
                        </div>
                        <div id="right">
                            <div id="search-results-text"><p><b>Your Search Results</b></p></div>
                            <div className="card-group" >
                                {restCards}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        
        else {
            return (
                <div>
                    <Navbar />
                    {redirectVar}
                    <h3>No Items found. </h3>
                </div>
            );
        }
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
    { vRestaurant, cRestaurant }
  )(
    reduxForm({
      form: 'streamSearch'
      // validate: validate
    })(searchResults)
  )
