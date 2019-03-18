const express = require('express');

const router = express.Router();
const controller = require('../controller/cruds');

router.post('/', async (req, res) => {
    try {
        const freeSoftware = {
            name: req.body.name,
            shortDescription: req.body.shortDescription,
            handle: req.body.handle,
            license: req.body.license
        };
        const result = await controller.addFreeSoftware(freeSoftware);
        console.log(result);
        res.send(freeSoftware);
    } catch (err) {
        console.log('Couldn\'t write on the database ...');
        res.status(400).send('Internal Error');
    }
});

router.get('/', async (req, res) => {
    const freeSoftwares = await controller.getAllFreeSoftwares();
    if (!freeSoftwares)
        return res.status(404).send('No result found for Alternative softwares');

    res.send(freeSoftwares);
});

router.get('/:id', async (req, res) => {
    const alternatives = await controller.getAlternatives(req.params.id);
    console.log(alternatives);
    if (!alternatives)
        return res.status(404).send('No alternatives found for' + req.params.id);

    res.send(alternatives);
});

module.exports = router;