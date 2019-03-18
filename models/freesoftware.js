const mongoose = require('mongoose');

//schema for free softwares
const fsSchema = new mongoose.Schema({
    name: String,
    shortDescription: String,
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
    handle: String,
    license: String
});

module.exports = mongoose.model('Freesoftware', fsSchema);

