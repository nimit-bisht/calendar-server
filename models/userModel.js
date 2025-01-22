import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: 3,
      // match: [/.+@.+\..+/, "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: true,
            minlength: 3,
        },
    },
    { timestamps: true }
);

const userModel = mongoose.model("users", UserSchema);

export default userModel;
