import React, { Component } from "react";
// import NavBar from "../../Navbar/navbar";
import logo from '../../images/login-page-burger.png'
// import EditItem from "./edititem";
import { Link } from 'react-router-dom'
import axios from 'axios';
import rootUrl from "../config/settings";
import swal from "sweetalert";
import { connect } from 'react-redux'
import { deleteitem, getsections ,getibosections }from'../../actions'
import { reduxForm } from 'redux-form'




// var images = require.context('../../../../backend/uploads/', true);

class Items extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            sections: [],
            photos: []
        }
        this.selectItems = this.selectItems.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }

    componentDidMount() {
        // console.log("Inside get profile after component did mount");
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        let data = {
            userEmail: localStorage.getItem('userEmail')
        }
        this.props.getsections(data, response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response", response.data)
                    this.setState({
                        sections: response.data
                    });
                }
            })
        data = {
            userEmail: localStorage.getItem('userEmail')
        }            
        axios.post(rootUrl + '/restaurant/allitems', data)
        .then(response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response", response.data)
                    this.setState({
                        items: response.data
                    });
                    console.log("items", this.state.items)
                }
            })
    }

    selectItems(details) {
        const data = {
            itemType: details,
            userEmail: localStorage.getItem('userEmail')
        }
        console.log("data", data)
        this.props.getibosections(data, response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response", response.data)
                    this.setState({
                        items: response.data
                    });
                }
            })

    }

    deleteItem(details) {
        const data = {
            itemId: details,
            userEmail: localStorage.getItem('userEmail')
        }
        console.log("data", data)
        this.props.deleteitem(data, response => {
                console.log(data)
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response", response.data)
                    swal("done","Iteam successfully deleted","success")

                    window.location.reload()
                }
            })
    }

    render() {

        let itemDetails;
        let sectionDetails;
        sectionDetails = this.state.sections.map((section) => {
            return (
                <div className="col-md-4">
                    <div className="card">
                        <button className="btn btn-outline-primary text-center text-dark" onClick={() => this.selectItems(section.itemType)}>{section.itemType}</button>
                    </div>
                </div>
            )
        })
        itemDetails = this.state.items.map((item, index) => {
            if (item.itemImage) {
                var itemImagepreview = rootUrl + '/profile/download-file/' + item.itemImage
                console.log("item image", itemImagepreview)
            }
            else {
                var itemImageData = <img src='https://feedingsouthflorida.org/wp-content/uploads/2015/09/flow-of-food-plate.png' className="card-img-top img-responsive fit-image" alt="logo" />
            }
            if (itemImagepreview) {
                itemImageData = <img src={itemImagepreview} className="card-img-top img-responsive fit-image" alt="logo" />
            }
            return (
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            {/* <img src={logo} className="card-img-top img-responsive fit-image" id="itemimage" alt="..."/> */}
                            {itemImageData}
                            {/* <img src={unknown} className="card-img-top img-responsive fit-image" id="card-img-top" alt="..." /> */}
                            <h5 className="card-title">{item.itemName}</h5>
                            {/* <h6 className="card-subtitle mb-2">Item Name: {item.itemName}</h6> */}
                            <p className="card-text font-weight-bold text-muted">Item Price: {item.itemPrice}</p>
                            <p className="card-text font-weight-bold  text-muted">Item Description: Delicious</p>
                            <p className="card-text font-weight-bold  text-muted">Section: {item.itemType}</p>
                            <p className="card-text font-weight-bold  text-muted">Cuisine: {item.cuisineName}</p>
                            {/* <button className="btn btn-outline-primary" onClick={this.editItem}>Edit</button> */}
                            <Link to={{
                                pathname: `/edititem`,
                                item: item
                            }} className="btn btn-outline-primary">Edit</Link>&nbsp;&nbsp;&nbsp;
                                <button className="btn btn-outline-danger" onClick={() => this.deleteItem(item.itemId)}>Delete</button>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <h5>Sections:</h5><p className="text-muted inline">Select a section to view items in that section!</p><br />
                <div className="card-group">
                    {sectionDetails}
                </div><br />
                <h5>Items:</h5><br />
                <div className="card-group">
                    {itemDetails}
                </div>
            </div>
        )
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
    { deleteitem, getsections, getibosections }
  )(
    reduxForm({
      form: 'streamSearch'
      // validate: validate
    })(Items)
  )
