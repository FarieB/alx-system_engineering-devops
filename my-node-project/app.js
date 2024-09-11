const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Authentication middleware
function authenticate(req, res, next) {
    const token = req.headers['x-auth-token'];

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'yourSecretKey');
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

// Test route
app.get('/test', authenticate, (req, res) => {
    res.json({ message: 'This is a test route', user: req.user });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

