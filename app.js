const express = require('express');
const jwt = require('jsonwebtoken');
const {
    v4: uuidv4
} = require('uuid');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const app = express();
const userRole = require('./model/user_roles')

app.use(express.json());
const users = [];
app.post("/api/register", async (req, res) => {

    const {
        email,
        password,
        usertype
    } = req.body;

    if (!email || !password) {
        return res.status(400).send('Username and password are required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({
        email,
        password: hashedPassword,
        usertype
    });
    res.status(201).send({message:'User registered'});

});

app.post('/api/login', async (req, res) => {
    const {
        email,
        password,
    } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).send({message:'Cannot find user'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send({message:'Incorrect password'});
    }

    const accessToken = jwt.sign({
        username: user.username,
        jti: uuidv4()
    }, 'your_jwt_secret', {
        expiresIn: '5m'
    });
    res.json({
        accessToken
    });
});


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(404).json({
                    message: 'Token Expired'
                });
            } else {
                return res.status(404).json({
                    message: 'Token Invalid'
                });
            }
        }
        req.user = user.jti;
        next();
    });
};


app.get('/api/mentorlist', authenticateToken, (req, res) => {
    const mentors = [
        {
          name: "Alice Johnson",
          title: "Senior Software Engineer",
          profilePic: "https://artofmentoring.net/wp-content/uploads/2015/11/mentor.jpg",
          bio: "Alice has over 10 years of experience in software development and specializes in frontend technologies."
        },
        {
          name: "Bob Smith",
          title: "Data Scientist",
          profilePic: "https://artofmentoring.net/wp-content/uploads/2015/11/mentor.jpg",
          bio: "Bob is a data science expert with a PhD in Machine Learning and 5 years of industry experience."
        },
        {
          name: "Charlie Brown",
          title: "Product Manager",
          profilePic: "https://artofmentoring.net/wp-content/uploads/2015/11/mentor.jpg",
          bio: "Charlie has a keen eye for detail and has successfully led multiple products from concept to launch."
        },
        {
          name: "Dana White",
          title: "UX Designer",
          profilePic: "https://artofmentoring.net/wp-content/uploads/2015/11/mentor.jpg",
          bio: "Dana is passionate about creating intuitive user experiences and has worked with several top tech companies."
        },
        {
          name: "Eli Green",
          title: "Cloud Architect",
          profilePic: "https://artofmentoring.net/wp-content/uploads/2015/11/mentor.jpg",
          bio: "Eli specializes in cloud infrastructure and has helped many organizations transition to cloud-based solutions."
        }
      ];
      
    res.status(200).send({data:mentors});
});


app.get('/api/v1/getRoles', userRole.getRoles);

app.post('/api/v1/createRole', userRole.createRoleDb);

module.exports = app;