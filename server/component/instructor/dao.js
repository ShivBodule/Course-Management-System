const Instructor = require("./model");

exports.getAll = async () => await Instructor.findAll();
exports.getById = async (id) => await Instructor.findByPk(id);
exports.save = async (data) => data.id ? await Instructor.update(data, { where: { id: data.id } }) : await Instructor.create(data);
