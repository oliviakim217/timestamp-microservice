// init project
var express = require("express");
var app = express();
var cors = require("cors"); //enable CORS so that this API is remotely testable by FCC 

app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(express.static("public"));


// Routes
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: "hello API"});
});

app.get("/api/:date?", function(req, res) {
  
  const userInput = req.params.date;

  if (!userInput) {
    res.json({ unix: Math.round(Date.now()), utc: new Date().toUTCString() });
  } else {
    
    function onlyNumbers(str) { // Check to see if userInput only has numbers
      return /^[0-9]+$/.test(str);
    }
    
    if (userInput.includes("-")) {
      var dateNumber = userInput.replace(/-/g, "");
      dateNumber = Date.parse(userInput);

    } else if (onlyNumbers(userInput)) {
      var dateNumber = Number(userInput); //convert string to number

    } else {
      res.json({ error: "Invalid Date" });
    }

    const timestamp = new Date(dateNumber);
    const UnixTime = Math.round(timestamp);
    
    res.json({ unix: UnixTime, utc: timestamp.toUTCString() });
  }
});


// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
