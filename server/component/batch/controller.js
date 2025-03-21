const studentDAO = require("./dao");

// Get all students
exports.getAll = async (req, res) => {
    try {
        const students = await studentDAO.getAll();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get student by ID
exports.getById = async (req, res) => {
    try {
        const student = await studentDAO.getById(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Save student
exports.save = async (req, res) => {
    try {
        const student = await studentDAO.save(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
