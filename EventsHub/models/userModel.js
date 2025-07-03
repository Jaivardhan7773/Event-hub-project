import mongoose, { version } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    role: {
        type: String,
        enum: ['student', 'organiser', 'admin'],
        default: 'student',
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true,
    },
    {
        versionKey: false
    });

const User = mongoose.model('User', userSchema);

export default User;