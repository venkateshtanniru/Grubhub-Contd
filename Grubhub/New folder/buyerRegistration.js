var express = require("express");

var router = express.Router();
  
var Model = require('../DatabaseConnection');
var bcrypt = require('bcrypt-nodejs');
var mongooseTypes = require('mongoose').Types;
// const User = require('../models/BUYER');

router.post('/', (req,res)=> {
    console.log("inside buyer signup");
    
const profileId = mongooseTypes.ObjectId();

    //Check if user exists

    Model.Userdetails.findOne({
        'Email': req.body.Email
    }, (err, user) => {

        if (err) {
            console.log("Unable to fetch user details.", err);
            callback(err, null);            
        }
        else {

            if (user) {
                console.log('User Exists!', user);
                // if(req.body.Accounttype === user.Accounttype){
                //     console.log('Duplicate user');
                //     callback(null, null);
                // }
              
                
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



})




// var mongoose = require("mongoose");

// const Buyer_id = mongoose.Schema.ObjectId;

// router.post('/buyerSignup', function(req,res){
//     const entry = new User({
//         _id: new mongoose.Types.ObjectId(),
//         Buyer_id : Buyer_id,
//         Fname : req.body.Fname,
//         Lname : req.body.Lname,
//         Email : req.body.Email,
//         Phone : req.body.Phone,
//         Password : req.body.Password,
//         Image : req.body.Image,
//         Address : req.body.Address,
//     })

//     console.log("Buyer Details inserted into Buyer table");
//     entry.save().then(result=>{
//         console.log(res);
//         res.send(true);
//     }).catch(err => console.log(err));
//     res.send(true);
// });

module.exports=router;