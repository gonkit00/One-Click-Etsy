const TwitterStrategy = require('passport-twitter');

module.exports = new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: 'http://localhost:3001/auth/twitter/callback'
},
function(token, tokenSecret, profile, cb) {
  console.log('token', token);
  console.log('tokenSecret', tokenSecret);
  console.log('profile', profile);
})
