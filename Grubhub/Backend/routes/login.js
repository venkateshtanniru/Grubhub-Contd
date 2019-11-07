const express = require('express');
var Model = require('../DatabaseConnection');
const bcrypt = require('bcrypt-nodejs');

const app = express.Router();


var passport = require('passport');
var jwt = require('jsonwebtoken');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
const secret = "secret";


//login
app.post('/login', (req, res) => {
    console.log("In login post");
    console.log(req.body);

    //connection 
    Model.Userdetails.findOne({
        'Email': req.body.userEmail
    }, (err, user) => {
        if (err) {
            console.log("Error while connecting to database");
            res.writeHead(500, {
                'Content-type': 'text/plain'
            });
            res.end("Error while connecting to database");
        } else {
                if (err) {
                    res.writeHead(400, {
                        'Contnet-type': 'text/plain'
                    }); 
                    res.end("Invalid credentials");
                } else {
                    if (!bcrypt.compareSync(req.body.userPassword, user.Password)) {//|| !bcrypt.compareSync(req.body.userPassword, result[0].userPassword))
                        res.writeHead(402, {
                            'Content-type': 'text/plain'
                        });
                        console.log("Invalid credentials db");
                        res.end("Invalid credentials");
                    } else {
                        console.log(user);
                        console.log("local Storage: ", req.session.Email);

                        res.cookie('cookie', user.Email, {
                            maxAge: 360000,
                            httpOnly: false,
                            path: '/'
                        });
                        //console.log("res.cookie",res.cookie);
                        var token = jwt.sign(user.toJSON(), secret, {
                            expiresIn: 10080 // in seconds
                        });

                        req.session.user = user;
                        console.log("req.session.userEmail" + req.session.Email);
                        res.writeHead(200, {
                            'Content-type': 'text/plain'
                        });
                        var Result = {
                            userName : user.Username,
                            accountType : user.AccountType,
                            userEmail: user.Email,
                            Token : token
                        }
                        // res.send(result[0].accountType)
                        res.end(JSON.stringify(Result));
                        console.log("Login successful");
                    }
                }
        }
    });
});

module.exports = app;