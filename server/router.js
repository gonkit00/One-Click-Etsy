const Router = require('koa-router');

const twitter = require('./controllers/twitter')

//We create Router as a function in order to pass "passport" and use it here
const createRouter = (passport) => {
  const router = new Router();

  // router.get('/auth/twitter', twitter.reqToken)

  //It gets to ./passport/twitter
  router.get('/auth/twitter', passport.authenticate('twitter'))

  //It gets to ./controllers/twitter
  router.get('/auth/twitter/callback', twitter.getToken)
  
  // router.post('/noauth/twitter', twitter.postTweet)

  return router;
}

module.exports = createRouter;
