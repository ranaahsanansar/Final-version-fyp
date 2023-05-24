import mongoose from "mongoose";

// Property Schema
const schema = new mongoose.Schema({
    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Society",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

});
const AreaModel = mongoose.model("Area", schema);

export default AreaModel;

