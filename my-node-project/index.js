/* 
 * File: server.js
 * Description: Main server file for the insurance API application. 
 * It sets up middlewares and starts the server.
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

/* Middleware setup */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Import and use insurance routes */
const insuranceRoutes = require('./routes/insuranceRoutes');
app.use('/api/insurance', insuranceRoutes);

/* Start the server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
