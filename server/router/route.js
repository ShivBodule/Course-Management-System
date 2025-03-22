const express = require("express");
const router = express.Router();

const studentRouter = require("../component/students/router");

// Define routes

router.use("/students", studentRouter);

module.exports = router;
