const express = require('express');
const pool = require('../configFiles/connectionPooling');
var mysql = require('mysql');
const app = express.Router();
var Model = require('../DatabaseConnection');
var mongooseTypes = require('mongoose').Types;
const ResId = mongooseTypes.ObjectId();


const bcrypt = require('bcrypt-nodejs');

//CustomerSignUp
app.post('/customerSignup', (req, res) => {
    console.log("In customer signup");
    console.log(req.body);
    const profileId = mongooseTypes.ObjectId();

    //Hashing Password
    const hashedPassword = bcrypt.hashSync(req.body.userPassword);
    
    Model.Userdetails.findOne({
        'Email': req.body.userEmail
    }, (err, user) => {
    
        if (err) {
            console.log("Error in creating connection");
            res.writeHead(500, {
                'Content-type': 'text/plain'
            });
            res.end("Error in connecting connection");
        } else {

            if (user) {
                console.log('User Exists!', user);
            }
            else {

                //Hashing Password!
                const hashedPassword = bcrypt.hashSync(req.body.userPassword);

                var user = new Model.Userdetails({
                    Username: req.body.userName,
                    Password: hashedPassword,
                    Email: req.body.userEmail,
                    PhoneNumber: req.body.userPhone,
                    Address:req.body.userAddress,
                    ProfileImage: 'default-profile-image.jpg',
                    AccountType: req.body.accountType,
                    ProfileId: profileId
                });
            }

            user
            .save()
            .then((doc) => {
                          console.log("User saved successfully.", doc);
                            res.send(true)})
            .catch((err) => {
                console.log("Unable to save user details.", err);
               
            });
        }
    });
});

//OwnerSignup
app.post('/ownerSignup', (req, res) => {
    console.log("In owners signup");
    console.log(req.body);
    const profileId = mongooseTypes.ObjectId();
    Model.Userdetails.findOne({
        'Email': req.body.userEmail
    }, (err, user) => {

        if (err) {
            console.log("Unable to fetch user details.", err);
            callback(err, null);            
        }
        else {

            if (user) {
                console.log('User Exists!', user);
               
            }
            else {

                //Hashing Password!
                const hashedPassword = bcrypt.hashSync(req.body.userPassword);

                var user = new Model.Userdetails({
                    Username: req.body.userName,
                    Password: hashedPassword,
                    Email: req.body.userEmail,
                    PhoneNumber: req.body.userPhone,
                    Address:req.body.userAddress,
                    ProfileImage: 'default-profile-image.jpg',
                    AccountType: req.body.accountType,
                    ProfileId: profileId,
                    RestaurantDetails : { Resname: req.body.restName, 
                                     Address:req.body.restAddress, 
                                     Description:req.body.restDesc  }
                });
            }
            user
            .save()
            .then((doc) => {
                          console.log("User saved successfully.", doc);
                        })
            .catch((err) => {
                console.log("Unable to save user details.", err);               
           });
       }
  });
               var Restaurant = new Model.RestaurantDetails({
  
                       ResId : ResId,
                       Resname: req.body.restName, 
                       Address:req.body.restAddress, 
                       Description:req.body.restDesc,
                       OwnerEmail:req.body.userEmail                           
                });
             Restaurant
             .save()
            .then((doc) => {
                          console.log("User saved successfully.", doc);
                            res.send(true)})
            .catch((err) => {
                console.log("Unable to save user details.", err);
               
            });

});


module.exports = app;