const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minLength: [3, 'Name must be at least 3 characters long'],

    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, 'Email must be at least 5 characters long'],
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minLength: [4, 'Password must be at least 4 characters long'],
    },
    socketId: {
        type: String,
    },
    location: {
        ltd:{
            type: Number
        }, 
        lng: {
            type: Number
        }
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default:'active'
    },
    vehicle: {
        color : {
            type: String,
            required: true
        },
        plateNumber: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true,
            minLength: [1, 'Capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto']
        }
    },

})

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY, {expiresIn:'24h'});
    return token;
}

captainSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);

}

captainSchema.methods.comparePassword = async (password, userPassword)=>{
    return await bcrypt.compare(password, userPassword);
}


const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;