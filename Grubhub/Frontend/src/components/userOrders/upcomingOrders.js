import React, { Component } from 'react';
import axios from 'axios'
import rootUrl from '../config/settings';
import Navbar from '../Navbar/navbar';
import UniqueOrders from './uniqueOrders'
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import {order } from '../../actions';
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'


class UpcomingOrders extends Component {
    constructor() {
        super()
        this.state = {
            userOrders: null
        }
    }

    componentDidMount = () => {
        const data = {
            userEmail: localStorage.getItem('userEmail')
        }
        this.props.order(data, response => {
                console.log(response.data)
                if (response.status === 200) {
                    console.log(typeof response.data);
                    this.setState({
                        userOrders: JSON.stringify(response.data),
                    })
                }
                else {
                    console.log("Didn't fetch previous data")
                }
            })
    }
    render() {
        let route = null
        let UniqueOdrer = ""
        let i = -1;
        if (this.state.userOrders) {
            console.log("in ");

            route = JSON.parse(this.state.userOrders)
        }
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }
        if (localStorage.getItem("accountType") !== '1') {
            redirectVar = <Redirect to="/login" />
        }
        console.log("route : ", typeof route);

        if (route) {
            UniqueOdrer = route.map((order, index) => {
                // let quant = JSON.parse(this.state.itemQuantity)
                console.log("order in mapping: ", order);
                // let neworder = JSON.stringify(order)
                i = i + 1
                return (
                    <UniqueOrders
                        key={i}
                        orderIndividual={order}
                    />
                )
            })
            return (
                <div>
                    <Navbar />
                    {redirectVar}
                    {UniqueOdrer}
                </div>
            );
        }
        else {
            return (
                <div>
                    <Navbar />
                    {redirectVar}
                    <h6>You do not have any Upcoming orders</h6>
                </div>
            )
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
    { order }
  )(
    reduxForm({
      form: 'streamSearch'
      // validate: validate
    })(UpcomingOrders)
)

