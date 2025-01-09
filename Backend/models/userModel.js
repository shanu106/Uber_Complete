const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        minlength:[3, 'Name must be at least 3 characters'],
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters'],
    },
    password: {
        type: String,
        required: true,
        Select: false
    },
    socketId: {
        type: String,
    }

    
}

)
// generate token for user
userSchema.methods.generateAuthToken = function ()  {
   
    
    const token = jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {expiresIn: '24h'});
    
    
    return token;
}
userSchema.statics.hashPassword = async (password) =>{
    return await bcrypt.hash(password, 10);
}

// userSchema.methods.comparePassword = async (password) =>{
//     return await bcrypt.compare(password, this.password);
// }

userSchema.methods.comparePassword = async (password, Upassword) =>{

    
    return await bcrypt.compare(password, Upassword);
}
const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;