const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    identity: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    }
},
    {timestamps: true}
)

module.exports = mongoose.model("User", UserSchema)