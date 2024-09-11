const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const insuranceRoutes = require('./routes/insuranceRoutes');
const protectedRoutes = require('./routes/protected');

app.use(express.json()); // Middleware for parsing JSON

// Authentication routes
app.use('/api/auth', authRoutes);

// Insurance routes
app.use('/api/insurance', insuranceRoutes);

// Protected routes - ensure that this is the correct path
app.use('/api/protected', protectedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

