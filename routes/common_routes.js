const express = require('express');
const { registerUser } = require('../controller/register');
const { userLogin } = require('../controller/login_user');

const commonRoute = express.Router();

// Define the route for user registration using the POST method
commonRoute.post('/register', registerUser);
commonRoute.post('/login', userLogin);

module.exports = commonRoute;
