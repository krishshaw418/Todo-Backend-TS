import { Response, Request } from "express";
import User from "../models/userModel";
import { generateToken } from "../utils/jwt";
import { z } from "zod";

const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error("JWT_TOKEN is not defined in environment variables.");
  }

const signInProps = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(20),
})

const signUpProps = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(5).max(20),
})

// zod inference for auth
type SignUpProps = z.infer<typeof signUpProps>;
type SignInProps = z.infer<typeof signInProps>;

export const signUp = async (req: Request, res: Response): Promise<any> => {

    const user = signUpProps.safeParse(req.body);

    if(!user.success){
        return res.status(400).json({success: false, message: user.error});
    }
    try {
        const existingUser = await User.findOne({email: user.data.email});
        if(!existingUser){
            const newUser = new User({name: user.data.name, email: user.data.email, password: user.data.password});
            const newDoc = await newUser.save();
            const token = generateToken({id: newDoc._id}, secret);
            res.cookie("session_token", token, {
                httpOnly: true,
                secure: false,
            })
            return res.status(201).json({success: true, message: "Sign Up Successful!"});
        }
        return res.status(409).json({success: false, message: "User already exist! Please Login."});
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: "Sign Up Failed! Something went wrong."});
    }
}

export const signIn = async (req: Request, res: Response): Promise<any> => {
    const user = signInProps.safeParse(req.body);
    if(!user.success){
        return res.status(400).json({success: false, message: user.error});
    }
    try {
        const existingUser = await User.findOne({email: user.data.email, password: user.data.password});
        if(existingUser){
            const token = generateToken({id: existingUser._id}, secret);
            res.cookie("session_token", token, {
                httpOnly: true,
                secure: false,
            })
            return res.status(201).json({success: true, message: "Sign In Successful!"});
        }
        return res.status(409).json({success: false, message: "Wrong Email or Password"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: "Sign Up Failed! Something went wrong."});
    }
}

export const logout = async(req: Request, res: Response): Promise<any> => {
    res.clearCookie("session_token");
    return res.status(200).json({success: true, message: "Logout Successfull!"});
}

export const getUserData = async(req: Request, res: Response): Promise<any> => {
    try {
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(404).json({success: false, message: "User not found!"});
        }
        return res.status(200).json({success: true, email: user.email});
    } catch (error) {
        
    }
}