var express = require("express");

var router = express.Router();

const User = require("../models/BUYER");

var mongoose = require("mongoose");

var Model = require('../DatabaseConnection');


var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
// var kafka = require('../kafka/client');

router.post('/', function (req, res) {

    console.log('Inside Profile Details GET!');
    console.log('Request Body:', req.body);

    if (req.session.user) {
        console.log(req.session.user);

        Model.Userdetails.findOne({
            'Email': req.session.user.Email
        }, (err, user) => {

            if (err) {
            
                // callback(err, null);
                console.log("Unable to fetch user details.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in fetching user details!');
            }
            else {

                console.log('Profile Data: ', user);
                // callback(null, user);
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(user));
            }
        });
    }
})

// router.get('/', function(req,res){
//     var Buyer_id = req.query.Buyer_id;
//     var Fname = req.query.Fname;
//     var Lname = req.query.Lname;
//     var Email = req.query.Email;
//     var Phone = req.query.Phone;
//     var Password = req.query.Password;
//     var Image = req.query.Image;
//     var Address = req.query.Address;

//     console.log("Buyer User details",Buyer_id, Fname, Lname, Email, Phone, Password, Image,Address);

//     var query = {Buyer_id:Buyer_id,Fname:Fname,Lname:Lname,Email:Email,Phone:Phone,Password:Password,Image:Image,Address:Address};
//     User.findOne(query).exec().then(result=>{
//         console.log("In getting buyer details", result);
//         res.json(result);
//     })
// });

module.exports=router;