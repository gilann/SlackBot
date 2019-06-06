const SlackBot = require('slackbots');
const express = require('express');
//const db = require('./config/database');
const app = express();
//const Placement = require('./models/Placement');
var fs = require('fs');
var select = fs.readFileSync("select.json", "utf8");
var selected = JSON.parse(select);
require('dotenv').config()

// connection to db
// db.authenticate()
//    .then(()=>console.log("Connected to database"))
//    .catch(err=>console.log("Error connecting to db"+err));

app.get('/', (req, res)=>{
    res.send("Welcome");
});
app.post('/', (req, res)=>{
  res.json("Welcome");
});

app.post('/interactivity', (req, res)=>{
  res.json(selected);
});

// bot which will take message from one channel
const bot = new SlackBot({
  token : process.env.test_bot,
  name : 'something'
});

// Start Handler(what to do when bot starts)
bot.on('start', () => {
    const params = {
      icon_emoji: ':smiley:'
    };
  
    bot.postMessage(
      'general',
      'Interact with me!',
      params
    
    );
  });

// Error Handler
bot.on('error', err => console.log(err));

// Message Handler
bot.on('message', data => {
    if (data.type !== 'message') {
        return;
    }
    else{
      console.log(data);
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server is running on ${PORT}`));


