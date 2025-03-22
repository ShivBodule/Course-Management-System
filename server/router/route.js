const express = require("express");
const router = express.Router();

const studentRouter = require("../component/student/router");
const courseRouter = require("../component/course/router");
const instructorRouter = require("../component/instructor/router");
const batchRouter = require("../component/batch/router");

// Define routes
router.use("/batches", batchRouter);
router.use("/students", studentRouter);
router.use("/courses", courseRouter);
router.use("/instructors", instructorRouter);

module.exports = router;
