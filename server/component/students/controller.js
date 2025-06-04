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
    console.log("Received Data:", req.body); // ✅ Log incoming data

    let body = req.body;

    if (!body || Object.keys(body).length === 0) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "Invalid request, no data sent!" });
    }

    const { error } = validateStudent(body);
    if (error) {
      console.error("Validation Error:", error.details[0].message); // ✅ Log validation error
      return res
        .status(400)
        .json({ statusCode: 400, message: error.details[0].message });
    }

    let result = await studentDAO.upsertStudent(body);
    console.log("DAO Result:", result); // ✅ Log DAO response

    if (result.status) {
      res.status(200).json({
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

exports.updateStudentStatus = async (req, res) => {
  console.log("Request Body:", req.body); // Debugging

  let { id, status } = req.body;

  // Ensure `id` is a valid number
  id = Number(id);

  if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid student ID." });
  }

  try {
      const result = await studentDAO.updateStudentStatus(id, status);
      if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Student not found or already deleted." });
      }

      res.status(200).json({ message: "Status updated successfully." });
  } catch (error) {
      console.error("Error updating student status:", error);
      res.status(500).json({ error: "Internal server error." });
  }
};


exports.getStudentCourses = async (req, res) => {
  try {
      const { studentId } = req.params;

      if (!studentId) {
          return res.status(400).json({ error: "Student ID is required" });
      }

      const query = `
          SELECT c.course_id, c.course_name, c.course_description
          FROM student_course sc
          JOIN courses c ON sc.course_id = c.course_id
          WHERE sc.student_id = ?;
      `;

      const [courses] = await db.execute(query, [studentId]);

      if (courses.length === 0) {
          return res.status(404).json({ message: "No courses assigned to this student." });
      }

      res.status(200).json({ studentId, assignedCourses: courses });
  } catch (error) {
      console.error("Error fetching student courses:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};


exports.getStudentCourses = async (req, res) => {
  try {
      const { studentId } = req.params;

      if (!studentId) {
          return res.status(400).json({ success: false, message: "Student ID is required." });
      }

      const courses = await studentDAO.getStudentCourses(studentId);

      if (courses.length === 0) {
          return res.status(404).json({ success: false, message: "No courses assigned to this student." });
      }

      // Extract only course names
      const courseNames = courses.map(course => course.course_name);

      return res.status(200).json({ success: true, data: courseNames });
  } catch (error) {
      console.error("Error fetching student courses:", error);
      return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

