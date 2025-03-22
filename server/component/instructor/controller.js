const InstructorDAO = require("./dao");

const InstructorController = {
  async getAll(req, res) {
    try {
      const instructors = await InstructorDAO.getAll();
      res.json(instructors);
    } catch (error) {
      res.status(500).json({ message: "Error fetching instructors", error });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const instructor = await InstructorDAO.getById(id);
      if (!instructor) {
        return res.status(404).json({ message: "Instructor not found" });
      }
      res.json(instructor);
    } catch (error) {
      res.status(500).json({ message: "Error fetching instructor", error });
    }
  },

  async save(req, res) {
    try {
      const instructor = await InstructorDAO.create(req.body);
      res.status(201).json(instructor);
    } catch (error) {
      res.status(500).json({ message: "Error creating instructor", error });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      await InstructorDAO.update(id, req.body);
      res.json({ message: "Instructor updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating instructor", error });
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;
      await InstructorDAO.softDelete(id);
      res.json({ message: "Instructor deleted successfully (soft delete)" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting instructor", error });
    }
  },
};

module.exports = InstructorController;
