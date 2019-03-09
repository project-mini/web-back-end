const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/softwares')
    .then(()=>console.log('Connection successful to database!'))
    .catch(err=>console.log('Error in connection:',err.message));

//schema for proprietary softwares
const proprietarySchema=new mongoose.Schema({
    name : String,
    shortDescription : String,
    tags : [String]
});
const Proprietarysoftware=mongoose.model('Proprietarysoftware',proprietarySchema);

async function createProprietarysoftware(name,description,tags){
    const proprietarysoftware=new Proprietarysoftware({
        name:name,
        shortDescription:description,
        tags:tags
    });
    console.log('saving result to proprietary');
    const result=await proprietarysoftware.save();
    console.log(result);
}

//schema for free softwares
const fsSchema=new mongoose.Schema({
    name : String,
    shortDescription : String,
    upVotes : Number,
    downVotes : Number,
    handle : String,
    license : String
})
const Freesoftware=mongoose.model('Freesoftware',fsSchema);

async function createFreesoftware(name,description,license,handle){
    const freesoftware=new Freesoftware({
        name:name,
        shortDescription:description,
        upVotes:0,
        downVotes:0,
        handle:handle,
        license:license
    });
    console.log('saving result to free softwares');
    const result=await freesoftware.save();
    console.log(result);
}

async function getProprietarysoftwares(pattern){
    var searchPattern=new RegExp(pattern,'i');
    const proprietary=await Proprietarysoftware
        .find({name:searchPattern})
        .select({name:1,shortDescription:1});
    console.log(proprietary);  
    return proprietary;
}

async function getAlternatives(name){
    const proprietary=await Proprietarysoftware
        .find({name:name});
    //const comparator=target.name;
    //console.log(proprietary);
    console.log(proprietary[0].tags);
    const alternatives=await Freesoftware
        .find({handle : { $in: proprietary[0].tags }});
    console.log('Alternatives found:'); 
    console.log(alternatives);
    // console.log(alternatives);
    
    return alternatives;
}

// console.log('saving result to proprietary');
// createProprietarysoftware();
// console.log('now getting');
// getAlternatives('windows');

module.exports.getAlternatives=getAlternatives;
module.exports.addProprietarySoftware=createProprietarysoftware;
module.exports.addFreeSoftware=createFreesoftware;
module.exports.searchProprietarySoftwares=getProprietarysoftwares;