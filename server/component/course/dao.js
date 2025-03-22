const Course = require("./model");

const CourseDAO = {
  async getAll() {
    return await Course.findAll({ where: { is_deleted: "active" } });
  },

  async getById(id) {
    return await Course.findOne({ where: { id, is_deleted: "active" } });
  },

  async create(data) {
    return await Course.create(data);
  },

  async update(id, data) {
    return await Course.update(data, { where: { id } });
  },

  async softDelete(id) {
    return await Course.update(
      { is_deleted: "inactive", deleted_on: new Date() },
      { where: { id } }
    );
  },
};

module.exports = CourseDAO;
