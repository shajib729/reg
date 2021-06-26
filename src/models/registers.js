const mongoose = require("mongoose")
const regSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    }
})

// now we need to create a collections

const Register = new mongoose.model("Register", regSchema);

module.exports=Register