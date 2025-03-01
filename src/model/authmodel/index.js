import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: true,
            minlength: 6,  // Ensure password has at least 6 characters
        },
    },
    { timestamps: true } // Adds createdAt & updatedAt fields automatically
);

const AuthModel = mongoose.models.Auth || mongoose.model("Auth", AuthSchema);
export default AuthModel;
