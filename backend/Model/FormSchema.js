import mongoose from "mongoose";

const UserFormSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    cgpa: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    }
}, {
    timestamps : true
})

const UserForm = mongoose.model('Form', UserFormSchema)
export default UserForm