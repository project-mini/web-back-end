const express = require('express');

const router = express.Router();
const controller = require('../controller/cruds_softwares');

router.post('/license/',async (req,res)=>{
    const freeSoftware = await controller.checkLicense(req.body.search);
    if (freeSoftware.length == 0)
        return res.status(404).send('No search result found for ' + req.body.search);
    res.send(freeSoftware);
})

router.post('/', async (req, res) => {
    const freeSoftware = {
        name: req.body.name,
        shortDescription: req.body.shortDescription,
        handle: req.body.handle,
        license: req.body.license,
        suggestedBy: req.body.suggestedBy,
        licenseLink: 'https://duckduckgo.com/?q='+req.body.license+'+license'
    }
    const result = await controller.addFreeSoftware(freeSoftware);
    console.log(result);
    res.send(result);

});

router.put('/upvote/:id', async (req,res) => {
    const freeSoftware = await controller.increaseUpvotes(req.params.id);
    console.log(freeSoftware);
    res.send('Updated Software:');
});

router.put('/downvote/:id', async (req,res) => {
    const freeSoftware = await controller.increaseDownvotes(req.params.id);
    console.log(freeSoftware);
    res.send('Updated Software');
});

router.put('/unupvote/:id', async (req,res) => {
    const freeSoftware = await controller.decreaseUpvotes(req.params.id);
    console.log(freeSoftware);
    res.send('Updated Software:');
});

router.put('/undownvote/:id', async (req,res) => {
    const freeSoftware = await controller.decreaseDownvotes(req.params.id);
    console.log(freeSoftware);
    res.send('Updated Software:');
});

// router.get('/', async (req, res) => {
//     const freeSoftwares = await controller.getAllFreeSoftwares();
//     if (freeSoftwares.length == 0)
//         return res.status(404).send('No result found for Alternative softwares');

//     res.send(freeSoftwares);
// });

router.get('/', async (req,res) => {
    const freeSoftwares = await controller.getTopAlternatives();
    if(freeSoftwares==0)
        return res.status(404).send('No result found for Alternative softwares');

    res.send(freeSoftwares);
});

router.get('/:id', async (req, res) => {
    try{
        const alternatives = await controller.getAlternatives(req.params.id);
        console.log(alternatives);
        if (alternatives.length == 0)
            return res.status(404).send('No alternatives found for' + req.params.id);
        res.send(alternatives);
        
    }catch(err){
        res.status(404).send('Error fetching alternatives for the specified id');
    }
});

module.exports = router;