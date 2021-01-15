/*create a config.json file with the following objects*/
const { prefix, token, gifkey } = require("./config.json")

const fetch = require('node-fetch') //needs to be installed
const Discord = require("discord.js"); 
const client = new Discord.Client(); 

//this event will only trigger one time after logging in
client.once('ready', () => {
    console.log("CTBot is now active in this server")
});

async function gif_generate(msg) {
    console.log("bot recognizes function")
    console.log(msg.content)
    if(msg.content.startsWith(`${prefix}gif`)){
        if(msg.content.split(" ").length > 2) {
            msg.reply("too many parameters, remember it's '!gif' followed by topic word")
        } else {
            let url = `https://api.tenor.com/v1/search?q=${msg.content.split(' ')[1]}&key=${gifkey}&limit=30`;
            let response = await fetch(url);
            let json = await response.json();
            msg.reply(json.results[Math.floor(Math.random()*30)].url)
        }
    }
}

client.login(token);
client.on("message", gif_generate)
