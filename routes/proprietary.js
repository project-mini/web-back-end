const express = require('express');
const router = express.Router();
const controller = require('../controller/cruds_softwares');

router.post('/', async (req, res) => {
    let proprietary = {
        name: req.body.name,
        shortDescription: req.body.shortDescription,
        tags: req.body.tags.split(";"),
        requestedBy: req.body.requestedBy
    };
    proprietary.tags.pop();
    const result = await controller.addProprietarySoftware(proprietary);
    console.log(result);
    
    res.send(result);
});

router.get('/', async (req, res) => {
    const proprietary = await controller.getAllProprietarySoftwares();
    if (proprietary.length == 0)
        return res.status(404).send('No result found for proprietary softwares');
    console.log(proprietary);
    res.send(proprietary);
});

router.post('/search', async (req, res) => {
    const proprietary = await controller.searchProprietarySoftwares(req.body.search);
    if (proprietary.length == 0)
        return res.status(404).send('No search result found for' + req.body.search);
    res.send(proprietary);
});

module.exports = router;