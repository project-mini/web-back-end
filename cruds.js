const mongoose=require('mongoose');
const Proprietarysoftware=require('./models/proprietary');
const Freesoftware=require('./models/freesoftware');

mongoose.connect('mongodb://localhost/softwares')
    .then(()=>console.log('Connection successful to database!'))
    .catch(err=>console.log('Error in connection:',err.message));

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
    console.log(proprietary[0].tags);
    const alternatives=await Freesoftware
        .find({handle : { $in: proprietary[0].tags }});
    console.log('Alternatives found:'); 
    console.log(alternatives);
    
    return alternatives;
}

module.exports.getAlternatives=getAlternatives;
module.exports.addProprietarySoftware=createProprietarysoftware;
module.exports.addFreeSoftware=createFreesoftware;
module.exports.searchProprietarySoftwares=getProprietarysoftwares;