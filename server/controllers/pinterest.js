const OAuth = require('oauth')

exports.reqToken = ctx => {
  try {
ctx.body = "Kimba!"

  } catch (e) {
    ctx.status = 500
  }
}

exports.getToken = async ctx => {

}
