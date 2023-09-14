import mongoose from "mongoose";

let isConnected = false;

const connectToDb = async () => {
    mongoose.set('strictQuery');

    if (isConnected) {
        console.log("MongoDb is already connected.");
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;
        console.log("Connected to MongoDb");

    } catch (error) {
        console.log("error ", error);
    }
}

export default connectToDb