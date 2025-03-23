import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

if(!secret){
    throw new Error("Secret not found!");
}

interface myJwtPayLoad extends JwtPayload {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.session_token;

    if(!token){
        res.status(401).json({success: false, message: "No token provided in the cookies! "});
        return; 
    }

    const decoded = jwt.verify(token, secret) as myJwtPayLoad;
    req.userId = decoded.id;
    next();
}