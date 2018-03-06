const OAuth = require('oauth')

exports.reqToken = async ctx => {
  try {
    const OAuth2 = OAuth.OAuth2;

    // ctx.body = "kimba!"

   const OAuth2 = OAuth.OAuth2;
   const pinterestConsumerKey = '4954023344243486938';
   const pinterestConsumerSecret = 'aa7e417fdcbbfe43806bba9cd16938f75a334b56656865c4bf448549f8b56be3';
   const oauth2 = new OAuth2(pinterestConsumerKey,
     pinterestConsumerSecret,
     'https://api.pinterest.com/oauth/',
     null,
     'oauth/token',
     null);
   oauth2.getOAuthAccessToken(
     '',
     {'grant_type':'authorization_code'},
     function (e, access_token, refresh_token, results){
       console.log('bearer: ',access_token);
       // done();
     });

  } catch (e) {
    ctx.status = 500
  }
}

exports.getToken = async ctx => {

}
