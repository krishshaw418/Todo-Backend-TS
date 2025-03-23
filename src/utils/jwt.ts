import jwt from "jsonwebtoken";

export const generateToken = (payload: object, secret: string) => {
    const SignOptions = {
        expiresIn : 3600
    }
    return jwt.sign(payload, secret, SignOptions);
}