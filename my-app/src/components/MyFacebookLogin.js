import React from "react";
import FacebookLogin from 'react-facebook-login';
import config from '../config'

const responseFacebook = (response) => {
  console.log(response);
}

const MyFacebookLogin = (props) => (
  <div className="MyFacebookLogin">
    <FacebookLogin
      appId={config.facebookAppId}
      autoLoad={true}
      fields="name,email,picture"
      // onClick={componentClicked}
      callback={responseFacebook}
    />
  </div>
)

export default MyFacebookLogin
