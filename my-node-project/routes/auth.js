const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure User model is updated to match new DB schema
const { generateToken, verifyToken } = require('../utils/jwt');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Register
router.post('/register', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, username } = req.body; // Include username

    try {
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ email, password: hashedPassword, username }); // Add username

        const token = generateToken(user);
        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Login
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get current user
router.get('/me', (req, res) => {
    const token = req.headers['x-auth-token'];
    if (token) {
        try {
            const decoded = verifyToken(token);
            res.json({ id: decoded.id, email: decoded.email });
        } catch (error) {
            res.status(401).json({ error: 'Unauthorized' });
        }
    } else {
        res.status(401).json({ error: 'No token provided' });
    }
});

module.exports = router;
