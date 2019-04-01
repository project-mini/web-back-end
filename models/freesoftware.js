const mongoose = require('mongoose');

//schema for free softwares
const fsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
    handle: {
        // What's this for @karan? I think u got it @m_zaink
        type: String,
        validate: {
            validator: function(v) {
              return v && v.length > 0;
            },
            message: "Specify a handle for alternative"
        }
    },
    license: {
        type: String,
        required: true
    },
    suggestedBy: {
        // This really should be an id or email @karan no! Give reason
        type: String,
        default: "anonymous"
    }
});

module.exports = mongoose.model('Freesoftware', fsSchema);

