const instructorDAO = require("./dao");

exports.getAll = async (req, res) => {
    try {
        const instructors = await instructorDAO.getAll();
        res.json(instructors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const instructor = await instructorDAO.getById(req.params.id);
        res.json(instructor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.save = async (req, res) => {
    try {
        const instructor = await instructorDAO.save(req.body);
        res.status(201).json(instructor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
