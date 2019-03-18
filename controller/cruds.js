const mongoose = require('mongoose');
const Proprietarysoftware = require('../models/proprietary');
const Freesoftware = require('../models/freesoftware');

mongoose.connect('mongodb://localhost/softwares')
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
    console.log(proprietary);
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

module.exports.getAlternatives = getAlternatives;
module.exports.addProprietarySoftware = createProprietarysoftware;
module.exports.addFreeSoftware = createFreesoftware;
module.exports.searchProprietarySoftwares = getProprietarysoftwares;
module.exports.getAllProprietarySoftwares = getAllProprietarySoftwares;
module.exports.getAllFreeSoftwares = getAllFreeSoftwares;