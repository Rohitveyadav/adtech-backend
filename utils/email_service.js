const app = require('../app');
const mailgun = require('mailgun-js');

const DOMAIN = 'mg.codeuplab.com'; // Replace with your Mailgun domain
const mg = mailgun({
    apiKey: 'bc46b50b43a59a63c1233c3fb97df2ef-0996409b-437b25fd', // Replace with your actual Mailgun API key
    domain: DOMAIN,
});

const sendVerificationEmail = async (email, verification_token) => {
    const data = {
        from: `no-reply@${DOMAIN}`,
        to: email,
        subject: 'Verification Code',
        text: `Verification code: ${verification_token}`,
    };

    try {
        const body = await mg.messages().send(data);
        return body;
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};

module.exports = sendVerificationEmail;
