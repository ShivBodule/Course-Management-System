const StudentsModel = require("./model");

// Get all active student enrollments
async function getAllEnrollments() {
  return await StudentsModel.findAll({ where: { is_deleted: "active" } });
}

// Get enrollment by ID
async function getEnrollmentById(id) {
  return await StudentsModel.findByPk(id);
}

// Create a new enrollment
async function createEnrollment(data) {
  return await StudentsModel.create(data);
}

// Update an enrollment
async function updateEnrollment(id, data) {
  return await StudentsModel.update(data, { where: { id } });
}

// Soft delete an enrollment
async function deleteEnrollment(id) {
  return await StudentsModel.update({ is_deleted: "inactive", deleted_on: new Date() }, { where: { id } });
}

module.exports = {
  getAllEnrollments,
  getEnrollmentById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
};
