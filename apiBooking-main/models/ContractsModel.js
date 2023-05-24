import mongoose from "mongoose";

// Defining Schema
const ContractsSchema = new mongoose.Schema({
    areaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Area",
        required: true,
        unique: true
    },
    areaContract: { type: String, required: true, trim: true , unique: true},
    govermentAuthority: { type: String, required: true, trim: true },
    highCourt: { type: String, required: true, trim: true },
    citzenContract: { type: String, required: true, trim: true },
    landInspector: { type: String, required: true, trim: true },
});

// Model
const ContractsModel = mongoose.model("Contract", ContractsSchema);

export default ContractsModel;