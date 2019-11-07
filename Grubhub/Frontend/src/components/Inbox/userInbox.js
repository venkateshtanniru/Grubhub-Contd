import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/navbar'
import rootUrl from '../config/settings';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

class TravelerInbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageResult: []
        }

    }

    componentWillMount() {

        // var token = localStorage.getItem("token");
        // axios.defaults.withCredentials = true;
        var data = {


        };
        console.log('component did mount');


        axios.post('http://'+rootUrl+':3001/get-traveler-messages', data)
            .then(response => {
                if (response.status === 200) {
                    //console.log(response.data);
                    this.setState({
                        messageResult: response.data
                    });
                    console.log('messages', this.state.messageResult);
                }
            });
    }


    render() {

        let redirectVar = null;
        if(this.props.loginStateStore.result){
            if(!this.props.loginStateStore.result.isAuthenticated === true){
                redirectVar = <Redirect to="/login" />
            }
        }
        else{
            redirectVar = <Redirect to="/login" />
        }

        let messageDetails = this.state.messageResult.map(function (message, index) {

            return (
            

                <div className="container display-messages-container pad-5-pc" key={index}>
                    <div className="panel panel-default">
                    <div className="panel-heading">
                            <p><b>{localStorage.getItem("userName")}</b></p>
                    </div>
                    <div>
                    <div>
                        <span className="alert alert-dark" role="alert">{message.Message.traveler}</span>
                    </div>
                    
                        <div className="flt-right">
                            <span className="alert alert-info" role="alert">{message.Message.owner}</span>
                        </div>
                    </div>
                    </div>
                    </div>
            );
        });

        return (
            <div>
                {redirectVar}
                <Navbar />
                {messageDetails}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loginStateStore : state.login
})

//export default Profile;
export default connect(mapStateToProps, {})(TravelerInbox);