


// const express = require('express');
const pool = require('../configFiles/connectionPooling');
var mysql = require('mysql');
// const app = express.Router();

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Storing documents/Images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  }
  , filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });





function handle_request(message, callback){


if (message.userEmail) {
    pool.getConnection((err, conn) => {
      if (err) {
        console.log("Error while creating connection");
        callback(err,null)
      } else {
        //query
        // console.log(

        //   "mysql.escape(message.userEmail)" +

        //   mysql.escape(message.userEmail)

        // );

        const sql1 =

          "SELECT * FROM users WHERE userEmail= " +

          mysql.escape(message.userEmail);




        conn.query(sql1, (err, result) => {

          if (err) {

            console.log("Error in retrieving profile data");

            callback(err,null)

          } else {

            // console.log("Profile data: ", result);
            // console.log(typeof (JSON.stringify(result[0].userId)))

            // console.log("Inside else loop for sql2")

            const sql2 =

              "SELECT * FROM restaurants WHERE userId= " +
              mysql.escape(result[0].userId);

            conn.query(sql2, (err, result1) => {

              if (err) {

                console.log("Error while getting restaurent details");

                // res.writeHead(400,{

                //     'Content-type': 'text/plain'

                // });

                // res.end("Error while getting restaurent details");
                callback(err,null)

              }

              //   else{

            //   console.log("result1", result1);

              if (result1 && result1.length != 0) {
                 console.log("inside last if");
                 
                const obj = result.concat(result1);

                console.log("--obj--" + obj);
               callback(null,obj)

              } else {

                 console.log("inside last else");
          
                callback(null,result[0])

              }

            });

          }

        });

      }

    });

    //   }

  }

  else {
    console.log("Error in retrieving profile data");

    callback(err,null)
  }



}

exports.handle_request = handle_request;