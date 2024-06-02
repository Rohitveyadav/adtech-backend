const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 9000;
app.listen(PORT, () =>
    console.log(`Sever is running server file port ${PORT} ...`)
);
