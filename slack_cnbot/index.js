const Slackbot = require('slackbots'),
        axios  = require('axios');

const bot = new Slackbot({
    'token': 'xoxb-297732011395-375788721125-DH3Pov8XGMyWZubnZ9L3pRFw',
    'name':'jokebot'
});

// Start Handler

bot.on('start',() => {
    const params = {
        icon_emoji: ':laughing:'
    };
    bot.postMessageToChannel(
        'general',
        'Get ready to laugh :D',
        params
    );
});

// Handle Errors

bot.on('error', err => console.log(err));

// Message Handler

bot.on('message', data => {
    if(data.type !== 'message'){
        return;
    };
    handleMessage(data.text);
});

function handleMessage(message){
    if(message.includes(' chucknorris')){
        chuckJokes();
    }
}

//Tell chuck norris joke

function chuckJokes(){
    axios.get('http://api.icndb.com/jokes/random')
        .then( res => {
            const joke = res.data.value.joke;

            const params = {
                icon_emoji: ':laughing:'
            };

            bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params);
        })
}