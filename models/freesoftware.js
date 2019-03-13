const mongoose=require('mongoose');

//schema for free softwares
const fsSchema=new mongoose.Schema({
    name : String,
    shortDescription : String,
    upVotes : Number,
    downVotes : Number,
    handle : String,
    license : String
})

module.exports=mongoose.model('Freesoftware',fsSchema);

