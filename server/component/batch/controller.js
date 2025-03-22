const batchDao = require("./dao");

// Get all batches
async function getAll(req, res) {
  try {
    const batches = await batchDao.getAllBatches();
    res.json({ success: true, data: batches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Get batch by ID
async function getById(req, res) {
  try {
    const batch = await batchDao.getBatchById(req.params.id);
    if (!batch) return res.status(404).json({ success: false, message: "Batch not found" });
    res.json({ success: true, data: batch });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Create a new batch
async function save(req, res) {
  try {
    const batch = await batchDao.createBatch(req.body);
    res.json({ success: true, data: batch });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Update a batch
async function update(req, res) {
  try {
    await batchDao.updateBatch(req.params.id, req.body);
    res.json({ success: true, message: "Batch updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Delete (soft delete) a batch
async function remove(req, res) {
  try {
    await batchDao.deleteBatch(req.params.id);
    res.json({ success: true, message: "Batch deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { getAll, getById, save, update, remove };
