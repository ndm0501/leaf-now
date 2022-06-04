const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String, required: true
    },
    email:{
        type: String, required: true, unique: true
    },
    password:{
        type: String, required: true
    },
    isBuyer:{
        type: Boolean,
        default: true
    },
    sales: {
        type: Array, default: []
    },
    messages: {
        type: Array, default: []
    },
    isSellerOrDonor: {
        type: Boolean,
        default: false,
        default: true,
    },
    address: {
        type: String,
        default: '',
    }
})

const User = mongoose.model("user", userSchema);
module.exports = User;