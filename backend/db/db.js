import mongoose from "mongoose";
import env from 'dotenv'

env.config()

const uri = `mongodb+srv://${process.env.ID}:${process.env.PASSWORD}@cluster1.wonlygv.mongodb.net/UserForm?retryWrites=true&w=majority`

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