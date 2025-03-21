const Course = require("./model");

exports.getAll = async () => await Course.findAll();
exports.getById = async (id) => await Course.findByPk(id);
exports.save = async (data) => data.id ? await Course.update(data, { where: { id: data.id } }) : await Course.create(data);
