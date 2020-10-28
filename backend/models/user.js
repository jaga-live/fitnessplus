const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

email:{
    type : String,
    trim : true,
    unique : true
},

password:{
    type:String,
    trim: true
},

name:{
    type:String
},

avatar:{
    type:String
},



})


let user = mongoose.model('user',userSchema)


module.exports = user

