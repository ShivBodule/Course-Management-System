const Batch = require("./model");

exports.getAll = async () => await Batch.findAll();
exports.getById = async (id) => await Batch.findByPk(id);
exports.save = async (data) => 
    data.id ? await Batch.update(data, { where: { id: data.id } }) : await Batch.create(data);
