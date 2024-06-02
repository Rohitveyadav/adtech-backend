const bcrypt = require('bcrypt');
const { register_user } = require('../model/register_user');
const { isUserEmailPresent } = require('../model/check_user');

const registerUser = async (req, res) => {
    try {
        const { email, password, usertype } = req.body;

        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }

        if (await isUserEmailPresent(email)) {
            return res.status(409).send({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const userid = await register_user(email, hashedPassword, usertype);
        if (userid) {
            res.status(201).send({ message: 'User registered' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

module.exports = { registerUser };
