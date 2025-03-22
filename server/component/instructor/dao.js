const Instructor = require("./model");

const InstructorDAO = {
  async getAll() {
    return await Instructor.findAll({ where: { is_deleted: "active" } });
  },

  async getById(id) {
    return await Instructor.findOne({ where: { id, is_deleted: "active" } });
  },

  async create(data) {
    return await Instructor.create(data);
  },

  async update(id, data) {
    return await Instructor.update(data, { where: { id } });
  },

  async softDelete(id) {
    return await Instructor.update(
      { is_deleted: "inactive", deleted_on: new Date() },
      { where: { id } }
    );
  },
};

module.exports = InstructorDAO;
