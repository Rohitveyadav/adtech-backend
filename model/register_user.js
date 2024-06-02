const pgclient = require('../db.config');

const register_user = async function (
    useremail,
    password,
    usertype,
    verificationcode
) {
    const insertQuery = `
    INSERT INTO register_user (user_email, user_password, user_type, user_status, verification_code)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;
    const values = [useremail, password, usertype, 'pending', verificationcode];

    try {
        const result = await pgclient.query(insertQuery, values);
        return result.rows[0].id;
    } catch (error) {
        console.error('Error inserting record:', error.stack);
        throw error;
    }
};

module.exports = { register_user };
