import mongoose from "mongoose";

// Property Schema
const provienceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  
});
const ProvienceModel = mongoose.model("Province", provienceSchema);

export default ProvienceModel;

