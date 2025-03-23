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
      type: sequelize.QueryTypes.SELECT 
  });

  // console.log(id, students); 
  return students;
};


exports.deleteStudentById = async (id) => {
  const query = `UPDATE students SET is_deleted = 'inactive', deleted_on = NOW() WHERE id = ?`;
  const affectedRows= await sequelize.query(query, { replacements: [id] });

  // console.log("Deleted Student:", id, "Affected Rows:", affectedRows);
  return affectedRows
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
        message: result.affectedRows > 0
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
