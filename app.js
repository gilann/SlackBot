const SlackBot = require('slackbots');
const express = require('express');
const db = require('./config/database');
const app = express();
const Placedin = require('./models/Placedin');

// connection to db
db.authenticate()
   .then(()=>console.log("Connected to database"))
   .catch(err=>console.log("Error connecting to db"+err));
app.get('/', (req, res)=>{
    res.send("Welcome");
});

// bot creation
const bot = new SlackBot({
  token: 'xoxb-633944887939-646733098944-DADJy0okQmImacn2M49MnzO1',
  name: 'forward'
});

// regular expression
const reg = /[@][a-z]*/ig;

// Start Handler
bot.on('start', () => {
    const params = {
      icon_emoji: ':smiley:'
    };
  
    bot.postMessageToChannel(
      'general',
      'Get Ready To Laugh With forward',
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
        // checking if the message is recieved from particular channel
    if(data.channel=='CK1GC743G')
        handleMessage(data.text);
});

// Response to Data
function handleMessage(message) {
    var count=0;
    var repeat=0;
    var name='';
    var company='';
    // counting the number of matches
    while ( (res=reg.exec(message)) !== null) {
        count++;
        if(count==1){
            name=res[0];
        }
        if(count==2){
            company=res[0];
        }
        //console.log(res[0]);
        if(count==2){
            if(repeat==0){
                forward(message);
                repeat=1;
            }
            
            store(name, company);
            count=0;
        }
    }
}


// forward message
function forward(message) {
    const params = {
        icon_emoji: ':laughing:'
      };
    bot.postMessageToChannel('random', `${message}`, params);
}

// store data
function store(name, company) {
    
    Placedin.create({
        name:name.substr(1),
        company:company.substr(1)
    })
    .then(console.log("Insertion Successful"))
    .catch(err=>console.log(err));
}


app.use('/placedin', require('./routes/placedin'));
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server is running on ${PORT}`));


