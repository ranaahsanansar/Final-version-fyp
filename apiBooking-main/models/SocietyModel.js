import mongoose from "mongoose";

// Property Schema
const schema = new mongoose.Schema({
    districId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Distric",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

});
const SocietyModel = mongoose.model("Society", schema);

export default SocietyModel;

