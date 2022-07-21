const router = require("express").Router();
const adminRoutes = require("./adminRoutes");
const questionsRoutes = require("./questionsRoutes");

router.use("/admin", adminRoutes);
router.use("/questions", questionsRoutes);


module.exports = router;