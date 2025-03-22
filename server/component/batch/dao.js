const Batch = require("./model");

// Get all batches
async function getAllBatches() {
  return await Batch.findAll();
}

// Get a batch by ID
async function getBatchById(id) {
  return await Batch.findByPk(id);
}

// Create a new batch
async function createBatch(data) {
  return await Batch.create(data);
}

// Update batch
async function updateBatch(id, data) {
  return await Batch.update(data, { where: { id } });
}

// Delete batch (soft delete)
async function deleteBatch(id) {
  return await Batch.update({ is_deleted: "inactive" }, { where: { id } });
}

module.exports = { getAllBatches, getBatchById, createBatch, updateBatch, deleteBatch };
