
import React, { Component } from 'react';
import './cardstyles.css';

import rootUrl from '../config/settings';
import './cardstyles.css'

// var images = require.context('../../../../backend/uploads/', true);
let redirectVar = null;
class restCard extends Component {
    constructor(props) {
        super(props);
        this.state={
           photos: []
           }
    }

    
    render() {
        let {restId, restImage, restName, restDesc } = this.props.restIndividual;
        if (restImage === "" || restImage===null){
            restImage = "restaurant.jpg"
        }
        let unknown =  rootUrl+'/profile/download-file/' + restImage

        
        return (
            <div>
                
                <div className= "restRight" >
                    <div className = "col-md-3 col-sm-6">
                        <div className="card cardclass" id="cardclass" >
                            <img src={unknown} className="card-img-top" id="card-img-top" alt="..."/>
                            <div className="card-block" id = "card-title-text">
                                <h4 className="card-title" id="card-title">{restName}</h4>
                                <p className="card-text" id="card-text">{restDesc} </p>
                                <button id="btn-rest-visit" onClick={() => this.props.visitRest(restId)} className="btn btn-primary">Visit Restaurant</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default restCard;