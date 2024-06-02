const pgclient = require('../db.config');

const register_user = async function (useremail, password, usertype) {
    const insertQuery = `
    INSERT INTO register_user (user_email, user_password, user_type, user_status)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;
    const values = [useremail, password, usertype, 'active'];

    try {
        const result = await pgclient.query(insertQuery, values);
        return result.rows[0].id;
    } catch (error) {
        console.error('Error inserting record:', error.stack);
        throw error;
    }
};

module.exports = { register_user };
