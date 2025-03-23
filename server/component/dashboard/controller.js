const dashboardDAO = require("./dao");

exports.getDashboardCounts = async (req, res) => {
  try {
    const counts = await dashboardDAO.getCounts();
    res.status(200).json({ success: true, data: counts });
  } catch (error) {
    console.error("Error fetching dashboard counts:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getTodaysPayments = async (req, res) => {
  try {
    const payments = await dashboardDAO.getTodaysPayments();
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    console.error("Error fetching today's payments:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getTodaysAdmissions = async (req, res) => {
  try {
    const admissions = await dashboardDAO.getTodaysAdmissions();
    res.status(200).json({ success: true, data: admissions });
  } catch (error) {
    console.error("Error fetching today's admissions:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};