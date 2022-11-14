const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const home = require("./routes/index");

app.use(express.urlencoded({ extended: true }));
app.use("/", home);

app.listen(3000);
