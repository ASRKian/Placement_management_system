import mongoose from "mongoose";
import env from 'dotenv'

env.config()

const uri = process.env.URI

const Connection = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('db connected');
    } catch (error) {
        console.log(error);
    }
}

export default Connection