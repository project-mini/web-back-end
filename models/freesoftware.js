const mongoose = require('mongoose');

//schema for free softwares
const fsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
    handle: {
        type: String,
        required: true
    },
    license: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Freesoftware', fsSchema);

