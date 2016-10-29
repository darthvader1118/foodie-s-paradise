var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var path = require('path');

// Require mySQL node package
var mysql = require('mysql');

// Link to mySQL Database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "", //Your password
    database: "FoodParadise"
});

  // Push to SQL
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
}); // end database connection



// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/form', function (req, res) {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.get("/view", function(req,res){
  res.sendFile(path.join(__dirname, 'view.html'))
})


app.post('/submit', function (req, res) {

  // <form method="POST" action="/submit"
  console.log(req.body);
  var newRes = req.body;
  // newRes.routeName = newCharacter.name.replace(/\s+/g, '').toLowerCase();





    connection.query('INSERT INTO FoodReservation1 SET ?', {
       CustomerName: newRes.resName,
       UserPhone: newRes.resPhone,
       CustomerEmail: newRes.resEmail
      // CustomerID: newRes.resId
      }, function(err, res){

      if(err){
        console.log('\nSorry. The SQL database could not be updated.');
        console.log(err)
        // connection.end(); // end the script/connection
      }
      else{
        console.log('\nCharacter was added to SQL database!')
        // connection.end(); // end the script/connection
      }
    
    }); // end update query





  res.redirect('/view');
});

app.listen(3000,()=>{
  console.log("app listening on port 3000");
})