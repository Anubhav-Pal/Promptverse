import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

const POST = async (res, res) => {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDB();
        const newPrompt = await Prompt.create({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 })

    } catch (error) {
        // console.log(error);
        return new Response("Failed to create a new prompt", { status: 500 })
    }
}