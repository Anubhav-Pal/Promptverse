import mongoose from "mongoose";
import { models, model, Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email Already exists!"],
        required: [true, "Email is required"]
    },
    username: {
        type: String,
        unique: [true, "Username Already exists!"],
        required: [true, "Username is required"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    }

})

const User = model.User || model("User", userSchema)

export default User;