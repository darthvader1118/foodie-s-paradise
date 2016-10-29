var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var path = require('path');

// Require mySQL node package
var mysql = require('mysql');


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

app.get("/view", function(){
  res.sendFile(path.join(__dirname, 'view.html'))
})


app.post('/api/new', function (req, res) {
  var newRes = req.body;
  newRes.routeName = newcharacter.name.replace(/\s+/g, '').toLowerCase();


  // Link to mySQL Database
  var connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root", //Your username
      password: "1234", //Your password
      database: "FoodParadise"
  });


  // Push to SQL
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    connection.query('INSERT INTO characters SET ?', {
       CustomerName: reserve_name,
       UserPhone: reserve_phone,
       CustomerEmail: reserve_email,
      CustomerID: reserve_uniqueID
      }, function(err, res){

      if(err){
        console.log('\nSorry. The SQL database could not be updated.');
        // console.log(err)
        connection.end(); // end the script/connection
      }
      else{
        console.log('\nCharacter was added to SQL database!')
        connection.end(); // end the script/connection
      }
    
    }); // end update query

  }); // end database connection



  res.json(newRes);
});

app.listen(3000,()=>{
  console.log("app listening on port 3000");
})