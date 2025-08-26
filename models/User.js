import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    descuento: {
        type: Number,
        trim: true,
        required: true
    }
})

export default mongoose.model("Usuarios", userSchema)