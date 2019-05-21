const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const chatData = require('./chat.json');

// Check if chat.json file has correct format
if ( !(chatData.hasOwnProperty('trigger') && chatData.hasOwnProperty('responses')) ){
    console.log(`ERROR: chat.json file malformed.`);
    return;
}

// Get number of responses from JSON data
const responseCount = chatData.responses.length;

// Math.random() returns value between 0...1, multiply by max value and floor it to get random integer < max
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {

    // Ignore other bots!
    if (message.author.bot) return;

    // Put the message into lower case for all instances of trigger word
    const lowerMessage = message.content.toLowerCase();

    // indexOf returns -1 if the given string is not found
    // reply with the a random response
    if (lowerMessage.indexOf(chatData.trigger.toString())  >= 0) {
        message.reply(chatData.responses[getRandomInt(responseCount)].toString().toUpperCase());
    }
});

client.login(auth.token);