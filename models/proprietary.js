const mongoose=require('mongoose');

//schema for proprietary software
const proprietarySchema=new mongoose.Schema({
    name : String,
    shortDescription : String,
    tags : [String]
});
module.exports=mongoose.model('Proprietarysoftware',proprietarySchema);