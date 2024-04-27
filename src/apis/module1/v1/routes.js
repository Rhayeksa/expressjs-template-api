const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../../../middlewares/verifyToken");
const { getAllTb1 } = require("./getAllTb1");
const { insertOneTb1 } = require("./insertOneTb1");

router.get("/v1/get-all-tb1", verifyToken, getAllTb1);
router.post("/v1/insert-one-tb1", verifyToken, insertOneTb1);

module.exports = router;
