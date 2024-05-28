const {Client} = require('pg');
const dotenv =  require('dotenv');
dotenv.config();

const pgconnect = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: parseInt(process.env.PG_PORT),
    ssl: {
      rejectUnauthorized: false
    }
  })

pgconnect.connect().then(() => console.log('Connected to the database'))
.catch(err => console.error('Connection error', err));

module.exports = pgconnect;