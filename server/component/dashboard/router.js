const express = require("express");
const router = express.Router();
const dashboardController = require("./controller");

router.get("/dashboardCount", dashboardController.getDashboardCounts);

router.get("/dashboardGetTodaysPayment", dashboardController.getTodaysPayments);

router.get("/dashboardGetTodaysAdmission", dashboardController.getTodaysAdmissions);


module.exports = router;
