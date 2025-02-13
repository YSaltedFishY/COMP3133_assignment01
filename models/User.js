const mongoose = require('mongoose')

const emailRegEx = /^\S+@\S+\.\S+$/

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        lowercase: true,
        unique: true,
        minlength: [4, 'Username must be at least 4 characters'],
        maxlength: [16, 'Username cannot be more than 16 characters'],
        trim: true
    },
    email:{
        type: String,
        required: [true, 'email is required'],
        trim: true,
        lowercase: true,
        unique: true,
        match: [emailRegEx, 'email format is invalid'],
    },
    password:{
        type: String,
        required: [true, 'password is required'],
        minlength: [6, 'password must be at least 6 characters'],
        trim: true,
    },
    created_at:{
        type: Date,
        default: Date.now, 
    },
    updated_at:{
        type: Date,
        default: Date.now, 
    }
})

const User = mongoose.model("User", UserSchema)
module.exports = User;