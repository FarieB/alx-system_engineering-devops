const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    console.log('Headers:', req.headers); // Debugging line to check headers

    if (!req.headers || !req.headers['x-auth-token']) {
        console.error('Bad request: Headers missing');
        return res.status(400).json({ msg: 'Bad request: Headers missing' });
    }

    const token = req.headers['x-auth-token'];

    if (!token) {
        console.error('No token, authorization denied');
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'yourSecretKey'); // Replace 'yourSecretKey' with your actual secret key
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('Token is not valid');
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

