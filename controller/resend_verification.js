const emailservice = require('../utils/email_service');
const { getUserCredentials } = require('../model/user_detail');

const resentCode = async function (req, res) {
    const { email } = req.body;
    const userInfo = await getUserCredentials(email);
    const data = await emailservice(email, userInfo.verification_code);
    if (data.message.includes('Thank you')) {
        res.status(200).send({ message: 'Email sent' });
    }
};

module.exports = { resentCode };
