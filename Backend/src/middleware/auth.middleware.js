const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
    try {
        // 1. Token ko Headers (Authorization) ya Cookies se nikalna
        let token = req.headers.authorization;

        if (token && token.startsWith('Bearer ')) {
            token = token.split(' ')[1]; // "Bearer <token>" se sirf token alag karna
        } else if (req.cookies && req.cookies.Token) {
            token = req.cookies.Token; // Agar cookie mein save hai
        }

        if (!token) {
            return res.status(401).json({ 
                message: "Access Denied. No token provided." 
            });
        }

        // 2. Token ko verify karna
        const decoded = jwt.verify(token, process.env.JWT_SECRET );

        // 3. User ko database mein dhoondna aur request object mein attach karna
        const user = await userModel.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(401).json({ 
                message: "Token is valid, but user no longer exists." 
            });
        }

        req.user = user; // Ab agle controller mein req.user mil jayega
        next();

    }     catch (error) {
        console.error("Auth Middleware Error:", error.message);
        
        // Specifically check if the token is expired
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                message: "Token expired. Please log in again.",
                errorCode: "TOKEN_EXPIRED" // Custom code for frontend to catch
            });
        }

        return res.status(401).json({ 
            message: "Invalid token.",
            errorCode: "INVALID_TOKEN"
        });
    }
};

module.exports = authMiddleware;