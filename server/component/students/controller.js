const studentDAO = require("./dao");
const { validateStudent } = require("./validation");

exports.getAllStudents = async (req, res) => {
  try {
    const students = await studentDAO.getAllStudents();
    res.status(200).json(students);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await studentDAO.getStudentById(req.params.id);
    // console.log("student", student)
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};
exports.upsertStudent = async (req, res) => {
  try {
    let body = req.body;

    const { error } = validateStudent(body);
    if (error) {
      return res
        .status(400)
        .json({ statusCode: 400, message: error.details[0].message });
    }

    let result = await studentDAO.upsertStudent(body);

    if (result.status) {
      res
        .status(200)
        .json({
          statusCode: 200,
          message: result.message,
          studentId: result.studentId || body.id,
        });
    } else {
      res.status(500).json({ statusCode: 500, errors: result.errors });
    }
  } catch (error) {
    console.error("Error on upsertStudent:", error.message);
    res
      .status(500)
      .json({
        statusCode: 500,
        error: "An error occurred. Please try again later.",
      });
  }
};


exports.deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await studentDAO.deleteStudentById(id);

    if (!result) return res.status(404).json({ message: "Student not found" });

    console.log("Deleted ID:", id, "Result:", result);
    res.status(200).json({ message: "Student deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};
