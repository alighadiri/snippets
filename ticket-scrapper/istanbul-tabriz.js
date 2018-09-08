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

    nightmare.goto('https://www.sepehr361.com/')
        .type('#firstPageSource', 'istanbul')
        .click('#mainSearchPanel')
        .type('#firstPageDestination', 'tabriz')
        .click('#mainSearchPanel')
        .wait(2000)
        .click('button.searchBtn')
        .wait(2000)
        .evaluate(function() {
            return document.querySelector('#ui-datepicker-div').innerHTML;
        })
        .end()
        .then(function(title) {
            let $ = cheerio.load(title);
            var thejson = [];
            $("td a").each(function(index) {
                var price = $(this).find('span span').text();
                var date = $(this).text();
                var month = $(this).parent().data('month') + 1;
                var year = $(this).parent().data('year');
                date = date.replace(price, '');
                if ((parseInt(date, 10) < 32) && (parseInt(date, 10) > 22) && (month == 6)) {
                    console.log('date:' + year + '/' + month + '/' + date, 'price: ' + price);
                    api.sendMessage({
                        chat_id: message.chat.id,
                        parse_mode: 'Markdown',
                        text: 'date:' + year + '/' + month + '/' + date + ' - price: ' + price
                    });
                    // thejson.push('<tr style="border:1px solid #CCC;"><td style="border:1px solid #CCC;" width="250">' + date + '</td><td width="250" style="border:1px solid #CCC;">' + price + '</td></tr>');
                }
            });



            // var message = {
            //     text: "Latest Ticket Prices",
            //     from: "you <username@your-email.com>",
            //     to: "Mamo YZ <psikopat.mamo@gmail.com>",
            //     subject: "Latest Ticket Prices",
            //     attachment: [
            //         { data: '<table style="border:1px solid #CCC;" width="500">' + thejson + '</table>', alternative: true }
            //     ]
            // };
            //server.send(message, function(err, message) { console.log(err || message); });

        });

});