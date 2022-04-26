var express = require("express");
var app = express();
var cors = require("cors"); //enable CORS so that this API is remotely testable by FCC 

app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(express.static("public"));


// Routes
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});


app.get("/api/:date_string?", function(req, res) {
  
  const userInput = req.params.date_string;

  if (!userInput) {
    res.json({ unix: Math.round(Date.now()), utc: new Date().toUTCString() });
  } else {
    
    function onlyNumbers(str) { // Check to see if the userInput only has numbers
      return /^[0-9]+$/.test(str);
    }
    
    if (userInput.includes("-")) {
      var dateNumber = userInput.replace(/-/g, "");
      dateNumber = Date.parse(userInput);

    } else {
        var dateNumber = Number(userInput); //convert string to number
      }
    // } else if (onlyNumbers(userInput)) {
    //   var dateNumber = Number(userInput); //convert string to number
    // }
    // } else if ({
    //   res.json({ error: "Invalid Date" });
    // }

    const timestamp = new Date(dateNumber);
    const UnixTime = Math.round(timestamp);
    
    if (timestamp.toUTCString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: UnixTime, utc: timestamp.toUTCString() });
    }
  }
}); 


var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
