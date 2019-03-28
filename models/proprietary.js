const mongoose = require('mongoose');

//schema for proprietary software
const proprietarySchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },    
    shortDescription: {
        type: String,
        required: true
    },
    tags: {
        type : Array,
        validate : {
            validator : function(v){
                return v && v.length>0
            },
            message : 'Specify at least one tag for proprietary software'
        }
    },
    requestedBy: {
        // This again should be email or id or something. NO- USERNAME
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Proprietarysoftware', proprietarySchema);
