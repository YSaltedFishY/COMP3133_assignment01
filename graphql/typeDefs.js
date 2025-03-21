const {gql} = require('apollo-server-express')

const typeDefs = gql`
    #Type casting
    type User {
        id: ID!
        username: String!
        email: String!
        created_at: String!
        updated_at: String!
    }

    type Employee {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        designation: String!
        salary: Float!
        date_of_joining: String!
        department: String!
        employee_photo: String
        created_at: String!
        updated_at: String!
    }

    # (Read operation)
    type Query{
        login(
            username: String!,
            password: String!
        ): String

        getAllEmployees: [Employee]

        getEmployeeById(id: ID!): Employee

        searchEmployees(
            designation: String,
            department: String
        ): [Employee]
    }

    # (Create update and delete)
    type Mutation {
        signup(
            username: String!,
            email: String!,
            password: String!
        ): User

        addEmployee(
            first_name: String!,
            last_name: String!,
            email: String!,
            gender: String!,
            designation: String!,
            salary: Float!,
            date_of_joining: String!,
            department: String!,
            employee_photo: String,
        ): Employee

        updateEmployee(
            id: ID!,
            first_name: String,
            last_name: String,
            email: String,
            gender: String,
            designation: String,
            salary: Float,
            date_of_joining: String,
            department: String,
            employee_photo: String,
        ): Employee

        deleteEmployee(id: ID!): Employee
    }
`;

module.exports = typeDefs;