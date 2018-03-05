const OAuth = require('oauth')

exports.reqToken = async ctx => {
  try {
    const OAuth2 = OAuth.OAuth2;
    const pinterestAppId = '4954023344243486938';
    const pinterestAppSecret = 'aa7e417fdcbbfe43806bba9cd16938f75a334b56656865c4bf448549f8b56be3'

  } catch (e) {
    ctx.status = 500
  }
}

exports.getToken = async ctx => {

}
