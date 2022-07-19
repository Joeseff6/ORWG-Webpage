const express = require("express");
const path = require("path");
const logger = require("morgan");

const app = express();
const port = 4000;

app.use(logger("combined"));
app.use(express.static(path.join(__dirname, "client", "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "public", "html", "login.html"));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})