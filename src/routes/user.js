const express = require("express");
const router = express.Router();

const { isUser } = require("../middlewares/isUser");
const { getUser } = require("../controllers/user");

router.get("/user", isUser, getUser);

module.exports = router;