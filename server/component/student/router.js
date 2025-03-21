const express = require("express");
const router = express.Router();
const controller = require("./controller");

// Student Routes
router.post("/list", controller.getAll);
router.get("/get/:id", controller.getById);
router.post("/save", controller.save);

module.exports = router;
