const app = require('./app');

const PORT = parseInt(process.env.SERVER_PORT) || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ...`);
});
