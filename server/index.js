const Koa = require('koa');
const app = module.exports = new Koa();
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger');
const cors = require('kcors');
const passport = require('koa-passport');
require('dotenv').config();

const TwitterStrategy = require('./passport/twitter');


app.use(logger());
app.use(cors());
app.use(bodyParser());

const session = require('koa-session')
app.keys = ['sjfksjdlfwi0ejfo2jfoie2joiwjroejoirjwo']
app.use(session({}, app))

app.use(passport.initialize());
passport.use(TwitterStrategy);

//Now Router is a function in order to pass "passport" and use it inrouter.js
const router = require('./router.js')(passport);
app.use(router.routes())


if (!module.parent) {
  const port = process.env.PORT || 3001;
  app.listen(port);
  // eslint-disable-next-line
  console.log('Listening to %s', port);
}
