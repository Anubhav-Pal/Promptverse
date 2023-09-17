import mongoose from "mongoose";
import { models, model, Schema } from "mongoose";

const promtSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    prompt: {
        type: String,
        required: [true, "Prompt is required."]
    },
    tag: {
        type: String,
        required: [true, "Tag is required."]

    }
})

const Prompt = models.Prompt || model('Promt', promtSchema)

export default Prompt