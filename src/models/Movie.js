import mongoose from "mongoose";
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  year: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  runtime: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

export default mongoose.model("Movie", movieSchema);
