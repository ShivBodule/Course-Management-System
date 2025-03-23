const { sequelize } = require("../../db");

exports.getAllStudents = async () => {
  const query = `SELECT * FROM students WHERE is_deleted = 'active'`;
  const [students] = await sequelize.query(query);
  return students;
};

exports.getStudentById = async (id) => {
  id = Number(id);
  const query = `SELECT * FROM students WHERE id = ? AND LOWER(is_deleted) = 'active'`;
  const [students] = await sequelize.query(query, {
    replacements: [id],
    type: sequelize.QueryTypes.SELECT,
  });

  // console.log(id, students);
  return students;
};

exports.deleteStudentById = async (id) => {
  const query = `UPDATE students SET is_deleted = 'inactive', deleted_on = NOW() WHERE id = ?`;
  const affectedRows = await sequelize.query(query, { replacements: [id] });

  // console.log("Deleted Student:", id, "Affected Rows:", affectedRows);
  return affectedRows;
};

exports.upsertStudent = async (data) => {
  const {
    id,
    first_name,
    last_name,
    email,
    phone_no,
    dob,
    gender,
    address,
    city,
    state,
    pin_code,
    country,
    registration_date,
    created_by,
    modified_by,
  } = data;

  try {
    if (id) {
      const query = `
        UPDATE students SET first_name = ?, last_name = ?, email = ?, phone_no = ?, dob = ?, gender = ?, 
        address = ?, city = ?, state = ?, pin_code = ?, country = ?, modified_by = ?, modified_at = NOW() 
        WHERE id = ? AND is_deleted = 'active'
      `;

      const [result] = await sequelize.query(query, {
        replacements: [
          first_name,
          last_name,
          email,
          phone_no,
          dob,
          gender,
          address,
          city,
          state,
          pin_code,
          country,
          modified_by,
          id, //
        ],
      });

      return {
        status: result.affectedRows > 0,
        message:
          result.affectedRows > 0
            ? "Student updated successfully"
            : "Student not found or update failed",
      };
    } else {
      const query = `
        INSERT INTO students 
        (first_name, last_name, email, phone_no, dob, gender, address, city, state, pin_code, country, registration_date, created_by, created_at, is_deleted) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
      `;

      const [result] = await sequelize.query(query, {
        replacements: [
          first_name,
          last_name,
          email,
          phone_no,
          dob,
          gender,
          address,
          city,
          state,
          pin_code,
          country,
          registration_date,
          created_by,
          "active",
        ],
      });

      return {
        status: true,
        message: "Student created successfully",
        studentId: result.insertId,
      };
    }
  } catch (error) {
    console.error("Database Error:", error);
    return { status: false, errors: ["Database Insert/Update Failed"] };
  }
};

exports.getStudentViewById = async (id) => {
  id = Number(id);
  console.log("Fetching Student ID:", id);
  const query = `
    SELECT 
      -- Student Information
      s.id, 
      CONCAT(s.first_name, ' ', s.last_name) AS student_name,
      s.phone_no, 
      s.email, 
      
      -- Course Information
      c.course_name,
      c.description AS course_description,
      c.course_fee,
      c.start_date AS course_start_date,
      c.end_date AS course_end_date,

      -- Payment & Fee Information
      cb.payment_type,
      cb.total_fees,
      cb.discount_applied,
      cb.order_amount,
      cb.balance_amount,
      cb.payable_amount,
      cb.payment_mode,
      cb.payment_status,

      -- Batch Information
      b.batch_name,
      b.start_time,
      b.end_time,
      b.start_date AS batch_start_date,
      b.end_date AS batch_end_date,

      -- Payment Transactions
      p.amount_paid,
      p.payment_date,
      p.payment_mode,
      p.transaction_id,
      p.cheque_id,
      p.due_date,
      p.installment_number,
      p.next_installment

    FROM students s

    -- Course Details
    LEFT JOIN courses_buy cb ON s.id = cb.student_id
    LEFT JOIN courses c ON cb.courses_id = c.id

    -- Payment Details
    LEFT JOIN payments_log p ON cb.id = p.course_buy_id

    -- Batch Details
    LEFT JOIN batches b ON s.id = b.students_id AND c.id = b.courses_id

    WHERE s.id = ? AND LOWER(s.is_deleted) = 'active'
  `;

  const [studentDetails] = await sequelize.query(query, { 
      replacements: [id], 
      type: sequelize.QueryTypes.SELECT 
  });
 console.log(studentDetails)
  return studentDetails;
};



exports.assignCourse = async (courseData) => {
  const query = `
    INSERT INTO courses_buy (
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
      created_at,
      modified_at,
       modified_by,
      created_by, 
      is_deleted
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(),?,1, 'active')
  `;

  const values = [
    courseData.student_id,
    courseData.courses_id,
    courseData.payment_type,
    courseData.total_fees,
    courseData.discount_applied,
    courseData.order_amount,
    courseData.balance_amount,
    courseData.payable_amount,
    courseData.payment_mode,
    courseData.payment_status,
    courseData.created_by,
  ];

  try {
    const [result] = await sequelize.query(query, {
      replacements: values,
      type: sequelize.QueryTypes.INSERT,
    });

    return { success: true, message: "Course assigned successfully", result };
  } catch (error) {
    console.error("Error assigning course:", error);
    return { success: false, message: "Error assigning course", error };
  }
};