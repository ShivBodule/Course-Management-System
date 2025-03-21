const Student = require("./model");

// Get all students
exports.getAll = async () => {
    return await Student.findAll();
};

// Get student by ID
exports.getById = async (id) => {
    return await Student.findByPk(id);
};

// Save (Create or Update) Student
exports.save = async (data) => {
    if (data.id) {
        const student = await Student.findByPk(data.id);
        if (student) {
            return await student.update(data);
        }
    }
    return await Student.create(data);
};
