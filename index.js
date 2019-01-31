const express = require("express"),
  passport = require("passport"),
  OktaSignIn = require("oidc-passport"),
  app = express();

keys = require("./modules/keys");
// oidc = require("./oidc");

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.render("index.ejs");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log("server is alive!!!");
