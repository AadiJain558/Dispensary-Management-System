import jwt from "jsonwebtoken";

//admin middleware
const authAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({message: "Authorization header missing"});
        }
        
        // Extract token from "Bearer TOKEN" format
        const token = authHeader.startsWith('Bearer ') 
            ? authHeader.substring(7) 
            : authHeader;
            
        if(!token){
            return res.status(401).json({message: "Token missing"});
        }
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if(decoded !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
                return res.status(401).json({message: "Invalid token"});
            }
            next();
        } catch (jwtError) {
            console.error("JWT verification error:", jwtError);
            return res.status(401).json({message: "Invalid token", error: jwtError.message});
        }
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(500).json({message: "Authentication error", error: error.message});
    }
}

export default authAdmin;
