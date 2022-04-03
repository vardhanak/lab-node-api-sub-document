const mongoose = require('mongoose'), Schema = mongoose.Schema;

const LessonDetails = new mongoose.Schema({
    name: String,
    id: Number
})

const Lesson = mongoose.model('lesson', LessonDetails)

module.exports = {Lesson}