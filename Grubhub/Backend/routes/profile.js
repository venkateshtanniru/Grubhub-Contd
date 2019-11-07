const express = require('express');
const app = express.Router();

const multer = require('multer');
const path = require('path');
const fs = require('fs');
var Model = require('../DatabaseConnection');


var passport = require('passport');
// Set up middleware 
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
// var kafka = require('../kafka/client');

//Storing documents/Images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  }
  , filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//get profile details
app.post("/getprofile", (req, res) => {
  console.log("Inside get profile");
  console.log(req.body)
  // console.log("req.body", req.body);
  // if (req.body.userEmail) {

  if (req.body.userEmail) {
    console.log(req.session.user.Email);
    
    Model.Userdetails.findOne({
      'Email': req.session.user.Email
     }, (err, user) => {
          if (err) {
        console.log("Error while creating connection");
        res.writeHead(500, {
          "Content-type": "text/plain"
        });
        res.end("Error while creating connection");
      } else {
          if (err) {

            console.log("Error in retrieving profile data");

            res.writeHead(400, {

              "Content-type": "text/plain"

            });

            res.end("Error in retrieving profile data");

          } else {

            console.log("Profile data: ", user);
               res.writeHead(200, {

                  "Content-type": "application/json"

                });

                console.log("Profile data reterived");

                res.end(JSON.stringify(user));
          }

      }

    });

  }

  else {
    console.log("Error in retrieving profile data");

    res.writeHead(400, {

      "Content-type": "text/plain"

    });

    res.end("Error in retrieving profile data");
  }

});


//update profile
app.post("/updateprofile", (req, res) => {

  console.log("Inside update profile");




  if (req.body.userEmail) {

    Model.Userdetails.findOne({
      'Email': req.body.userEmail
    }, (err, user) => {

      if (err) {

        console.log("Error while creating connection");

        res.writeHead(500, {

          "Content-type": "text/plain"

        });

        res.end("Error while creating connection");

      } else {
        console.log('Userdetails', user);
    
                user.Username = req.body.userName;
                user.Email = req.body.userEmail;
                user.Address = req.body.userAddress;
                user.City = req.body.City;
                user.PhoneNumber = req.body.userPhone;
                user.ProfileImage = req.body.userImage;
    
                user.save()
                    .then((doc) => {
                         console.log("User details saved successfully.", doc);
                        //  callback(null, doc);
                        res.writeHead(200, {
                            'Content-type': 'text/plain'
                             });
                        res.end('Adding a user successful!');
                       
                        
                                    })
                     .catch((err) => {
                    console.log("Unable to save user details.", err);
                    // callback(err, null);
    
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                                        });
                     res.end('Error in adding an user');
                });
            }

        // const sql1 =

        //   "SELECT userId from users WHERE userEmail = " +

        //   mysql.escape(req.body.userEmail);

        // console.log("sql1---" + sql1);

        // conn.query(sql1, (err, result1) => {

        //   if (err) {

        //     console.log("Error in fetching User Id");

        //     console.log(err);

        //   } else {

        //     console.log("User Id fetched");

        //     console.log(result1[0]);

        //     //Hashing Password!

        //     //const hashedPassword = bcrypt.hashSync(req.body.userPassword);

        //     var sql2 =

        //       "UPDATE users set " +

        //       "userName = " +

        //       mysql.escape(req.body.userName) +

        //       "," +

        //       "userEmail = " +

        //       mysql.escape(req.body.userEmail) +

        //       "," +

        //       "userPassword = " +

        //       mysql.escape(req.body.userPassword) +

        //       "," +

        //       "userPhone = " +

        //       mysql.escape(req.body.userPhone) +

        //       "," +

        //       "userAddress = " +

        //       mysql.escape(req.body.userAddress) +

        //       "," +

        //       "userZip= " +

        //       mysql.escape(req.body.userZip) +

        //       "," +

        //       'userImage = ' +

        //       mysql.escape(req.body.userImage) +

        //       " WHERE userId = " +

        //       result1[0].userId;

        //     console.log("sql2---" + sql2);



        //     conn.query(sql2, function (err, result2) {

        //       if (err) {

        //         console.log("Error in updating profile data");

        //         console.log(err);

        //         res.writeHead(400, {

        //           "Content-type": "text/plain"

        //         });

        //         console.log("err-----" + err);

        //         res.end("Error in updating profile data");

        //       } else {

        //         console.log("Profile data update complete!");

        //         res.writeHead(200, {

        //           "Content-type": "text/plain"

        //         });

        //         res.end("Profile data update complete!");

        //       }

        //     });

        //   }

        });

      }

    });

//uplaod-file
app.post('/upload-file', upload.array('photos', 5), (req, res) => {
  console.log('req.body', req.body);
  res.end();
});

//download-file
app.get('/download-file/:user_image', (req, res) => {
  // console.log('Inside DOwnload File');
  // var file = req.params.file;
  // console.log("file name",file)
  // var filelocation = path.join(__dirname + '../../uploads', file);
  // console.log("file loc",filelocation)

  // var img = fs.readFileSync(filelocation);
  // var base64img = new Buffer(img).toString('base64');
  // res.writeHead(200, {
  //     'Content--type': 'image/jpg'
  // });
  // res.end(base64img);

  var image = path.join(__dirname + '../../uploads', req.params.user_image);

  if (fs.existsSync(image)) {
    res.sendFile(image)
  }
  else {
    res.end("image not found")
  }
});


module.exports = app;