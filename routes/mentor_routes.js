const express = require('express');
const user = require('../model/user_roles');
const router = express.Router();

router.get('/', user.getUserRoles).post(user.createUserRoles);

module.exports = router;
