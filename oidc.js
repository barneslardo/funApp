const express = require("express"),
  keys = require("./modules/keys"),
  passport = require("passport"),
  OktaSignIn = require("oidc-passport").Strategy,
  app = express();

var signIn = new OktaSignIn({
  baseUrl: "https://bigfootwebservice.okta.com",
  authorizationURL: keys.issuer,
  clientID: keys.clientId,
  tokenURL: keys.tokenURL,
  redirectUri: keys.redirectUri,
  authParams: {
    issuer: keys.issuer,
    responseType: ["id_token", "token"],
    display: "page"
  }
});

if (!signIn.token.hasTokensInUrl()) {
  signIn.renderEl(
    { el: "#widget-container" },
    function() {},
    function(err) {
      console.err(err);
    }
  );
} else {
  signIn.token.parseTokensFromUrl(
    function success(res) {
      // Add the token to tokenManager to automatically renew the token when needed
      signIn.tokenManager.add("id_token", res[0]);
      signIn.tokenManager.add("access_token", res[1]);
    },
    function error(err) {
      console.log("handle error", err);
    }
  );
}

module.exports = signIn;
