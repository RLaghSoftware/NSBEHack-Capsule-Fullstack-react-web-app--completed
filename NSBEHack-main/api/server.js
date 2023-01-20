const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
 
const app = express(); //sets up backend
 
app.use(cors());
// parse application/json
app.use(bodyParser.json({
 
}));
  var mysql = require('mysql');
//create database connection
const conn = mysql.createConnection({
    host     : 'localhost',
    database : 'capsule',   // the name of your db
    user     : 'root',     // your root username
    password : 'your_current_password'
});
conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');

  });
  
  app.get('/users', (req, res) => {
 //creates query from sent parameters, runs query on connected DB, then returns results
 //creates data for query
    let data = {
      fname: "%" + req.query.fname + "%",
      Country:"%" + req.query.Country + "%",
      State:"%" + req.query.State + "%",
      City:"%" + req.query.City + "%",
      Title:"%" + req.query.Title + "%",
      Msg:"%" + req.query.Msg + "%",
      sTime: req.query.sTime,
      eTime: req.query.eTime
    };
    if (data.sTime == '')
    {
      data.sTime = "1970-01-01 00:00:00"
    }
    if (data.eTime == '')
    {
      data.eTime = "2038-01-12 03:14:07"
    }
   //creates query with data
    let sql = "SELECT * FROM POST WHERE Name LIKE " + JSON.stringify(data.fname)+" AND Title LIKE " + JSON.stringify(data.Title) +" AND created_at BETWEEN " + JSON.stringify(data.sTime) +" AND " + JSON.stringify(data.eTime) + " AND  Message LIKE " + JSON.stringify(data.Msg) +" AND City LIKE " + JSON.stringify(data.City) +" AND State LIKE " + JSON.stringify(data.State) +"AND Country LIKE " + JSON.stringify(data.Country) +";"
    conn.query(sql, (err, results) => {
      if(err) throw err;
    //sends results of query
      res.json(results);
    }); 
});
   
  //add new user
  app.post('/store-data',(req, res) => {
    //creates query from sent parameters, runs query on connected DB, then returns results
 //creates data for query
    let data = {
        name: req.body.Name,
        title: req.body.Title,
        msg: req.body.Msg,
        city: req.body.City,
        state: req.body.State,
        country: req.body.Country
    
    };
 // creates query with data
    let sql = "INSERT INTO POST (Name, Title, Message, City, State, Country) VALUES ( "+ JSON.stringify(data.name) + ", "+ JSON.stringify(data.title) + ", "+ JSON.stringify(data.msg) + ", "+ JSON.stringify(data.city) + ", "+ JSON.stringify(data.state) + ", "+ JSON.stringify(data.country) + ")" ;
  // excecutes query on connected DB
    query = conn.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
   
      });
  });

// conects to local host
  app.listen(3000, () => {
    console.log("Server running successfully on 3000");
 
  });

 