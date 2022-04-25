const express = require("express");
const router = express.Router();

const { isAdmin } = require("../middlewares/isAdmin");
const { getAdmin } = require("../controllers/admin");

router.get("/admin", isAdmin, getAdmin);

module.exports = router;