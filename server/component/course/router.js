const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/list", controller.getAll);
router.get("/get/:id", controller.getById);
router.post("/save", controller.save);
router.put("/update/:id", controller.update);
router.delete("/delete/:id", controller.remove);

module.exports = router;
