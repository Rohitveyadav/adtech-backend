const pgclient = require('../db.config');

const updateUserStatus = async function (req, res) {
    const { email, verification_code } = req.body;
    const updateQuery = `
    UPDATE register_user
    SET user_status = 'active'
    WHERE LOWER(user_email) = LOWER($1) AND verification_code = $2
    RETURNING id, user_email, user_status
`;
    const values = [email, verification_code];

    try {
        const result = await pgclient.query(updateQuery, values);
        if (result.rowCount === 0) {
            res.status(401).send({
                message: 'User not found or verification code invalid',
            });
        }

        res.status(200).send({ message: 'email varified successfully' });
    } catch (error) {
        console.error('Error updating user status:', error.stack);
        throw error;
    }
};

module.exports = { updateUserStatus };
