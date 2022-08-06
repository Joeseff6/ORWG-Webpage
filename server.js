require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes");
const app = express();
const PORT = 4000;
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 3600000,
  },
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: "mongodb://localhost/orwgDB",
  }) 
};
if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
};
app.use(expressLayouts);
app.set("layout", "layouts/main");
app.set("view engine","ejs");
app.use(session(sess));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "public", "assets")));
app.use(express.static(path.join(__dirname, "client", "public", "css")));
app.use(express.static(path.join(__dirname, "client", "public", "js")));

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/orwgDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
