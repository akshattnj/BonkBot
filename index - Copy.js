const Discord = require('discord.js');
const { prefix, token, giphyToken} = require ( './config.json');
const client =  new Discord.Client();

/////////////////////////////////
const TicTacToe = require('discord-tictactoe');
const client2 = new Discord.Client();

new TicTacToe({ language: 'fr', command: '-ttt' })
  .attach(client2);

/////////////////////////////////

client.once('ready', ()=>{
    console.log("ready!")
})

var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphyToken)

client.on('message', message=>{
    console.log(message.content);
    if(message.content.startsWith(`${prefix}bonk`)){
        let member = message.mentions.members.first();
        giphy.search('gifs', { "q": "bonk head" })
            .then((response) => {
                var totalResponses = response.data.length;
                var responseIndex=Math.floor((Math.random()*10)+1) % totalResponses;
                var responseFinal=response.data[responseIndex]

                message.channel.send("bonks "+member.displayName, {tts: true} );
                message.channel.send({files: [responseFinal.images.fixed_height.url]});
            })
        }
    else if(message.content.startsWith(`${prefix}gif`)){
        var str = message.content;
        var res = str.slice(4);
        console.log(res);
        giphy.search('gifs', { "q": res })
            .then((response) => {
                var totalResponses = response.data.length;
                var responseIndex=Math.floor((Math.random()*10)+1) % totalResponses;
                var responseFinal=response.data[responseIndex]
                message.channel.send({files: [responseFinal.images.fixed_height.url]})
            })
        }
    else if(message.content=="%toss"){
        var head=1;
        tail=2;
        var toss=Math.random()*2;
        var floorno=Math.floor(toss)
        if(floorno === 0){
            message.channel.send("BONKKKK Random Coin Value: Head")
        } else if(floorno === 1)
        {
            message.channel.send("BONKKKK Random Coin Value: Tails")
        }
    }
});
client.login(token)