const { z } = require("zod");

// creating a object schema
const signupSchema = z.object({
    username: z
    .string({ required_error: "Name is Required"})
    .trim()
    .min(3, {message: "Name must be of atleast 3 characters"})
    .max(255, {message: "Name must not be more than 255 characters"}),
    email: z
    .string({ required_error: "Email is Required"})
    .trim()
    .email({message: "Invalid Email Address"})
    .min(3, {message: "Email must be of atleast 3 characters"})
    .max(255, {message: "Email can not be more than 255 characters"}),
    phone: z
    .string({ required_error: "Phone is Required"})
    .trim()
    .min(10, {message: "Phone must be of atleast 10 characters"})
    .max(20, {message: "Name can not be more than 20 characters"}),
    password: z
    .string({ required_error: "Password is Required"})
    .trim()
    .min(7, {message: "Password must be of atleast 7 characters"})
    .max(1024, {message: "Password can not be more than 1024 characters"}),
});

module.exports = signupSchema;