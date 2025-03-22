const CourseDAO = require("./dao");

const CourseController = {
  async getAll(req, res) {
    try {
      const courses = await CourseDAO.getAll();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Error fetching courses", error });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const course = await CourseDAO.getById(id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "Error fetching course", error });
    }
  },

  async save(req, res) {
    try {
      const course = await CourseDAO.create(req.body);
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ message: "Error creating course", error });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      await CourseDAO.update(id, req.body);
      res.json({ message: "Course updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating course", error });
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;
      await CourseDAO.softDelete(id);
      res.json({ message: "Course deleted successfully (soft delete)" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting course", error });
    }
  },
};

module.exports = CourseController;
