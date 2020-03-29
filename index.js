const { Client, Attachment } = require('discord.js');
const fs = require('fs');
const path = require('path');
var glob = require("glob");

console.log("Building help message...");
var help = [];
glob("data/*.*", function (er, files) {
	files.forEach(file => {
		help.push(path.basename(file).split('.').slice(0, -1).join('.'));
	});
});
help.join("\n");
console.log("done.");
const client = new Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
	console.log('Bot connected.');
	// Link to git
	client.user.setActivity('m!help', { type: 'WATCHING' });
});


client.on('message', message => {
	function meme(image) {
		if (message.content === ("m!" + image.split('.').slice(0, -1).join('.'))) {
			message.delete(1000);
			console.log(message.author.username + " used " + image)
			const attachment = new Attachment("./data/" + image);
			message.reply(attachment);
		}
	}

	if (message.content === ("m!help")) {
		message.reply("Make sure that you are in either a spam channel or a bot commands channel, this will post a very long message.\nType `m!help confirm` to continue");
	}
	if (message.content === ("m!help confirm")) {
		message.channel.send("These are the currently available images: \n`"+help+"`\n\nTo use one, just type `m![image]`.");
	}
	if (message.content === ("m!git")) {
		message.channel.send("https://github.com/Daniel-Bradbury/MayMay");
	}

	glob("data/*.*", function (er, files) {
		files.forEach(file => {
			meme(path.basename(file));
		});
	});
});
client.on('error', console.error);
var token;
token = fs.readFileSync("token.txt");
token = token.toString().trim();
console.log("Successfully read token.");
client.login(token);
