import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    cnic: {
        type: Number,
        required: true,
        trim: true,
    },
    fatherName: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    email: { type: String, required: true, trim: true },

    front: { type: String, required: true, trim: true },
    back: { type: String, required: true, trim: true },
    picture: { type: String, required: true, trim: true },
    path: { type: String, required: true , trim: true },
})

const ApprovalModel = mongoose.model('approval' , schema );
export default ApprovalModel