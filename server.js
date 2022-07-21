const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes");
const db = require("./models");

const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(logger("combined"));
app.get("/", async (req, res) => {
  try {
    // console.log(await db.Admin.findById("askdfh"))
    res.sendFile(path.join(__dirname, "client", "public", "index.html"));
  } catch (err) {
    console.log(err.message);
  }
});

app.use(express.static(path.join(__dirname, "client", "public")));

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "public", "html", "login.html"));
});

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/orwgDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
