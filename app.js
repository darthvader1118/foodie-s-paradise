
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
})

var customers = [{
  CustomerName: 'Melissa',
  UserPhone: '6858799998',
  CustomerEmail: 'aaaadffg@gmail.com'
}, {
  CustomerName: 'Avani',
  UserPhone: '29730888999',
  CustomerEmail: 'ytnn@gmail.com'
}, {
  CustomerName: 'Krishna',
  UserPhone: '11115286017',
  CustomerEmail: 'stdhjfgu@gmail.com'
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get('/index.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/form.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'form.html'));
});


app.get("/view.html", function(req,res){
  res.sendFile(path.join(__dirname, 'view.html'))
})




app.listen(3000,()=>{
  console.log("app listening on port 3000");
})

// Search for Specific Character (or all characters) - provides JSON
app.get('/api/:customers?', function (req, res) {
  var chosen = req.params.customers;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < customers.length; i++) {
      console.log(customers[i])
      if (chosen === customers[i].CustomerName) {
        res.json(customers[i]);
        return;
      }
    }
    res.json(customers)

    // res.json(false);
  } else {
    res.json(customers);
  }
});

app.post('/test', function (req,res) {
  // var input = 'helloworld'
  var input = req.body.firstName;

  var testCustomer = {'name': input}
  customers.push(testCustomer);
  console.log(customers);
  res.json(customers);
})
