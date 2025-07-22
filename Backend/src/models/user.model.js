import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }, 
    password: {
        type: String,
        required: true,
        trim: true,
    },
    bio:{
        type: String,
        default: "",
        trim: true,
    },
    image:{
        type: String,
        default: "https://i.pinimg.com/736x/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg",
        trim: true,
    }
})

const userModel = mongoose.model("User", userSchema);

export default userModel;