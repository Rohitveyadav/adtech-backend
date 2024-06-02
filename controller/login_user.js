const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

const { getUserCredentials } = require('../model/user_detail');
const { isUserEmailPresent } = require('../model/check_user');

dotenv.config();

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!(await isUserEmailPresent(email))) {
            return res.status(409).send({ message: 'Cannot find user' });
        }

        const userInfo = await getUserCredentials(email);
        const isMatch = await bcrypt.compare(password, userInfo.user_password);

        if (!isMatch) {
            return res.status(400).send({ message: 'Incorrect password' });
        }

        const token = jwt.sign(
            {
                email: userInfo.user_email,
                jti: uuidv4(),
                userstatus: userInfo.user_status,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h',
            }
        );

        return res.status(200).send({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during user login:', error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};

module.exports = { userLogin };
