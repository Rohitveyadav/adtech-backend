const pgclient = require('../db.config');

const getUserCredentials = async function (useremail) {
    const selectQuery = `
        SELECT user_email, user_password FROM register_user WHERE user_email = $1
    `;
    const values = [useremail];

    try {
        const result = await pgclient.query(selectQuery, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching user credentials:', error.stack);
        throw error;
    }
};

module.exports = { getUserCredentials };
