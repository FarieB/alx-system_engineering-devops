const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        // This hook will run before creating a new user
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt); // Hash the password before saving
        }
    },
    defaultScope: {
        attributes: { exclude: ['password'] } // Optionally, exclude password by default in queries
    }
});

// Method to compare passwords during login
User.prototype.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User;

