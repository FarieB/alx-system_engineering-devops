// generateToken.js
const jwt = require('jsonwebtoken');

const token = jwt.sign({ user: 'testUser' }, 'yourSecretKey', { expiresIn: '1h' });
console.log('Generated Token:', token);

