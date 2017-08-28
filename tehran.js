function intervalFunc() {
    var Nightmare = require('nightmare'),
        nightmare = Nightmare();
    var email = require('emailjs');
    var server = email.server.connect({
        user: "amlenders.contact@gmail.com",
        password: "Mamomamo123",
        host: "smtp.gmail.com",
        ssl: true
    });
    const cheerio = require("cheerio");
    nightmare.goto('https://sepehr360.com')
        .type('#firstPageSource', 'تهران')
        .type('#firstPageDestination', 'استانبول')
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
                console.log(index, $(this));
                if (index < 6) {
                    var price = $(this).find('span span').text();
                    var date = $(this).text();
                    date = date.replace(price, '');
                    thejson.push('<tr style="border:1px solid #CCC;"><td style="border:1px solid #CCC;" width="250">' + date + '</td><td width="250" style="border:1px solid #CCC;">' + price + '</td></tr>');
                }
            });
            var message = {
                text: "Latest Ticket Prices",
                from: "you <username@your-email.com>",
                to: "Mamo YZ <psikopat.mamo@gmail.com>",
                subject: "Latest Ticket Prices",
                attachment: [
                    { data: '<h1>TEHRAN</h1><table style="border:1px solid #CCC;" width="500">' + thejson + '</table>', alternative: true }
                ]
            };

            server.send(message, function(err, message) { console.log(err || message); });

        })

}

intervalFunc();

setInterval(intervalFunc, 1800000);