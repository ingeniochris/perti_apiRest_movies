import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    year:{
        type: String,
        required: true,
        trim: true
    },
    runtime:{
        type: String,
        required: true,
        trim: true
    },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
})

export default mongoose.model('Movie', movieSchema)