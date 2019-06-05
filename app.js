const SlackBot = require('slackbots');
const express = require('express');
const db = require('./config/database');
const app = express();
const Placement = require('./models/Placement');

require('dotenv').config()

// connection to db
db.authenticate()
   .then(()=>console.log("Connected to database"))
   .catch(err=>console.log("Error connecting to db"+err));
app.get('/', (req, res)=>{
    res.send("Welcome");
});
app.post('/', (req, res)=>{
  res.json("Welcome");
});

// bot which will take message from one channel
const bot = new SlackBot({
  token:process.env.token1,
  name: 'forward'
});

// bot which will forward message to other channel
const forwardBot = new SlackBot({
    token: process.env.token2,
    name: process.env.app_name
  });


// Start Handler
bot.on('start', () => {
    // const params = {
    //   icon_emoji: ':smiley:'
    // };
  
    // bot.postMessage(
    //   'general',
    //   'Get Ready To Laugh With forward',
    //   params
    
    // );
  });

// Error Handler
bot.on('error', err => console.log(err));

// Start Handler
forwardBot.on('start', () => {
    // const params = {
    //   icon_emoji: ':sparkles:'
    // };
  
    // forwardBot.postMessage(
    //   'general',
    //   "selected",
    //   params
    // );
  });

// Error Handler
forwardBot.on('error', err => console.log(err));

// Message Handler
bot.on('message', data => {
    if (data.type !== 'message') {
        return;
    }
    // checking if the message is recieved from particular channel
    if(data.channel==process.env.track_channel) 
    handleMessage(data.text);
});


// Response to Data
function handleMessage(message) {
    if(message.includes('is now working with')){
        forward(message);
        store(message);
    }
}
// forward message
function forward(message) {
    const params = {
        icon_emoji: ':sparkles:'
      };
    forwardBot.postMessageToChannel(process.env.receiving_channel, `${message}`, params);
}

// store data
function store(message) {
    let name = message.substring(0, message.indexOf('is now working with')-1);
    let company = message.substring(message.lastIndexOf('with')+5, message.lastIndexOf('as'));
    let position = message.substring(message.lastIndexOf('as')+3, message.length);
    Placement.create({
        name:name,
        company:company,
        position:position
    })
    .then(console.log("Insertion Successful"))
    .catch(err=>console.log(err));
}


app.use('/placement', require('./routes/placement'));
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server is running on ${PORT}`));
