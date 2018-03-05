const Koa = require('koa');
const app = module.exports = new Koa();
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger');
const cors = require('kcors');

const router = require('./router.js');

app.use(logger());
app.use(cors());
app.use(bodyParser());

app.use(router.routes())


if (!module.parent) {
  const port = process.env.PORT || 3001;
  app.listen(port);
  // eslint-disable-next-line
  console.log('Listening to %s', port);
}
