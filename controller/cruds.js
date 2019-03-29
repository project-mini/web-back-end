const mongoose = require('mongoose');
const Proprietarysoftware = require('../models/proprietary');
const Freesoftware = require('../models/freesoftware');

// mongoose.connect('mongodb://localhost/softwares')
loginCred = 'mongodb://' + process.env.ALT_USERNAME + ':' + process.env.ALT_PWD + '\@ds213645.mlab.com:13645/alterfoss';
mongoose.connect(loginCred, { useNewUrlParser: true })
    .then(() => console.log('Connection successful to "that of the database"!'))
    .catch(err => console.log(
        'Error in connection with respect to that of the database:',
        err.message)
    );

async function createProprietarysoftware(properietary) {
    const proprietarysoftware = new Proprietarysoftware(properietary);
    console.log('saving result to proprietary');
    const result = await proprietarysoftware.save();
    console.log(result);
}

async function getTopAlternatives(){
    const freesoftware = await Freesoftware
        .find()
        .select({ name: 1, upVotes: 1, license: 1 });
    if(freesoftware.length==0)
        return 0;
    
}

async function createFreesoftware(freeSoftware) {
    const freesoftware = new Freesoftware(freeSoftware);
    console.log('saving result to free softwares');
    const result = await freesoftware.save();
    console.log(result);
}

async function getAllFreeSoftwares() {
    const freesoftware = await Freesoftware
        .find()
        .select({ name: 1, shortDescription: 1, upVotes: 1, downVotes: 1, license: 1 });
    console.log(freesoftware);
    return freesoftware;
}

async function getProprietarysoftwares(pattern) {
    var searchPattern = new RegExp(pattern, 'i');
    const proprietary = await Proprietarysoftware
        .find({ name: searchPattern })
        .select({ name: 1, shortDescription: 1 });
    console.log(proprietary);
    return proprietary;
}

async function getAllProprietarySoftwares() {
    const proprietary = await Proprietarysoftware
        .find()
        .select({ name: 1, shortDescription: 1 });
    if(proprietary.length!=0)
        console.log(proprietary);
    else    
        console.log('No proprietary softwares found');
    return proprietary;
}

async function getAlternatives(id) {
    const proprietary = await Proprietarysoftware.findById(id);
    console.log(proprietary);
    if (!proprietary) {
        console.log('not found properietary software for id:' + id);
        return;
    }
    console.log(proprietary.tags);
    const alternatives = await Freesoftware
        .find({ handle: { $in: proprietary.tags } });
    console.log('Alternatives found:');
    console.log(alternatives);

    return alternatives;
}

async function increaseUpvotes(id) {
    const freeSoftware = await Freesoftware.findByIdAndUpdate(id, {
        $inc: {
            upVotes: 1
        }
    }, { new: true });
    if (!freeSoftware) {
        console.log('not found free software for ' + id);
        return;
    }
    console.log(freeSoftware);

}

async function increaseDownvotes(id) {
    const freeSoftware = await Freesoftware.findByIdAndUpdate(id, {
        $inc: {
            downVotes: 1
        }
    }, { new: true });
    if (!freeSoftware) {
        console.log('not found free software for ' + id);
        return;
    }
    console.log(freeSoftware);
}

async function decreaseDownvotes(id) {
    const freeSoftware = await Freesoftware.findByIdAndUpdate(id, {
        $inc: {
            downVotes: -1
        }
    }, { new: true });
    if (!freeSoftware) {
        console.log('not found free software for ' + id);
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
    const freeSoftware = await Freesoftware.findByIdAndUpdate(id, {
        $inc: {
            upVotes: -1
        }
    }, { new: true });
    if (!freeSoftware) {
        console.log('not found free software for ' + id);
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