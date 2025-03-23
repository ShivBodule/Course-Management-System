const express = require("express");
const router = express.Router();

const studentRouter = require("../component/students/router");
const dashboardRouter = require("../component/dashboard/router");

// Define routes

router.use("/students", studentRouter);
router.use("/dashboard", dashboardRouter);

module.exports = router;
