//Login.js - Login route module
var express = require('express');
var router = express.Router();
var Model = require('../DatabaseConnection');
var bcrypt = require('bcrypt-nodejs');
var mongooseTypes = require('mongoose').Types;

// //Kafka
// var kafka = require('../kafka/client');


//Passport authentication

var passport = require('passport');
var jwt = require('jsonwebtoken');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
const secret = "secret";


//Login validation
router.post('/', function (req, res) {

    console.log('Inside login POST');
    console.log('Request Body: ', req.body);
    Model.Userdetails.findOne({
        'Email': req.body.userEmail
    }, (err, user) => {

        if (err) {
            console.log("Unable to fetch user details.", err);
            // callback(err, null);
            console.log('Inside err login');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in login!');
        }
        else {

            if(user){
                console.log("User details ", user);
                if (!bcrypt.compareSync(req.body.userPassword, user.Password)) {                
                    console.log('Invalid Credentials!');
                    // callback(null, null);        
                    res.writeHead(401,
                        {
                            'Content-type': 'text/plain'
                        })
                    console.log('Invalid Credentials!');
                    res.end('Invalid Credentials!');        
                }
                else {
                   console.log('inside correct details');
                   
                    req.session.user = user;

                    // Create token if the password matched and no error was thrown
                    var token = jwt.sign(user.toJSON(), secret, {
                        expiresIn: 10080 // in seconds
                    });
    
                    //res.json({success: true, token: 'JWT ' + token});
                    res.writeHead(200, {
                        'Content-type': 'text/plain'
                    });
                    
                    //res.status(200).json({success: true, Authorization: 'Bearer ' + token});
                    var Result = {
                        userName : user.Username,
                        accountType : user.AccountType,
                        userEmail: user.Email,
                        Token : token
                    }
                      console.log(Result);
                    
                    res.end(JSON.stringify(Result)); 

                    // callback(null, user);
                }
            }

        }

    });

})

module.exports = router;