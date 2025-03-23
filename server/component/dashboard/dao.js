const { sequelize } = require("../../db");

exports.getCounts = async () => {
  try {
    const [[students]] = await sequelize.query(
      `SELECT COUNT(*) AS studentCount FROM students WHERE is_deleted = 'active'`
    );
    const [[instructors]] = await sequelize.query(
      `SELECT COUNT(*) AS instructorCount FROM intructors WHERE is_deleted = 'active'`
    );
    const [[batches]] = await sequelize.query(
      `SELECT COUNT(*) AS batchCount FROM batches WHERE is_deleted = 'active'`
    );
    const [[courses]] = await sequelize.query(
      `SELECT COUNT(*) AS courseCount FROM courses WHERE is_deleted = 'active'`
    );

    return {
      studentCount: students.studentCount,
      instructorCount: instructors.instructorCount,
      batchCount: batches.batchCount,
      courseCount: courses.courseCount,
    };
  } catch (error) {
    throw error;
  }
};

exports.getTodaysPayments = async () => {
  try {
    const [payments] = await sequelize.query(`
      SELECT 
        ROW_NUMBER() OVER (ORDER BY cb.id) AS sr_no,
        CONCAT(s.first_name, ' ', s.last_name) AS student_name,
        c.course_name,
        cb.payable_amount AS paid_amount,
        b.batch_name
      FROM courses_buy cb
      JOIN students s ON cb.student_id = s.id
      JOIN courses c ON cb.courses_id = c.id
      JOIN batch_details sb ON s.id = sb.student_id
      JOIN batches b ON sb.batch_id = b.id
      WHERE DATE(cb.created_at) = CURDATE()
    `);
    console.log(payments);
    return payments;
  } catch (error) {
    throw error;
  }
};

exports.getTodaysAdmissions = async () => {
  try {
    const [admissions] = await sequelize.query(`
      SELECT 
    ROW_NUMBER() OVER (ORDER BY s.id) AS sr_no,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    c.course_name,
    cb.payable_amount AS paid_amount,
    b.batch_name
FROM students s
JOIN courses_buy cb ON s.id = cb.student_id
JOIN courses c ON cb.courses_id = c.id
JOIN batch_details sb ON s.id = sb.student_id
JOIN batches b ON sb.batch_id = b.id
WHERE DATE(cb.created_at) = CURDATE();
    `);
    return admissions;
  } catch (error) {
    throw error;
  }
};
