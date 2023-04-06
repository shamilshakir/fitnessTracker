const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
    date: String,
    exercise: String,
    duration: String,
    calories: String
});

module.exports = mongoose.model('DiaryEntry', entrySchema);