const pool = require('../configFiles/connectionPooling');
var mysql = require('mysql');



function handle_request(message, callback){


    console.log("Inside add items");
    var max = 0;
    if (message.userEmail) {
      pool.getConnection((err, conn) => {
        if (err) {
          console.log("Error while creating connection");
          callback(err,null)
        } else {
          const sql1 =
            "SELECT r.restId from restaurants r, users u WHERE u.userId = r.userId and u.userEmail = " +
            mysql.escape(message.userEmail) +
            "and u.accountType = " +
            2;
        //   console.log("sql1---" + sql1);
          conn.query(sql1, (err, result1) => {
            if (err) {
              console.log("Error in retrieving Restaurant Id");
              callback(err,null)
            } else {
              const sql2 =
                "SELECT cuisineId from items where cuisineName = " +
                mysql.escape(message.cuisineName);
              conn.query(sql2, (err, result2) => {
                if (err) {
                    callback(err,null)
                } else {
                  sql3 = "SELECT MAX(cuisineId) as max FROM items"
                  conn.query(sql3, (err, result3) => {
                    if (err) {
                        callback(err,null)
                    } else {
                      if (result2.length !== 0) {
                        fianlcuisineId = result2[0].cuisineId;
                      }
                      else {
                        max = result3[0].max;
                        fianlcuisineId = max + 1;
                      }
                      sql4 =
                        "Insert INTO items (itemName, itemDesc, itemImage, itemType, itemPrice, cuisineName, restId, cuisineId) VALUES ( " +
                        mysql.escape(message.itemName) +
                        "," +
                        mysql.escape(message.itemDesc) +
                        "," +
                        mysql.escape(message.itemImage) +
                        "," +
                        mysql.escape(message.itemType) +
                        "," +
                        mysql.escape(message.itemPrice) +
                        "," +
                        mysql.escape(message.cuisineName) +
                        "," +
                        result1[0].restId +
                        "," +
                        fianlcuisineId +
                        ");";
                      conn.query(sql4, (err, result4) => {
                        if (err) {
                          if (err.sqlMessage.includes("Duplicate entry")) {
                            console.log("Restaurant with same cuisine already exists");
                            callback(err,null)
                          } else {
                            console.log(err);
                            callback(err,null)
                          }
                          callback(err,null)
                        }
                        else {
                          
                          console.log("Item details Inserted");
                          callback(null,result4)
                          //res.end(JSON.stringify(result4));
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }



}


exports.handle_request = handle_request;