const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Employee = require('../models/Employee')
require('dotenv').config();

const resolvers = {
    Query: {
        login: async (_, { username, password }) => {
            try {
                const user = await User.findOne({ username })
                if (!user) throw new Error('User not found')

                const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) throw new Error('Incorrect password or username')

                const token = jwt.sign(
                    { userId: user.id },
                    process.env.JWT_SECRET,
                    { expiresIn: '2h' }
                )
                return token
            } catch (e) {
                throw new Error(e.message);
            }
        },

        getAllEmployees: async () => await Employee.find(),

        getEmployeeById: async (_, { id }) => {
            try {
                if (!id) {
                    throw new Error("Employee ID is required");
                }
                const employee = await Employee.findById(id);
                if (!employee) {
                    throw new Error("Employee not found");
                }
                return employee;
            } catch (e) {
                throw new Error(e.message);
            }
        },

        searchEmployees: async (_, { designation, department }) => {
            try {
                let filter = {};
                if (designation) filter.designation = designation
                if (department) filter.department = department
                return await Employee.find(filter)
            } catch (e) {
                throw new Error(e.message);
            }
        }
    },

    Mutation: {
        signup: async (_, { username, email, password }) => {
            try {
                const hp = await bcrypt.hash(password, 10)
                const newUser = new User({
                    username,
                    email,
                    password: hp
                })

                return await newUser.save()
            } catch (e) {
                throw new Error(e.message);
            }
        },

        addEmployee: async (_, args) => {
            try {
                const newEmpolyee = new Employee(args)
                return await newEmpolyee.save()
            } catch (e) {
                throw new Error(e.message);
            }
        },

        updateEmployee: async (_, { id, ...updates }) => {
            try {
                const employee = await Employee.findByIdAndUpdate(
                    id,
                    { $set: updates },
                    { new: true, omitUndefined: true }
                );
                if (!employee) {
                    throw new Error("Employee not found");
                }
                return employee;
            } catch (error) {
                throw new Error(error.message);
            }
        },

        deleteEmployee: async (_, { id }) => {
            try {
                deletedEmployee = await Employee.findByIdAndDelete(id)
                return `Employee deleted successfully \n ${deletedEmployee}`
            } catch (e) {
                throw new Error(e.message);
            }
        }
    }
}

module.exports = resolvers