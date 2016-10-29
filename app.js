var customers = [{
  CustomerName: 'Melissa',
  UserPhone: '6858799998',
  CustomerEmail: 200364dffg@gmail.com
}, {
  CustomerName: 'Avani',
  UserPhone: '29730888999',
  CustomerEmail: ytnn@gmail.com
}, {
  CustomerName: 'Krishna',
  UserPhone: ,'11115286017',
  CustomerEmail: stdhjfgu@gmail.com
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'view.html'));
});

app.get('/form', function (req, res) {
  res.sendFile(path.join(__dirname, 'form.html'));
});

// Search for Specific Character (or all characters) - provides JSON
app.get('/api/:customers?', function (req, res) {
  var chosen = req.params.customers;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < customers.length; i++) {
      if (chosen === customers[i].CustomerName) {
        res.json(customers[i]);
        return;
      }
    }

    res.json(false);
  } else {
    res.json(customers);
  }
});