const express=require('express');
const router=express.Router();
const controller=require('../controller/cruds');

router.post('/', async (req,res) => {
    const proprietary={
        name : req.body.name,
        shortDescription : req.body.shortDescription,
        tags : req.body.tags
    };
    const result=await controller.addProprietarySoftware(proprietary);
    console.log(result);
    res.send(proprietary);
});

router.get('/', async (req,res)=>{
    const proprietary=await controller.getAllProprietarySoftwares();
    if(!proprietary){
        res.status(404).send('No result found for proprietary softwares');
        return;
    }
    res.send(proprietary);
});

router.get('/:pattern', async (req,res)=>{
    const proprietary=await controller.searchProprietarySoftwares(req.params.pattern);
    if(!proprietary){
        res.status(404).send('No search result found for'+req.params.pattern);
        return;
    }
    res.send(proprietary);
});

module.exports=router;