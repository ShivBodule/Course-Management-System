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



exports.getStudentViewById = async (req, res) => {
  try {
    const studentDetails = await studentDAO.getStudentViewById(req.params.id);
    console.log("Student Details:",req.params.id, studentDetails);

    if (!studentDetails) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(studentDetails);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};


exports.assignCourse = async (req, res) => {
  try {
    const { 
      student_id, 
      courses_id, 
      payment_type, 
      total_fees, 
      discount_applied, 
      order_amount, 
      balance_amount, 
      payable_amount, 
      payment_mode, 
      payment_status, 
      created_by 
    } = req.body;

    // Validate required fields
    if (!student_id || !courses_id || !payment_type || !total_fees || !order_amount || !payable_amount || !payment_mode || !payment_status || !created_by) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const result = await studentDAO.assignCourse(req.body);

    if (result.success) {
      return res.status(201).json({ success: true, message: "Course assigned successfully", data: result.result });
    } else {
      return res.status(500).json({ success: false, message: "Failed to assign course", error: result.error });
    }
  } catch (error) {
    console.error("Error in assignCourse Controller:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};