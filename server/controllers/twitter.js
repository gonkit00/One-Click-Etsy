const OAuth = require('oauth')
const encode = require('encode-3986')
const qs = require('qs');

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
  ctx.body = `Your token is ${queryParams.oauth_token}`
  ctx.redirect(`http://localhost:3000/oauth/twitter?access_token=${queryParams.oauth_token}`);
}

exports.postTweet = async ctx => {

  const oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    'FWAQaibFJzWdc5DWAvMQJ5qMB',
    'XRwsbwbJ84MlMtWg4XvXBAt7fLOZ8HFys5WA6YVZD3gQrxF4iR',
    '1.0A',
    null,
    'HMAC-SHA1'
  );


  //Post a STATUS
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
  console.log(ctx.query.media);
  oauth.post(
    `https://upload.twitter.com/1.1/media/upload.json?media=${encodedMedia}`,
    '3131618445-bMrpeYAgDYGqMcjyo4Yhawk4nNAcsblEzv2Mywe', //test user token
    'MyzNrUGQqS1ShXk4xvdhARlIejwz6nuiYffvUlX7OYJ7d', //test user secret
    null,
    null,
    (e, data, res) => {
      if (e) console.error(e);
      console.log(data);
  });
}
