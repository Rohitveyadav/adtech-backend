const express = require('express');
const { registerUser } = require('../controller/register');
const { userLogin } = require('../controller/login_user');
const { resentCode } = require('../controller/resend_verification');
const { updateUserStatus } = require('../model/update_status');
const { authenticateToken } = require('../middleware/auth');

const commonRoute = express.Router();

// Define the route for user registration using the POST method
commonRoute.post('/register', registerUser);
commonRoute.post('/login', userLogin);
commonRoute.post('/resend_verificationCode', resentCode);
commonRoute.post('/verification', updateUserStatus);

//later we'll change

commonRoute.get('/mentorlist', authenticateToken, (req, res) => {
    const mentors = [
        {
            name: 'Alice Johnson',
            title: 'Senior Software Engineer',
            profilePic:
                'https://artofmentoring.net/wp-content/uploads/2015/11/mentor.jpg',
            bio: 'Alice has over 10 years of experience in software development and specializes in frontend technologies.',
        },
        {
            name: 'Bob Smith',
            title: 'Data Scientist',
            profilePic:
                'https://artofmentoring.net/wp-content/uploads/2015/11/mentor.jpg',
            bio: 'Bob is a data science expert with a PhD in Machine Learning and 5 years of industry experience.',
        },
        {
            name: 'Charlie Brown',
            title: 'Product Manager',
            profilePic:
                'https://artofmentoring.net/wp-content/uploads/2015/11/mentor.jpg',
            bio: 'Charlie has a keen eye for detail and has successfully led multiple products from concept to launch.',
        },
        {
            name: 'Dana White',
            title: 'UX Designer',
            profilePic:
                'https://artofmentoring.net/wp-content/uploads/2015/11/mentor.jpg',
            bio: 'Dana is passionate about creating intuitive user experiences and has worked with several top tech companies.',
        },
        {
            name: 'Eli Green',
            title: 'Cloud Architect',
            profilePic:
                'https://artofmentoring.net/wp-content/uploads/2015/11/mentor.jpg',
            bio: 'Eli specializes in cloud infrastructure and has helped many organizations transition to cloud-based solutions.',
        },
    ];

    res.status(200).send({ data: mentors });
});

module.exports = commonRoute;
