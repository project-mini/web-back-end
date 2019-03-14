const express=require('express');

const router=express.Router();
const controller=require('../controller/cruds');

router.post('/', async (req,res) => {
    const freesoftware={
        name : req.body.name,
        shortDescription : req.body.shortDescription,
        handle : req.body.handle,
        upVotes : 0,
        downVotes : 0,
        license : req.body.license
    };
    const result=await controller.addFreeSoftware(freesoftware);
    console.log(result);
    res.send(freesoftware);
});

router.get('/', async (req,res)=>{
    const freesoftware=await controller.getAllFreeSoftwares();
    if(!freesoftware){
        res.status(404).send('No result found for Alternative softwares');
        return;
    }
    res.send(freesoftware);
});

router.get('/:id', async (req,res)=>{
    const alternatives=await controller.getAlternatives(req.params.id);
    console.log(alternatives);
    if(!alternatives){
        res.status(404).send('No alternatives found for'+req.params.id);
        return;
    }
    res.send(alternatives);
});

module.exports=router;