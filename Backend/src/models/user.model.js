const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
}, { timestamps: true });
const User = mongoose.model('User', userSchema);

module.exports = User;