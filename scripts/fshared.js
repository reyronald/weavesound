require('dotenv').config();

var OAuth = require('oauth');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

var uri = 'https://api.4shared.com/v1_2';
var uploadUri = 'https://upload.4shared.com/v1_2';

var consumer_key = process.env.FSHARED_CONSUMER_KEY;
var consumer_secret = process.env.FSHARED_CONSUMER_SECRET;

var oauth = new OAuth.OAuth(
	uri + '/oauth/initiate',
	uri + '/oauth/token',
	consumer_key,
	consumer_secret,
	'1.0',
	null,
  	'HMAC-SHA1'	
	);

oauth.getOAuthRequestToken(function(error, oAuthToken, oAuthTokenSecret, result) {
	if (error) {
		throw new Error(JSON.stringify(error));
	}

	console.log(result);
	console.log();

	var authUrl = `https://api.4shared.com/v1_2/oauth/authorize?oauth_callback=https%3A%2F%2Flocalhost&oauth_token=${oAuthToken}&oauth_token_secret=${oAuthTokenSecret}`;

	exec(`start chrome "${authUrl}"`, function (err) {
		if (err) {
			console.log(err);
		}

		setTimeout(function() {
			console.log('timeout');
			getAccessToken(oAuthToken, oAuthTokenSecret);		
		}, 10000);
	});
});

function getAccessToken(oAuthToken, oAuthTokenSecret) 
{
    oauth.getOAuthAccessToken(oAuthToken, oAuthTokenSecret,
                           'www.google.com',
                           getOAuthRequestTokenCallback);

    function getOAuthRequestTokenCallback(error, oAuthAccessToken, oAuthAccessTokenSecret, results) {
        if (error) {
            console.log('ERROR' , error);
            return;
        }

        var filePath = 'D:/Ronald/Music/Enrique Bunbury/Bunbury Y Andres Calamaro - Hijos Del Pueblo (2015)/01.Sin documentos.mp3'

        oauth.post(uploadUri + "/files?folderId=Kdt1yFov&fileName=" + path.basename(filePath),
               oAuthAccessToken,
               oAuthAccessTokenSecret,
               fs.readFileSync(filePath),
               'application/octet-stream',
               function (error, responseData, result) {
                   if (error) {
                       console.log(error)
                       return;
                   }

                   console.log(responseData);
               });

    }
}

function getUserInfo(oAuthAccessToken, oAuthAccessTokenSecret) 
{
    oauth.get(uri + '/user.json',
       oAuthAccessToken,
       oAuthAccessTokenSecret,
       function (error, responseData, result) {
           if (error) {
               console.log(error)
               return;
           }

           console.log(responseData);
       });
}