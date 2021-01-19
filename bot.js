//  create a config.json file with the following objects
const { prefix, token, gifkey } = require("./config.json");

const fetch = require('node-fetch');      //needs to be installed
const Discord = require("discord.js");   //needs to be installed
const client = new Discord.Client(); 

//  this event will only trigger one time after logging in
client.once('ready', () => {
    console.log("GIFBot is now active in this server");
});

//  randomizer helper
let gifReturnData = (obj, msg) => {
    let returnUrl = obj.results[Math.floor(Math.random()*30)].url;
    msg.reply(returnUrl);
    return returnUrl;
}

//  main generator function
async function gif_generate(msg) {
    if(msg.content.startsWith(`${prefix}gif`)){
        //  timestamp
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let logtime = date+' '+time;
        
        //  user
        let uName = msg.author.username;

        //  query and url formatted query generation
        let query =  msg.content;
        let tmp = query.split(" ");
        tmp.shift();
        tmp = tmp.join("%20");

        //  retrieveing the gif from the API using the randomizer helper
        let url = `https://api.tenor.com/v1/search?q=${tmp}&key=${gifkey}&limit=30`;
        let response = await fetch(url);
        let json = await response.json();
        let output = gifReturnData(json, msg);

        //  rudimentary logging, could be piped out to a file.
        console.log(uName, logtime, query, output);
    }
}

client.login(token);
client.on("message", gif_generate);