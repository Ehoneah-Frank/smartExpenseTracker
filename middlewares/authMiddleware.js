import jwt from 'jsonwebtoken';



const authMiddleware = (req, res, next) =>{
    try {

        // check if Authorization header is present
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            return res.status(401).json({
                message: 'Access denied. No token provided.'
            })
        }

        // Check if the Authorization header contains the expected prefix
        if (!authHeader.startsWith('Bearer ')){
            return res.status(401).json({
                message: 'Access denied. Invalid token format.'
            });
        }


        // Extract the token by removing 'Bearer ' prefix
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                message: 'Access denied. Invalid token format.'
            });
        }

        // verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ensure the token contains userId
        if (!decoded || !decoded.userId) {
            return res.status(401).json({
                message: 'Access denied. Invalid token.'
            });
        }
        
        req.user = decoded;
        next();

    } catch (error) {
        res.status(500).json({message: "Failed to authenticate"});
    }
};

export default authMiddleware;