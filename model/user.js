import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        reduired: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    age: {
        type: Number,

    },
    phone: {
        type: String,
        required: true,
        unique: true,
        maxlength: 11,
    },
    admin:{
        type: Boolean,
        default: false

    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    } 
},
{ timestamps: true }
)

const userModel = mongoose.model("User", userSchema)

export default userModel