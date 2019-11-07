import React, { Component } from 'react';
import rootUrl from '../config/settings';
import { Redirect } from 'react-router-dom'
import ItemCard from './itemCard'
import Navbar from '../Navbar/navbar'
import axios from 'axios'
import './restHome.css'
import RestCuisines from './restCuisines'
import swal from 'sweetalert';
import {addcart} from '../../actions';
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'


// var images = require.context('../../../../backend/uploads/', true);

class RestaurantHome extends Component {
    constructor() {
        super()
        this.state = {
            itemsByRestaurant: "",
            itemsByrestCuisine: "",
            itemUniqueTypes: "",
            itemQuantity: ""
        }
    }
    componentDidMount() {
        if (localStorage.getItem("itemsByRestaurant")) {
            let itemsByRestaurant = localStorage.getItem("itemsByRestaurant")
            let sessionItemDetails = JSON.parse(itemsByRestaurant);
            let lookup = {};
            let items = sessionItemDetails;
            let result = [];

            for (let item, i = 0; item = items[i++];) {
                let itemtype = item.itemType;

                if (!(itemtype in lookup)) {
                    lookup[itemtype] = 1;
                    result.push(itemtype);
                }
            }
            console.log(sessionItemDetails.length);

            result.sort();
            console.log(result)
            let parseQuantity = '{"Quantity":[]}'
            for (let item, i = 0; item = items[i++];) {
                let itemNameQ = item.itemName;

                parseQuantity = JSON.parse(parseQuantity)
                parseQuantity.Quantity.push({ "itemName": itemNameQ, "itemQuantity": 0 })
                parseQuantity = JSON.stringify(parseQuantity)
            }
            console.log(typeof parseQuantity);
            this.setState({
                itemsByRestaurant: sessionItemDetails,
                itemUniqueTypes: result,
                itemQuantity: parseQuantity
            })
        }
    }

    itemByItemType = (itemType) => {
        //e.preventDefault()
        console.log("in itemByItemType method");
        console.log(itemType)

        let itemsByRest = this.state.itemsByRestaurant;
        let itemsType = '{"requiredType":[]}'
        for (let i = 0; i < itemsByRest.length; i++) {
            let itemNameQ = itemsByRest[i];

            itemsType = JSON.parse(itemsType)

            if (itemNameQ.itemType === itemType) {
                itemsType.requiredType.push(itemNameQ)
            }
            itemsType = JSON.stringify(itemsType)
        }
        // itemsType = JSON.parse(itemsType);
        console.log(typeof itemsType);


        localStorage.setItem('itemSections', itemsType)

        this.setState({
            itemsByrestCuisine: itemsType
        })

    }

    togglePopup = (itemPrice, itemId, restId, itemQuantity) => {
        console.log("in togglePopup with Id: ");
        console.log(itemQuantity)
        let itemTotal = itemPrice * itemQuantity;
        const data = {
            itemId: itemId,
            restId: restId,
            itemQuantity: itemQuantity,
            itemTotal: itemTotal,
            userEmail: localStorage.getItem('userEmail')
        }
        console.log(data);
        if (itemQuantity > 0) {
            this.props.addcart(data, response => {
                    console.log(response)
                    if (response.status === 200) {

                        swal("Success!", "Item Added to cart!", "success");
                    }
                    else {
                        console.log("Didn't fetch items data")
                    }
                })
        }
        else {
            alert("Quantity should me more than 0");
        }

    }


    handleIncrement = (itemName) => {
        let indItemQuantity = JSON.parse(this.state.itemQuantity)
        for (let i = 0; i < indItemQuantity.Quantity.length; i++) {
            if (indItemQuantity.Quantity[i].itemName == itemName) {
                indItemQuantity.Quantity[i].itemQuantity += 1;

            }
        }
        let stringitemQuant = JSON.stringify(indItemQuantity);
        this.setState({
            itemQuantity: stringitemQuant
        })
        console.log(this.state.itemQuantity)

    }


    handleDecrement = (itemName) => {
        let indItemQuantity = JSON.parse(this.state.itemQuantity)
        for (let i = 0; i < indItemQuantity.Quantity.length; i++) {
            if (indItemQuantity.Quantity[i].itemName == itemName) {
                if (indItemQuantity.Quantity[i].itemQuantity > 0)
                    indItemQuantity.Quantity[i].itemQuantity -= 1;
            }
        }
        let stringitemQuant = JSON.stringify(indItemQuantity);
        this.setState({
            itemQuantity: stringitemQuant
        })
        console.log(this.state.itemQuantity)
    }


    render() {
        let redirectVar = null;
        let itemDetails = null;

        if (!this.state.itemsByRestaurant) {
            redirectVar = <Redirect to="/searchresults" />
        }
        let i = -1;
        let route = null;
        if (this.state.itemsByrestCuisine) {
            route = JSON.parse(this.state.itemsByrestCuisine);
            route = route.requiredType
            localStorage.removeItem('itemSections')
        }
        else if (this.state.itemsByRestaurant) {
            route = this.state.itemsByRestaurant
        }
        console.log(route);

        if (route) {
            itemDetails = route.map((item, index) => {
                let quant = JSON.parse(this.state.itemQuantity)

                i = i + 1
                return (
                    <ItemCard
                        key={item.itemId}
                        itemIndividual={item}
                        quantity={quant}
                        handleDecrement={this.handleDecrement.bind(this)}
                        handleIncrement={this.handleIncrement.bind(this)}
                        togglePopup={this.togglePopup.bind(this)}
                    />
                )

            })
            let itemPanel = this.state.itemUniqueTypes.map((itemtype, ind) => {
                return (
                    <RestCuisines
                        //key={cuisine.cuisineId}
                        itemTypeIndividual={itemtype}
                        itemByItemType={this.itemByItemType.bind(this)}
                    />
                )
            })
            let { restName, restImage, restAddress, restPhone } = this.state.itemsByRestaurant[0];
            if (restImage === "" || restImage === null) {
                restImage = "restaurant.jpg"
            }
            let unknown = rootUrl+'/profile/download-file/' + restImage
            // let resimg = new Image();
            // resimg = unknown;


            return (
                <div>
                    {redirectVar}
                    <Navbar />
                    <div className="container" id="container">
                        <img src={unknown} id="restHomeImage" alt="..." />
                        <div>
                            <div className="rest-home-details" id="rest-home-details" >
                                <h2 className="rest-title" id="rest-title">{restName}</h2>
                                <span>
                                    <p className="text-left" id="text-left">{restAddress}</p>
                                    <p className="text-phone" id="text-left"> Phone:  {restPhone}</p>
                                </span>
                            </div>
                        </div>
                        <div className="item-type-Left" id="left-items">
                            <div className="list-group">
                                {itemPanel}
                            </div>
                        </div>
                        <div id="right-items" className="rest-item-Right">
                            <div className="card-group" >
                                {itemDetails}
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
    { addcart }
  )(
    reduxForm({
      form: 'streamSearch'
      // validate: validate
    })(RestaurantHome)
  )
