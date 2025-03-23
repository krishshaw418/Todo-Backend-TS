import mongoose, {Schema, Model, Document} from "mongoose";

interface IUser extends Document {
    name: string,
    email: string,
    password: string,
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Username is required!"],
        trim: true,
        minlength: [3, "minimum 3 characters long"],
        maxlength: [20, "maximum 20 charcters long"],
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minlength: [5, "minimum 5 characters long"],
    }
},
    {timestamps: true}
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;