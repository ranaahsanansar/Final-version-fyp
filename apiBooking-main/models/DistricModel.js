import mongoose from "mongoose";

// Property Schema
const dsitricSchema = new mongoose.Schema({
    provinceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Province",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

});
const DistricModel = mongoose.model("Distric", dsitricSchema);

export default DistricModel;

