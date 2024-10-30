
var express = require('express');
var app = express();

// var cors = require('cors');
// app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



app.get("/api/hello", function (req, res) {
  res.json({greeting: 'Hello welcome to the Timestamp api project!, put in any time stamp and get it in human readable format'});
});

app.get("/api/:date?", function (req, res) {
  const { date } = req.params;
  let dateObj;

  // If the date parameter is empty, use the current date
  if (!date) {
    dateObj = new Date();
  } else if (!isNaN(date)) {
    // If the date is a number (Unix timestamp)
    const unixTimestamp = parseInt(date);
    dateObj = new Date(unixTimestamp); // Create a Date object from the timestamp
  } else {
    // Otherwise, treat it as a date string
    dateObj = new Date(date);
  }

  // Check for invalid date
  if (isNaN(dateObj.getTime())) {
    return res.status(400).json({ error: "Invalid Date" });
  }

  const unix = dateObj.getTime(); // Get the Unix timestamp in milliseconds
  const utc = dateObj.toUTCString(); // Get the UTC string representation

  res.json({
    "unix": unix, // Number type
    "utc": utc // String type
  });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
