const mongoose = require("mongoose");
const Proprietarysoftware = require("../models/proprietary");
const Freesoftware = require("../models/freesoftware");

// mongoose.connect('mongodb://localhost/softwares')
loginCred =
  "mongodb://" +
  process.env.ALT_USERNAME +
  ":" +
  process.env.ALT_PWD +
  "@ds213645.mlab.com:13645/alterfoss";
mongoose
  .connect(loginCred, { useNewUrlParser: true })
  .then(() => console.log('Connected to database from cruds_softwares.js'))
  .catch(err =>
    console.log(
      "Error in connection with respect to that of the database:",
      err.message
    )
  );

async function createProprietarysoftware(properietary) {
  try{
		const proprietarysoftware = new Proprietarysoftware(properietary);
  	console.log("saving result to proprietary");
  	const result = await proprietarysoftware.save();
		console.log(result);
		return result;
	}catch(err){
		console.log("Error while writing to the database:",err.message);
		return "Error while writing proprietary software to the database:"+err.message;
	}
}

async function getTopAlternatives(){
    var freesoftware = await Freesoftware
        .find()
        .select({ name: 1, upVotes: 1, license: 1 });
    //return freesoftware
    console.log(freesoftware);
    var top10=[]; 
    if(freesoftware.length==0)
      return 0;
    else{
      if(freesoftware.length<=10){
        for(var j=0;j<freesoftware.length;j++){
          var maxVotes=-1;
          var maxObj=null;
          var maxIdx=0;
          for(var i=0;i<freesoftware.length;i++){
            if(parseInt(freesoftware[i].upVotes)>maxVotes){
              maxVotes=parseInt(freesoftware[i].upVotes);
              maxObj=freesoftware[i];
              maxIdx=i;
              console.log("max found : "+freesoftware[i])
            }
          }
          console.log("Pushing now: "+maxObj);
          var obj={
            name: maxObj.name,
            license: maxObj.license,
            upVotes: maxObj.upVotes
          };
          top10.push(obj);
          freesoftware[maxIdx].upVotes=-1;
        }
      }
      else{
        for(var j=0;j<10;j++){
          var maxVotes=-1;
          var maxObj=null;
          var maxIdx=0;
          for(var i=0;i<freesoftware.length;i++){
            if(parseInt(freesoftware[i].upVotes)>max){
              maxVotes=parseInt(freesoftware[i].upVotes);
              maxObj=freesoftware[i];
              maxIdx=i;
              console.log("max found : "+freesoftware[i])
            }
          }
          console.log("Pushing now: "+maxObj);
          var obj={
            name: maxObj.name,
            license: maxObj.license,
            upVotes: maxObj.upVotes
          };
          top10.push(obj);
          freesoftware[maxIdx].upVotes=-1;
        }
      }
      return top10;
    }
}

async function createFreesoftware(freeSoftware) {
  try{
		const freesoftware = new Freesoftware(freeSoftware);
  	console.log("saving result to free softwares");
  	const result = await freesoftware.save();
		console.log(result);
		return result;
	}catch(err){
		console.log("Error while writing to the database:",err.message);
		return "Error while writing alternative to the database:"+err.message;
	}
}

async function getAllFreeSoftwares() {
  const freesoftware = await Freesoftware.find().select({
    name: 1,
    shortDescription: 1,
    upVotes: 1,
    downVotes: 1,
    license: 1
  });
  console.log(freesoftware);
  return freesoftware;
}

async function checkLicense(pattern){
	var searchPattern = new RegExp(pattern, "i");
	const freesoftware=await Freesoftware.find({
		name: searchPattern
	}).select({name: 1, license: 1});
	console.log(freesoftware);
	return freesoftware;
}

async function getProprietarysoftwares(pattern) {
  var searchPattern = new RegExp(pattern, "i");
  const proprietary = await Proprietarysoftware.find({
    name: searchPattern
  }).select({ name: 1, shortDescription: 1 });
  console.log(proprietary);
  return proprietary;
}

async function getAllProprietarySoftwares() {
  const proprietary = await Proprietarysoftware.find().select({
    name: 1,
    shortDescription: 1
  });
  if (proprietary.length != 0) console.log(proprietary);
  else console.log("No proprietary softwares found");
  return proprietary;
}

async function getAlternatives(id) {
  const proprietary = await Proprietarysoftware.findById(id);
  console.log(proprietary);
  if (!proprietary) {
    console.log("not found properietary software for id:" + id);
    return;
  }
  console.log(proprietary.tags);
  const alternatives = await Freesoftware.find({
    handle: { $in: proprietary.tags }
  });
  console.log("Alternatives found:");
  console.log(alternatives);

  return alternatives;
}

async function increaseUpvotes(id) {
  const freeSoftware = await Freesoftware.findByIdAndUpdate(
    id,
    {
      $inc: {
        upVotes: 1
      }
    },
    { new: true }
  );
  if (!freeSoftware) {
    console.log("not found free software for " + id);
    return;
  }
  console.log(freeSoftware);
}

async function increaseDownvotes(id) {
  const freeSoftware = await Freesoftware.findByIdAndUpdate(
    id,
    {
      $inc: {
        downVotes: 1
      }
    },
    { new: true }
  );
  if (!freeSoftware) {
    console.log("not found free software for " + id);
    return;
  }
  console.log(freeSoftware);
}

async function decreaseDownvotes(id) {
  const freeSoftware = await Freesoftware.findByIdAndUpdate(
    id,
    {
      $inc: {
        downVotes: -1
      }
    },
    { new: true }
  );
  if (!freeSoftware) {
    console.log("not found free software for " + id);
    return;
  }
  console.log(freeSoftware);
  if (freeSoftware.downVotes < 0) {
    await Freesoftware.findByIdAndUpdate(id, {
      $set: {
        downVotes: 0
      }
    });
  }
}

async function decreaseUpvotes(id) {
  const freeSoftware = await Freesoftware.findByIdAndUpdate(
    id,
    {
      $inc: {
        upVotes: -1
      }
    },
    { new: true }
  );
  if (!freeSoftware) {
    console.log("not found free software for " + id);
    return;
  }
  console.log(freeSoftware);
  if (freeSoftware.upVotes < 0) {
    await Freesoftware.findByIdAndUpdate(id, {
      $set: {
        upVotes: 0
      }
    });
  }
}

module.exports.getAlternatives = getAlternatives;
module.exports.addProprietarySoftware = createProprietarysoftware;
module.exports.addFreeSoftware = createFreesoftware;
module.exports.searchProprietarySoftwares = getProprietarysoftwares;
module.exports.getAllProprietarySoftwares = getAllProprietarySoftwares;
module.exports.getAllFreeSoftwares = getAllFreeSoftwares;
module.exports.increaseUpvotes = increaseUpvotes;
module.exports.decreaseUpvotes = decreaseUpvotes;
module.exports.increaseDownvotes = increaseDownvotes;
module.exports.decreaseDownvotes = decreaseDownvotes;
module.exports.getTopAlternatives = getTopAlternatives;
module.exports.checkLicense = checkLicense;
