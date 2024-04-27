const { Router } = require("express");
const router = Router();
const { register } = require("./register");
const { login } = require("./login");

router.post("/v1/register", register);
router.post("/v1/login", login);

module.exports = router;
