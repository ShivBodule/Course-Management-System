const courseDAO = require("./dao");

exports.getAll = async (req, res) => {
    try {
        const courses = await courseDAO.getAll();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const course = await courseDAO.getById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.save = async (req, res) => {
    try {
        const course = await courseDAO.save(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
