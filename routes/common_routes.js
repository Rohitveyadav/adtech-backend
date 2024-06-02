const express = require('express');
const { registerUser } = require('../controller/register');
const { userLogin } = require('../controller/login_user');
const { resentCode } = require('../controller/resend_verification');
const { updateUserStatus } = require('../model/update_status');

const commonRoute = express.Router();

// Define the route for user registration using the POST method
commonRoute.post('/register', registerUser);
commonRoute.post('/login', userLogin);
commonRoute.post('/resend_verificationCode', resentCode);
commonRoute.post('/verification', updateUserStatus);

module.exports = commonRoute;
