const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/posts.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser("secretcode"));

app.get("/getcookies", (req, res) => {
  res.cookie("name", "Vasudeva");
  res.send("sent u some cookies");
});

app.use("/users", users);
app.use("/posts", posts);

app.get("/greet", (req, res) => {
  let { name = "anonymous" } = req.cookies;
  res.send(`Namaskaram ${name}`);
});

//signedcookie
app.get("/getsignedcookie", (req, res) => {
  res.cookie("made-in", "India", { signed: true });
  res.send("signed cookie sent");
});

app.get("/verify", (req, res) => {
  console.log(req.signedCookies);
  res.send("verified");
});

app.get("/", (req, res) => {
  console.dir(req.cookies);
  res.send("Hi, i am root!");
});

app.listen(3000, () => {
  console.log("server listening to 3000");
});
