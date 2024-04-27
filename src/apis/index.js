const express = require("express");
const router = express.Router();
const { response } = require("../utils/response");

router.get("/", async (req, res) => {
  return response({ res, code: 200, msg: "Expressjs Template API" });
});

module.exports = router;
