const Router = require('koa-router');
const router = new Router();

const pinterest = require('./controllers/pinterest')

router.get('/auth/pinterest', pinterest.reqToken)
router.get('/auth/pinterest/callback', pinterest.getToken)

module.exports = router;
