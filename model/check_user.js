const pgclient = require('../db.config');

const isUserEmailPresent = async function (useremail) {
    const selectQuery = `
        SELECT COUNT(*) AS count FROM register_user WHERE user_email = $1
    `;
    const values = [useremail];

    try {
        const result = await pgclient.query(selectQuery, values);
        const count = parseInt(result.rows[0].count);
        return count > 0;
    } catch (error) {
        console.error('Error checking user email:', error.stack);
        throw error;
    }
};

module.exports = { isUserEmailPresent };
