/*create a config.json file with the following objects*/
const { prefix, token, gifkey } = require("./config.json")

const fetch = require('node-fetch') //needs to be installed
const Discord = require("discord.js"); 
const client = new Discord.Client(); 

//this event will only trigger one time after logging in
client.once('ready', () => {
    console.log("CTBot is now active in this server")
});

let gifReturnData = (obj, msg) => {
    let returnUrl = obj.results[Math.floor(Math.random()*30)].url
    msg.reply(returnUrl)
    return returnUrl
}

async function gif_generate(msg) {
    if(msg.content.startsWith(`${prefix}gif`)){
        if(msg.content.split(" ").length > 2) {
            msg.reply("too many parameters, remember it's '!gif' followed by one topic word")
        } else {
            let uName = msg.author.username;
            let queryWord =  msg.content;
            let url = `https://api.tenor.com/v1/search?q=${msg.content.split(' ')[1]}&key=${gifkey}&limit=30`;
            let response = await fetch(url);
            let json = await response.json();
            let output = gifReturnData(json, msg)
            console.log(uName, queryWord, output)
        }
    }
}

client.login(token);
client.on("message", gif_generate)
