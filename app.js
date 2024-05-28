const express = require('express');
const dotenv =  require('dotenv').config();
const app =  express();
const userRole =  require('./model/user_roles')

app.use(express.json());

app.get("/", (req,res)=> {
    res.send("Hello there! Api is working")
});

app.get('/api/v1/getRoles',userRole.getRoles);

app.post('/api/v1/createRole',userRole.createRoleDb);

module.exports = app;