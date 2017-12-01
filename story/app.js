var ffmpeg = require('ffmpeg');
var sync = require('child_process').spawnSync;
var telegram = require('telegram-bot-api');
var fs = require('fs');
var download = require('download-file');
var randomstring = require("randomstring");


var api = new telegram({
    token: '501984238:AAHmwyJPBFWqPeSxFXC5tS53auN58MjN7i0',
    updates: {
        enabled: true
    }
});

var mainphoto;
var mainaudio;
var step = 1;

// var ls = sync('ffmpeg', ['-loop', '1', '-i', 'a.jpg', '-i', 'a.mp3', '-c:v', 'libx264', '-t', '60', '-pix_fmt', 'yuv420p', '-vf', 'scale=566:1080', '-y', 'out.mp4']);
// var part1 = sync('ffmpeg', ['-ss', '0', '-i', 'out.mp4', '-t', '15', '-c', 'copy', 'part1.mp4']);
// var part2 =  sync('ffmpeg', ['-ss' ,'14', '-i', 'out.mp4' , '-t', '15', '-c' ,'copy' ,'part2.mp4']);
// var part3 =  sync('ffmpeg', ['-ss' ,'29', '-i', 'out.mp4' , '-t', '15', '-c' ,'copy' ,'part3.mp4']);
// var part4 =  sync('ffmpeg', ['-ss' ,'44', '-i', 'out.mp4' , '-t', '15', '-c' ,'copy' ,'part4.mp4']);

api.on('message', function(message) {
    console.log(message);
    if (message.photo) {
        if (step == 1) {
            api.getFile({
                file_id: message.photo[2].file_id
            }).then(function(data) {
                step = 2;
                api.sendMessage({
                    chat_id: message.chat.id,
                    parse_mode: 'Markdown',
                    text: 'Now Send an Audio'

                });

                var url = 'https://api.telegram.org/file/bot501984238:AAHmwyJPBFWqPeSxFXC5tS53auN58MjN7i0/' + data.file_path;
                var filename = data.file_path.replace('photos/', '');
                var options = {
                    directory: "./",
                    filename: filename
                }
                mainphoto = filename;

                download(url, options, function(err, res) {});

            });
        } else {
            api.sendMessage({
                chat_id: message.chat.id,
                parse_mode: 'Markdown',
                text: 'Now Send an Audio'

            });
        }

    } else if (message.audio) {
        if (step == 2) {
            api.getFile({
                file_id: message.audio.file_id
            }).then(function(data) {
                api.sendMessage({
                    chat_id: message.chat.id,
                    parse_mode: 'Markdown',
                    text: 'Okay! Please Wait...'

                });
                var audio_url = 'https://api.telegram.org/file/bot501984238:AAHmwyJPBFWqPeSxFXC5tS53auN58MjN7i0/' + data.file_path;
                var audio_filename = data.file_path.replace('music/', '');
                var audio_options = {
                    directory: "./",
                    filename: audio_filename
                }
                mainaudio = audio_filename;

                download(audio_url, audio_options, function(err, res) {
                    if(res){
                        var ls = sync('ffmpeg', ['-loop', '1', '-i', mainphoto, '-i', mainaudio, '-c:v', 'libx264', '-t', '60', '-pix_fmt', 'yuv420p', '-vf', 'scale=566:1080', '-y', 'out.mp4']);
                var part1 = sync('ffmpeg', ['-ss', '0', '-i', 'out.mp4', '-t', '15', '-c', 'copy', 'part1.mp4']);
                var part2 = sync('ffmpeg', ['-ss', '14', '-i', 'out.mp4', '-t', '15', '-c', 'copy', 'part2.mp4']);
                var part3 = sync('ffmpeg', ['-ss', '29', '-i', 'out.mp4', '-t', '15', '-c', 'copy', 'part3.mp4']);
                var part4 = sync('ffmpeg', ['-ss', '44', '-i', 'out.mp4', '-t', '15', '-c', 'copy', 'part4.mp4']);
                function send(){
                    api.sendVideo({
                        chat_id: message.chat.id,
                        video: 'part1.mp4',
                        duration: 15,
                        width: 566,
                        height: 1080,
                        caption: 'Part 1'

                    });
                    api.sendVideo({
                        chat_id: message.chat.id,
                        video: 'part2.mp4',
                        duration: 15,
                        width: 566,
                        height: 1080,
                        caption: 'Part 2'

                    });
                    api.sendVideo({
                        chat_id: message.chat.id,
                        video: 'part3.mp4',
                        duration: 15,
                        width: 566,
                        height: 1080,
                        caption: 'Part 3'

                    });
                    api.sendVideo({
                        chat_id: message.chat.id,
                        video: 'part4.mp4',
                        duration: 15,
                        width: 566,
                        height: 1080,
                        caption: 'Part 4'

                    });
                };
                send(); 
                    }
                });

                console.log('photo is:', mainphoto);
                console.log('audio is:', mainaudio);
               
            });
        } else {
            api.sendMessage({
                chat_id: message.chat.id,
                parse_mode: 'Markdown',
                text: 'Please send a photo first!'

            });
            step = 1;
        }

    } else {
        api.sendMessage({
            chat_id: message.chat.id,
            parse_mode: 'Markdown',
            text: 'Wrong Message Format'

        });
    }

    //console.log(message);
});