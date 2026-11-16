
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER USER
const registerUser = async (req, res) => {
    try {
        const { username, email, password,name } = req.body;

        // 1. Check required fields
        if (!username || !email || !password ||!name) {
            return res.status(400).json({
                message: 'Please provide username, email and password'
            });
        }

        // 2. Validate password length
        if (password.length < 8) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long'
            });
        }

        // 3. Check if email already exists
        const existingUser = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (existingUser) {
            return res.status(409).json({
                message: 'Email already registered'
            });
        }

        // 4. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Create user
        const user = await User.create({
            name:name.trim(),
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword
        });

        // 6. Send response without password
        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Email already registered'
            });
        }

        console.error(error);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};


// LOGIN USER
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: 'Please provide email and password'
            });
        }

        // 2. Find user by email AND explicitly select the password
        const user = await User.findOne({
            email: email.trim().toLowerCase()
        }).select('+password'); // <--- Yeh add karna zaroori hai!

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // 3. Compare password with stored hash
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // 4. Create JWT token
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured');
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie("Token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        // 5. Send response
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};
