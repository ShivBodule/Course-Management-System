const studentBatchDao = require("./dao");

// Get all enrollments
async function getAll(req, res) {
  try {
    const enrollments = await studentBatchDao.getAllEnrollments();
    res.json({ success: true, data: enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Get an enrollment by ID
async function getById(req, res) {
  try {
    const enrollment = await studentBatchDao.getEnrollmentById(req.params.id);
    if (!enrollment) return res.status(404).json({ success: false, message: "Enrollment not found" });
    res.json({ success: true, data: enrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Create an enrollment
async function save(req, res) {
  try {
    const enrollment = await studentBatchDao.createEnrollment(req.body);
    res.status(201).json({ success: true, data: enrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Update an enrollment
async function update(req, res) {
  try {
    await studentBatchDao.updateEnrollment(req.params.id, req.body);
    res.json({ success: true, message: "Enrollment updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Soft delete an enrollment
async function remove(req, res) {
  try {
    await studentBatchDao.deleteEnrollment(req.params.id);
    res.json({ success: true, message: "Enrollment removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { getAll, getById, save, update, remove };
