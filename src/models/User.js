const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: {
        unique: true,
        type: String
    },
    password: String,
    role: String,
    category: String,
    avatar: String,
    job: String,
    phoneNumber: Number


})

const User = mongoose.model('User', userSchema);

module.exports = User;