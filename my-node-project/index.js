const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

/* Middleware setup */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Serve static files from the 'public' directory */
app.use(express.static(path.join(__dirname, 'public')));

/* Import and use insurance routes */
const insuranceRoutes = require('./routes/insuranceRoutes');
app.use('/api/insurance', insuranceRoutes);

/* Start the server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

