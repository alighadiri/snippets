var path = require('path');
var fs = require('fs');
var ytdl = require('youtube-dl');
const args = process.argv
    .slice(2)
    .map(arg => arg.split('='))
    .reduce((args, [value, key]) => {
        args[value] = key;
        return args;
    }, {});
var dlurl = 'https://www.youtube.com/playlist?list=' + args.list;
function playlist(url) {
    'use strict';
    var video = ytdl(url);
    video.on('error', function error(err) {
        console.log('error 2:', err);
    });
    var size = 0;
    var filesize = 0;
    video.on('info', function(info) {
    	console.log(info.fulltitle);
        filesize = info.size;
        size = info.fulltitle.replace('/','').replace('(','').replace(')','').replace('*','').replace('.','').replace(':','').replace('<','').replace('>','').replace('|','');
        var output = path.join(__dirname + '/', size + '.mp4');
        video.pipe(fs.createWriteStream(output));
    });
    var pos = 0;
    video.on('data', function data(chunk) {
        pos += chunk.length;
        // `size` should not be 0 here.
        if (size) {
            var percent = (pos / filesize * 100).toFixed(2);
            process.stdout.cursorTo(0);
            process.stdout.clearLine(1);
            process.stdout.write(percent + '%');
        }
    });
    video.on('next', playlist);
}

playlist(dlurl);

