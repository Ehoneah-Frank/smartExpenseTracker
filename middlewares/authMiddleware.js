import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js';

//}

// const authMiddleware = (req, res, next) => {
//   try {
//     // Check for session-based authentication
//     if (req.session && req.session.user) {
//       req.user = req.session.user;
//       return next();
//     }

//     // Check for token-based authentication
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       return res.status(401).json({
//         message: 'Access denied. No token provided.'
//       });
//     }

//     if (!authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({
//         message: 'Access denied. Invalid token format.'
//       });
//     }

//     const token = authHeader.replace('Bearer ', '');
//     if (!token) {
//       return res.status(401).json({
//         message: 'Access denied. Invalid token format.'
//       });
//     }

//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
//     if (!decoded || !decoded.userId) {
//       return res.status(401).json({
//         message: 'Access denied. Invalid token.'
//       });
//     }

//     req.user = decoded;
//     next();

//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: "Failed to authenticate" });
//   }
// };

// export default authMiddleware;



















































// import jwt from 'jsonwebtoken';



    const authMiddleware = async (req, res, next) => {
        req.user = {};
        if (req.headers.authorization) {
            try {
                // Extract token from headers
                const token = req.headers.authorization.split(' ')[1]

                if(!token) {
                    return res.status(401).json({ error: 'Not authenticated, token missing' })
                };

                // Verify the token to get user and append user to request
                const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
                console.log('Decoded JWT:', decoded);

                // Find the user in the database
                req.user = await userModel.findById(decoded.userId)

                if(!req.user){
                    return res.status(401).json({ error: 'Not authenticated, user not found' })
                }
                next();
                
            } catch (error) {
                console.log(error.message);
                return res.status(401).json({ error: "Token Expired" })
            }
        }
        else {
            console.log(error.message)
            res.status(401).json({ error: 'Not authenticated' })
        }
    }

    export default authMiddleware;


























































































// const authMiddleware = (req, res, next) =>{
//     try {

//         // check if Authorization header is present
//         const authHeader = req.headers.authorization;
//         if(!authHeader) {
//             return res.status(401).json({
//                 message: 'Access denied. No token provided.'
//             })
//         }

//         // Check if the Authorization header contains the expected prefix
//         if (!authHeader.startsWith('Bearer ')){
//             return res.status(401).json({
//                 message: 'Access denied. Invalid token format.'
//             });
//         }


//         // Extract the token by removing 'Bearer ' prefix
//         const token = authHeader.replace('Bearer ', '');
//         if (!token) {
//             return res.status(401).json({
//                 message: 'Access denied. Invalid token format.'
//             });
//         }

//         // verify the token
//         const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

//         // Ensure the token contains userId
//         if (!decoded || !decoded.userId) {
//             return res.status(401).json({
//                 message: 'Access denied. Invalid token.'
//             });
//         }
        
//         req.user = decoded;
//         next();

//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({message: "Failed to authenticate"});
//     }
// };

// export default authMiddleware;