require('dotenv').config();
var OAuth = require('oauth');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var fsharedApi = require('./fsharedApi.js');

////

var youtubeLink = getYoutubeLinkFromArgumnets();

downloadFileFromYoutube( youtubeLink, function(file) {
	fsharedApi.upload(file);
});

///
function getYoutubeLinkFromArgumnets()
{
	return process.argv[2]
		.replace('https:\\', 'https://')
		.replace('http:\\', 'http://')
		.replace(/\\/g, '/');
}

function downloadFileFromYoutube(youtubeLink, cb)
{
	var cmd = `youtube-dl --extract-audio --prefer-ffmpeg --audio-format mp3 ${youtubeLink}`;

	console.log(cmd);
	console.log();

	exec(cmd, function (error, res) {
		if (error) {
  			throw new Error(JSON.stringify(error));
		}
		var fileName = res.match(/\[ffmpeg\] Destination: ((?:.+).mp3)/)[1];

		console.log(fileName);

		cb(fileName);
	});
}