const express = require('express');
const { sequelize } = require('./API/Config/database.js');

const { UserAuthRoutes, AdminAuthRoutes } = require('./API/Routes/index.js');
require('dotenv/config.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync().then(() => {
    console.log("Database synced successfully.");
}).catch((err) => {
    console.error("Error syncing database:", err);
});

app.use('/user', UserAuthRoutes);
app.use('/admin', AdminAuthRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on http://localhost:5000");
});