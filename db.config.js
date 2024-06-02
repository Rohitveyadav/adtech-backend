const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pgconnect = new Client({
    user: process.env.USERS || 'admin',
    host: process.env.HOSTS || 'luckily-valid-blowfish-iad.a1.pgedge.io',
    database: process.env.DATABASES || 'adtech_db',
    password: process.env.PASSWORDS || '9GUhRUHV560Fa27q12xbu2l8',
    port: parseInt(process.env.PG_PORT),
    ssl: {
        rejectUnauthorized: false,
    },
});

pgconnect
    .connect()
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error('Connection error', err));

module.exports = pgconnect;
