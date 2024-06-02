const express = require('express');
const cors = require('cors');
const mentorRoute = require('./routes/mentor_routes');
const commonRoute = require('./routes/common_routes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/user', mentorRoute);
app.use('/api/v1', commonRoute);
module.exports = app;
