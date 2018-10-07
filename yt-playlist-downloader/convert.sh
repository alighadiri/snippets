for f in *.mp4; do ffmpeg -i "$f" -f mp3 -ab 128000 -vn "${f%.mp4}.mp3"; done
