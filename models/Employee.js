const mongoose = require('mongoose')

const emailRegEx = /^\S+@\S+\.\S+$/

const EmployeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'firstname is required'],
        lowercase: true,
        trim: true
    },
    last_name: {
        type: String,
        required: [true, 'lastname is required'],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        match: [emailRegEx, 'Email format is invalid']
    },
    gender: {
        type: String,
        required: [true, 'gender is required'],
        trim: true,
        enum: ['male','female','other']
    },
    designation:{
        type: String,
        required: [true, 'designation is required'],
        trim: true,
    },
    salary: {
        type: Number,
        required: [true, 'Minimum of 1000 is required'],
        min: 1000,
    },
    date_of_joining:{
        type: Date,
        required: [true, 'Date of joining is required']
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        trim: true,
        lowercase: true,
    },
    employee_photo:{
        type: String,
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now, 
    }
})

const Employee = mongoose.model("Employee", EmployeeSchema)
module.exports = Employee;