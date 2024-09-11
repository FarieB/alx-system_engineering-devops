const express = require('express');
const authMiddleware = require('./models/authMiddleware');
const app = express();

app.use(express.json()); // Middleware for parsing JSON

// Debugging log to verify server start
console.log("Server is starting...");

// Example route using the authMiddleware
app.use('/api/protected', authMiddleware, (req, res) => {
    res.json({ msg: 'Access granted to protected route!' });
});

// Example public route without authentication
app.get('/api/public', (req, res) => {
    res.json({ msg: 'Public route, no authentication needed' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

