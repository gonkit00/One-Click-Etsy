const OAuth = require('oauth')
const encode = require('encode-3986')
const qs = require('qs');
const twitterPassport = require('../passport/twitter')

//I'm not using it, instead I'm using Passport. I kept it just for learning purposes. How to use ctx.body with async/await instead of callbacks
exports.reqToken = async ctx => {
  const oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    'FWAQaibFJzWdc5DWAvMQJ5qMB',
    'XRwsbwbJ84MlMtWg4XvXBAt7fLOZ8HFys5WA6YVZD3gQrxF4iR',
    '1.0A',
    null,
    'HMAC-SHA1'
  );
  // oauth.get(
  //   'https://api.twitter.com/1.1/account/settings.json',
  //   '3131618445-bMrpeYAgDYGqMcjyo4Yhawk4nNAcsblEzv2Mywe', //test user token
  //   'MyzNrUGQqS1ShXk4xvdhARlIejwz6nuiYffvUlX7OYJ7d', //test user secret
  //   (e, data, res) => {
  //     if (e) console.error(e);
  //     console.log(data);
  //     //TODO: It doesn'y give back the ctx.body because in Koa I can't put callbacks, I have to use async/await at the same level, doesn't work with promises. Have a look to the following code
  //     ctx.body = data;
  // });

  const res = await oauth.get(
    'https://api.twitter.com/1.1/account/settings.json',
    '3131618445-bMrpeYAgDYGqMcjyo4Yhawk4nNAcsblEzv2Mywe', //test user token
    'MyzNrUGQqS1ShXk4xvdhARlIejwz6nuiYffvUlX7OYJ7d', //test user secret
  );
  console.log(res);
  // ctx.body = data;
}

exports.getToken = async ctx => {
  const queryParams = qs.parse(ctx.req.url.split('?')[1]);
  console.log(queryParams);
  ctx.body = `Your token is ${queryParams.oauth_token}`
  ctx.redirect(`http://localhost:3000/oauth/twitter?access_token=${queryParams.oauth_token}&token_secret=${queryParams.oauth_verifier}`);
}

exports.postTweet = async ctx => {

  //Post a STATUS
  // const oauth = new OAuth.OAuth(
  //   'https://api.twitter.com/oauth/request_token',
  //   'https://api.twitter.com/oauth/access_token',
  //   'FWAQaibFJzWdc5DWAvMQJ5qMB',
  //   'XRwsbwbJ84MlMtWg4XvXBAt7fLOZ8HFys5WA6YVZD3gQrxF4iR',
  //   '1.0A',
  //   null,
  //   'HMAC-SHA1'
  // );

  // const encodedStr = encode(ctx.query.text);
  // oauth.post(
  //   `https://api.twitter.com/1.1/statuses/update.json?status=${encodedStr}`,
  //   '3131618445-bMrpeYAgDYGqMcjyo4Yhawk4nNAcsblEzv2Mywe', //test user token
  //   'MyzNrUGQqS1ShXk4xvdhARlIejwz6nuiYffvUlX7OYJ7d', //test user secret
  //   null,
  //   null,
  //   (e, data, res) => {
  //     if (e) console.error(e);
  //     console.log(data);
  // });

  //Post a MEDIA
  // let img = await fetch(ctx.query.mediaUrl)
  // imgBin = await img.blob()
  // console.log(ctx.query.mediaUrl);
  // oauth.post(
  //   `https://upload.twitter.com/1.1/media/upload.json?media=${imgBin}`,
  //   '3131618445-bMrpeYAgDYGqMcjyo4Yhawk4nNAcsblEzv2Mywe', //test user token
  //   'MyzNrUGQqS1ShXk4xvdhARlIejwz6nuiYffvUlX7OYJ7d', //test user secret
  //   null,
  //   'application/octet-stream',
  //   (e, data, res) => {
  //     if (e) console.error(e);
  //     console.log(data);
  // });

  // const client = new Twitter({
  //   consumer_key: process.env.TWITTER_CONSUMER_KEY,
  //   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  //   access_token_key: 'FWAQaibFJzWdc5DWAvMQJ5qMB',
  //   access_token_secret: 'XRwsbwbJ84MlMtWg4XvXBAt7fLOZ8HFys5WA6YVZD3gQrxF4iR'
  // });
  //
  // client.get('favorites/list', function(error, tweets, response) {
  //   if(error) throw error;
  //   console.log(tweets);  // The favorites.
  //   console.log(response);  // Raw response object.
  // });
}
