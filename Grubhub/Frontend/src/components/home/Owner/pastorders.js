import React, { Component } from "react";
// import NavBar from "../../Navbar/navbar";
import axios from 'axios'
import ItemDetails from "./itemdetails";
import rootUrl from "../../config/settings";
import {opastorders} from '../../../actions';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';


class PastOrders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: []
        }

    }

    componentDidMount() {
        console.log("Inside get order details afer component mount");
        const data = {
            userEmail: localStorage.getItem('userEmail')
        }
        this.props.opastorders(data, response => {
                if (response.status === 200) {
                    console.log(response.data)
                    this.setState({
                        orders: response.data
                    })
                    console.log("this state orders", typeof this.state.orders)
                }
            })
    }

    render() {
        let pastOrderDetails;

        pastOrderDetails = this.state.orders.map((order) => {
            // i=i+1;
            console.log("order status", order.userOrder[0].orderStatus)
            if (order.userOrder[0].orderStatus === "delivered" || order.userOrder[0].orderStatus === "cancelled") {
                return (
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Customer name: {order.customerName} || Order Id: #{order.orderId}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Customer Address: {order.userOrder[0].userAddress}</h6>
                            <ItemDetails
                                itemsInOrder={order.userOrder} />
                            <p className="card-text font-weight-bold text-muted">Order status: {order.userOrder[0].orderStatus}</p>
                        </div>
                    </div>

                )
            }
        })
        return (
            <div>

                {/* {UniqueOdrer} */}
                {pastOrderDetails}

            </div>
        )
    }
}



function mapStateToProps (state) {
    return {
      user: state.user
    }
  }


  export default connect(
    mapStateToProps,
    { opastorders }
  )(
    reduxForm({
      form: 'streamSearch'
    })(PastOrders)
  )
