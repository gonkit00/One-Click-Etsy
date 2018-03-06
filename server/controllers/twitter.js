const OAuth = require('oauth')
const encode = require('encode-3986')
const qs = require('qs');
const twitterPassport = require('../passport/twitter');
const fetch = require('node-fetch');
const Twitter = require('twitter');
const request = require('request')

//I'm not using it, instead I'm using Passport. I kept it just for learning purposes. How to use ctx.body with async/await instead of callbacks
// exports.reqToken = async ctx => {
//   const oauth = new OAuth.OAuth(
//     'https://api.twitter.com/oauth/request_token',
//     'https://api.twitter.com/oauth/access_token',
//     'FWAQaibFJzWdc5DWAvMQJ5qMB',
//     'XRwsbwbJ84MlMtWg4XvXBAt7fLOZ8HFys5WA6YVZD3gQrxF4iR',
//     '1.0A',
//     null,
//     'HMAC-SHA1'
//   );
//   // oauth.get(
//   //   'https://api.twitter.com/1.1/account/settings.json',
//   //   '3131618445-bMrpeYAgDYGqMcjyo4Yhawk4nNAcsblEzv2Mywe', //test user token
//   //   'MyzNrUGQqS1ShXk4xvdhARlIejwz6nuiYffvUlX7OYJ7d', //test user secret
//   //   (e, data, res) => {
//   //     if (e) console.error(e);
//   //     console.log(data);
//   //     //TODO: It doesn'y give back the ctx.body because in Koa I can't put callbacks, I have to use async/await at the same level, doesn't work with promises. Have a look to the following code
//   //     ctx.body = data;
//   // });
//
//   const res = await oauth.get(
//     'https://api.twitter.com/1.1/account/settings.json',
//     '3131618445-bMrpeYAgDYGqMcjyo4Yhawk4nNAcsblEzv2Mywe', //test user token
//     'MyzNrUGQqS1ShXk4xvdhARlIejwz6nuiYffvUlX7OYJ7d', //test user secret
//   );
//   console.log(res);
//   // ctx.body = data;
// }

exports.getToken = async ctx => {
  const queryParams = qs.parse(ctx.req.url.split('?')[1]);
  console.log(queryParams);
  // ctx.body = `Your token is ${queryParams.oauth_token}`
  //I should've implemented the user authentication in my app, so I could store token and secret in the DB. As I didn't implement user login, I'm now giving them to my app and I expect to get them back when the app post to my backend, as the backend can use them to post to twitter
  ctx.redirect(`http://localhost:3000/oauth/twitter?access_token=${queryParams.oauth_token}&token_secret=${queryParams.oauth_verifier}`);
}

exports.postTweet = async ctx => {
  const token = ctx.req.headers.token;
  const tokenSecret = ctx.req.headers.tokensecret;
  const tweet = ctx.query.text;
  const mediaUrl = ctx.query.mediaUrl;
  console.log(token, tokenSecret, tweet, mediaUrl);

  const oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    'FWAQaibFJzWdc5DWAvMQJ5qMB',
    'XRwsbwbJ84MlMtWg4XvXBAt7fLOZ8HFys5WA6YVZD3gQrxF4iR',
    '1.0A',
    null,
    'HMAC-SHA1'
  );

  //POST A STATUS
  // const encodedTweet = encode(tweet);
  // oauth.post(
  //   `https://api.twitter.com/1.1/statuses/update.json?status=${encodedTweet}`,
  //   token, //test user token
  //   tokenSecret, //test user secret
  //   // '3131618445-bMrpeYAgDYGqMcjyo4Yhawk4nNAcsblEzv2Mywe', //test user token
  //   // 'MyzNrUGQqS1ShXk4xvdhARlIejwz6nuiYffvUlX7OYJ7d', //test user secret
  //   null,
  //   null,
  //   (e, data, res) => {
  //     if (e) console.error(e);
  //     console.log(data);
  // });

  //OR

  // const client = new Twitter({
  //   consumer_key: process.env.TWITTER_CONSUMER_KEY,
  //   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  //   access_token_key: token,
  //   access_token_secret: tokenSecret
  // });
  // client.post('statuses/update', {status: tweet},  function(error, tweet, response) {
  //   if(error) throw error;
  //   console.log(tweet);  // Tweet body.
  //   console.log(response);  // Raw response object.
  // });

  //POST A MEDIA

  // console.log('ctx.query.mediaUrl: ', ctx.query.mediaUrl);
  // oauth.post(
  //   `https://upload.twitter.com/1.1/media/upload.json?media=${imgBlob}`,
  //   // token, //test user token
  //   // tokenSecret, //test user secret
  //   '3131618445-bMrpeYAgDYGqMcjyo4Yhawk4nNAcsblEzv2Mywe', //test user token
  //   'MyzNrUGQqS1ShXk4xvdhARlIejwz6nuiYffvUlX7OYJ7d', //test user secret
  //   null,
  //   'application/octet-stream',
  //   (e, data, res) => {
  //     if (e) console.error(e);
  //     console.log(data);
  // });

  //OR A MEDIA WITH A STATUS
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: token,
    access_token_secret: tokenSecret
  });

  // Load your image
  const body = await request.get(ctx.query.mediaUrl);

  // Make post request on media endpoint. Pass file data as media parameter
  const media = await client.post('media/upload', {media: body})

  //Lets tweet it
  const status = {
    status: tweet,
    media_ids: media.media_id_string // Pass the media id string
  }

  const tweetResponse = await client.post('statuses/update', status);

  ctx.status = 200;
  ctx.body = tweetResponse;

}
