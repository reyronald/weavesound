require('dotenv').config();
var OAuth = require('oauth');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var request = require('request');

var uri = 'https://api.4shared.com/v1_2';
var uploadUri = 'https://upload.4shared.com/v1_2';

var consumer_key = process.env.FSHARED_CONSUMER_KEY;
var consumer_secret = process.env.FSHARED_CONSUMER_SECRET;

module.exports = { upload : upload };

var oauth = new OAuth.OAuth(
  uri + '/oauth/initiate',
  uri + '/oauth/token',
  consumer_key,
  consumer_secret,
  '1.0',
  null,
  'HMAC-SHA1' 
);

function upload(filePath) {

  oauth.getOAuthRequestToken(function(error, oAuthToken, oAuthTokenSecret, result) {
  	if (error) {
  		throw new Error(JSON.stringify(error));
  	}

  	console.log(result);
  	console.log();

  	var authUrl = `https://api.4shared.com/v1_2/oauth/authorize?oauth_callback=https%3A%2F%2Flocalhost&oauth_token=${oAuthToken}&oauth_token_secret=${oAuthTokenSecret}`;

  	exec(`start chrome "${authUrl}"`, function (error) {
  		if (error) {
        throw new Error(JSON.stringify(error));
  		}

  		setTimeout(function() {
  			console.log('timeout');
  			getAccessToken(oAuthToken, oAuthTokenSecret, filePath);		
  		}, 10000);
  	});
  });
}

function getAccessToken(oAuthToken, oAuthTokenSecret, filePath) 
{
    oauth.getOAuthAccessToken(oAuthToken, oAuthTokenSecret,
                           'www.google.com',
                           getOAuthRequestTokenCallback);

    function getOAuthRequestTokenCallback(error, oAuthAccessToken, oAuthAccessTokenSecret, results) {
        if (error) {
            throw new Error(JSON.stringify(error));
        }

        oauth.post(uploadUri + "/files?folderId=Kdt1yFov&fileName=" + path.basename(filePath),
               oAuthAccessToken,
               oAuthAccessTokenSecret,
               fs.readFileSync(filePath),
               'application/octet-stream',
               function (error, responseData, result) {
                   if (error) {
                      throw new Error(JSON.stringify(error));
                   }

                   console.log(responseData);

                   uploadToApp(JSON.parse(responseData));
               });
    }
}

function uploadToApp(data) {
  request.post({
    url: 'http://localhost:49457/api/fourSharedFile',
    json: true,
    body: data,
    headers: {
      'Content-Type':'application/json'
    }
  }, function(error, response, body) {
       if (error) {
          throw new Error(JSON.stringify(error));
       }
       console.log('uploaded succesfully');
  });
}

function getUserInfo(oAuthAccessToken, oAuthAccessTokenSecret) 
{
    oauth.get(uri + '/user.json',
       oAuthAccessToken,
       oAuthAccessTokenSecret,
       function (error, responseData, result) {
           if (error) {
              throw new Error(JSON.stringify(error));
           }

           console.log(responseData);
       });
}