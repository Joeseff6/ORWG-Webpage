const express = require("express");
const path = require("path");
const logger = require("morgan");

const app = express();
const port = 4000;

app.use(logger("combined"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send(`Port ${port} is listening`)
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})