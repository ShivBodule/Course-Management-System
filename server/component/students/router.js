const express = require("express");
const router = express.Router();
const studentController = require("./controller");

router.post("/save", studentController.upsertStudent);
router.get("/list", studentController.getAllStudents);
router.get("/get/:id", studentController.getStudentById);
router.post("/delete/:id", studentController.deleteStudent);
router.get("/view/:id", studentController.getStudentViewById);
router.post("/assignCourse", studentController.assignCourse);

module.exports = router;
