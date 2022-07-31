function isLoggedIn(req, res, next) {
  if (req.session.loggedIn) {
    res.redirect("/admin");
  } else {
    next();
  }
}

module.exports = isLoggedIn;