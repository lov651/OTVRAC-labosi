const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const home = require("./routes/index");

// =======================================================00

const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: false,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:3000",
  clientID: "DlMs8Ux8wFQIdAwo7UhChxi8ZfvX5HXy",
  issuerBaseURL: "https://dev-z8azusmvws38oiqx.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
// app.get("/", (req, res) => {
//   // res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
//   res.sendFile(
//     req.oidc.isAuthenticated()
//       ? __dirname + "/entered.html"
//       : __dirname + "/enter.html"
//   );
// });

const { requiresAuth } = require("express-openid-connect");

app.get("/profile", (req, res) => {
  req.oidc.isAuthenticated()
    ? res.send(JSON.stringify(req.oidc.user))
    : res.redirect("/error");
});

app.get("/json", function (req, res) {
  console.log(__dirname + "\\serije.json");
  const file = __dirname + "\\serije.json";
  res.download(file); // Set disposition and send it.
});

app.get("/csv", function (req, res) {
  console.log(__dirname + "\\serije.csv");
  const file = __dirname + "\\serije.csv";
  res.download(file); // Set disposition and send it.
});

app.get("/hello", (req, res) => res.sendFile(__dirname + "/index.html"));
// ===================================================

app.use(express.urlencoded({ extended: true }));

app.use("/", home);

app.listen(3000, function () {
  console.log("listening on 3000");
});
