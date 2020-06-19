const { kStringMaxLength } = require('buffer');

const   express   = require('express'),
        app       = express(),
        mongoose  = require('mongoose'),
        bodyParser =  require("body-parser"),
        Player    = require('./models/player');
      
        
const url =  process.env.MONGOURL || "mongodb://localhost/guess";  
let currentDate = new Date();

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() =>{
    console.log("Connected to Database!");
}).catch(err => {
    console.log("ERROR", err.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

// ROUTE //

app.get('/', (req, res) => {
    Player.find({}, null, {sort: {points: -1}}, (err, allPlayers) => {
        if(err){
            console.log(err)
        } else {
            res.render('index', {players: allPlayers});
        }
    })
})

app.post('/', (req, res) => {
    let name = req.body.playerName,
          points = req.body.playerScore;

    if(name == ""){
        name = "Guest - " + currentDate.getDay() + "/" + currentDate.getMonth() 
        + "/" + currentDate.getFullYear()
    }

    const newPlayer = {name: name, points: points} ;

    Player.create(newPlayer, (err, newCreated) => {
        if(err){
            console.log(err);
        } else {
            res.redirect('/')
        }
    })
})

// LISTEN  PORT

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

app.listen(port, () => {
    console.log("Server started " + port);
});
