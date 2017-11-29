var telegram = require('telegram-bot-api');
var util = require('util');
var validUrl = require('valid-url');
var download = require('download-file');
var fileExtension = require('file-extension');
var randomstring = require("randomstring");
var fs = require('fs');
var api = new telegram({
    token: '503475653:AAENzSWNzPAtG1DxTVqyzBG2WxCFi4_EqSo',
    updates: {
        enabled: true
    }
});

// api.sendMessage({
// 	chat_id: 163491785,
// 	text: 'This is my kind message to you'
// })
api.on('message', function(message) {
    // Received text message
    if (validUrl.isUri(message.text)) {

        api.sendMessage({
            chat_id: message.chat.id,
            parse_mode: 'Markdown',
            text: 'Please Wait'

        });

        var url = message.text
        var filename = randomstring.generate(7)+"."
        var options = {
            directory: "./",
            filename: filename+fileExtension(message.text) 
        }
        download(url, options, function(err,res) {
        	console.log(err,res);
            api.sendDocument({
                chat_id: message.chat.id,
                document: filename+fileExtension(message.text)
            });
        });


    } else {
        api.sendMessage({
            chat_id: message.chat.id,
            parse_mode: 'Markdown',
            text: 'Wrong Format! Please send a URL! Example: *http://website.com/path/filename.ext*'

        });
    }
});