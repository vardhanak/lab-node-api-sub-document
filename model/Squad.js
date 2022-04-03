const mongoose = require('mongoose'), Schema = mongoose.Schema

var { Lesson } = require('../model/Lesson')

var SquadDetails = new Schema({
    name: String,
    id: Number,
    lessonId: [{type:Schema.Types.ObjectId, ref:"Lesson"}],
    cohort: String
})

const Squad = mongoose.model('Squad', SquadDetails)

module.exports={Squad}
