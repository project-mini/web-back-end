const mongoose = require('mongoose');

//schema for proprietary software
const proprietarySchema = new mongoose.Schema({
    name: {
        type : String,
        lowercase : true,
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
            message : 'specify at least one tag for proprietary software'
        }
    }
});

module.exports = mongoose.model('Proprietarysoftware', proprietarySchema);