const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'captain'
    }, 
    pickUp:{
        type:String,
        required:true
    },
    vehicleType:{
        type:String,
        enum:['car','auto','motorcycle']
    },
    destination:{
        type:String,
        required:true
    },
    distance:{
        type:String,
    },
    status:{
        type:String,
        enum:["pending", "accepted","declined","completed","ongoing", "canclled"],
        default:'pending'
    },
    duration:{
        type:String,
    },
    fare:{
        type:Number,
        required:true
    },
    orderID:{
        type:String
    },
    paymentID:{
        type:String
    },
    signature:{
        type:String
    },
    otp:{
        type:Number,
        select:false,
        required:true
    }
})
module.exports = mongoose.model('ride', rideSchema);