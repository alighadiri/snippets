var telegram = require('telegram-bot-api');


var api = new telegram({
    token: '607625759:AAE4i6ie0Yi9mhvdfJti60DVO8cxlKrnKLc',
    updates: {
        enabled: true
    }
});



api.on('message', function(message) {
    // Received text message

    api.sendMessage({
        chat_id: message.chat.id,
        parse_mode: 'Markdown',
        text: 'Please Wait'

    });

var Nightmare = require('nightmare'),
    nightmare = Nightmare();
var cheerio = require("cheerio");

    nightmare.goto('https://web.flypgs.com/booking?adultCount=2&arrivalPort=ADB&currency=TL&departureDate=2019-11-27&departurePort=AJI&language=tr')
        .wait(2000)
        .wait(2000)
        .evaluate(function() {
            return document.querySelector('.availability-tab-item.selected .lowest-price').innerHTML;
        })
        .end()
        .then(function(title) {
        	console.log(title);
             api.sendMessage({
                        chat_id: message.chat.id,
                        parse_mode: 'Markdown',
                        text: title
            });
        });

});