import mongoose, {Schema, Model, Document} from "mongoose";

interface todo extends Document{
    title: string,
    description: string,
    done: boolean,
    userId: string,
}

const todoSchema: Schema<todo> = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required!"]
    },
    description: {
        type: String,
        required: [true, "Description is required!"]
    },
    done: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: String,
        required: [true, "User ID is required!"]
    }
})

const Todo: Model<todo> = mongoose.model("Todo", todoSchema);

export default Todo;