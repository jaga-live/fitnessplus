const mongoose = require('mongoose')


const workSchema = new mongoose.Schema({

    userId: {
        type: String
    },

    workouts:{
        type: Object
    },

    time : {
        type: Number,
        default : Date.now()
    }


})


let work = mongoose.model('work', workSchema)


module.exports = work

