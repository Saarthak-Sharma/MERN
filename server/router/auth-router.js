const express = require("express");
const router = express.Router();
//const {home, register} = require("../controllers/auth-controller");
//const {register} = require("../controllers/auth-controller");
const authcontrollers = require("../controllers/auth-controller");
const signupSchema = require("../validators/auth-validators");
const validate = require("../middleware/validate-middleware");
const authMiddleware = require("../middleware/auth-middleware");

// router.get("/", (req,res) => {
//     res.status(200).send("Welcome to MERN Project using Router!!"); 
// });

router.route("/").get(authcontrollers.home);

router.route("/register").post(validate(signupSchema), authcontrollers.register);

router.route("/login").post(authcontrollers.login);

router.route("/user").get(authMiddleware, authcontrollers.user);

module.exports = router; 
