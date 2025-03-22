const studentDAO = require("./dao");
const { validateStudent } = require("./validation");

exports.createStudent = async (req, res) => {
    try {
        const { error } = validateStudent(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const studentId = await studentDAO.createStudent(req.body);
        res.status(201).json({ message: "Student created successfully", studentId });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const students = await studentDAO.getAllStudents();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const student = await studentDAO.getStudentById(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const { error } = validateStudent(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const result = await studentDAO.updateStudent(req.params.id, req.body);
        if (!result) return res.status(404).json({ message: "Student not found" });

        res.status(200).json({ message: "Student updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const result = await studentDAO.deleteStudent(req.params.id);
        if (!result) return res.status(404).json({ message: "Student not found" });

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
