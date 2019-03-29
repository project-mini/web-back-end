const express = require('express');

const router = express.Router();
const controller = require('../controller/cruds_softwares');

router.post('/', async (req, res) => {
    try {
        const freeSoftware = {
            name: req.body.name,
            shortDescription: req.body.shortDescription,
            handle: req.body.handle,
            license: req.body.license,
            suggestedBy: req.body.suggestedBy
        };
        const result = await controller.addFreeSoftware(freeSoftware);
        console.log(result);
        res.send(freeSoftware);
    } catch (err) {
        console.log('Couldn\'t write on the database ...');
        res.status(400).send('Internal Error');
    }
});

router.put('/upvote/:id', async (req,res) => {
    const freeSoftware = await controller.increaseUpvotes(req.params.id);
    console.log(freeSoftware);
    res.send('Updated Software:' + freeSoftware);
});

router.put('/downvote/:id', async (req,res) => {
    const freeSoftware = await controller.increaseDownvotes(req.params.id);
    console.log(freeSoftware);
    res.send('Updated Software:' + freeSoftware);
});

router.put('/unupvote/:id', async (req,res) => {
    const freeSoftware = await controller.decreaseUpvotes(req.params.id);
    console.log(freeSoftware);
    res.send('Updated Software:' + freeSoftware);
});

router.put('/undownvote/:id', async (req,res) => {
    const freeSoftware = await controller.decreaseDownvotes(req.params.id);
    console.log(freeSoftware);
    res.send('Updated Software:' + freeSoftware);
});

router.get('/', async (req, res) => {
    const freeSoftwares = await controller.getAllFreeSoftwares();
    if (freeSoftwares.length == 0)
        return res.status(404).send('No result found for Alternative softwares');

    res.send(freeSoftwares);
});

router.get('/:id', async (req, res) => {
    const alternatives = await controller.getAlternatives(req.params.id);
    console.log(alternatives);
    if (alternatives.length == 0)
        return res.status(404).send('No alternatives found for' + req.params.id);

    res.send(alternatives);
});

module.exports = router;