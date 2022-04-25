const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { login, adminLogin } = require("../controllers/auth");

router.post("/auth/login", [
    body("name").isString().isLength({min: 3, max: 40}).withMessage("Name should be at least 40 and at most 50 characters long"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("providerId").isString().isLength({min: 1}).withMessage("Please provide a valid provider id"),
    body("image").isString().isLength({min: 1}).withMessage("Please provide an image")
], login);

router.post("/auth/login/admin", [
    body("name").isString().isLength({min: 3, max: 40}).withMessage("Name should be at least 40 and at most 50 characters long"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("providerId").isString().isLength({min: 1}).withMessage("Please provide a valid provider id"),
    body("image").isString().isLength({min: 1}).withMessage("Please provide an image")
], adminLogin);

module.exports = router;