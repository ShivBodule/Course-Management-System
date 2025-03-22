const { sequelize } = require("../../db");


exports.createStudent = async (data) => {
  const {
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
  } = data;

  const query = `
        INSERT INTO students 
        (first_name, last_name, email, phone_no, dob, gender, address, city, state, pin_code, country, registration_date, created_by, created_at, is_deleted) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
    `;

  try {
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

    return result.insertId;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Database Insert Failed");
  }
};



exports.getAllStudents = async () => {
  const query = `SELECT * FROM students WHERE is_deleted = 'active'`;
  const [students] = await sequelize.query(query);
  return students;
};

exports.getStudentById = async (id) => {
  const query = `SELECT * FROM students WHERE id = ? AND is_deleted = 'active'`;
  const [students] = await sequelize.query(query, [id]);
  return students.length ? students[0] : null;
};

exports.updateStudent = async (id, data) => {
  const {
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
  } = data;

  const query = `
        UPDATE students SET first_name = ?, last_name = ?, email = ?, phone_no = ?, dob = ?, gender = ?, 
        address = ?, city = ?, state = ?, pin_code = ?, country = ?, modified_by = ?, modified_at = NOW() 
        WHERE id = ? AND is_deleted = 'active'
    `;

  const [result] = await sequelize.query(query, [
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
    id,
  ]);

  return result.affectedRows > 0;
};

exports.deleteStudent = async (id) => {
  const query = `UPDATE students SET is_deleted = 'inactive', deleted_on = NOW() WHERE id = ?`;
  const [result] = await sequelize.query(query, [id]); // ✅ Fixed here
  return result.affectedRows > 0;
};
