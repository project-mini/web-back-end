const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

arr_proprietary = [
    {
        id: 1,
        name: 'Windows',
        details: 'Fully closed OS developed by Microsoft',
        genre: ['OS', 'Microsoft', 'Operating System'],
        alternative: []
    }
];

arr_floss = [
    {
        id: 1,
        name: 'Ubuntu',
        details: 'Open Source OS based on Debian',
        genre: ['OS']
    },
    {
        id: 2,
        name: 'Elementary',
        details: 'Open Source OS based on Debian',
        genre: ['OS']
    }
];

// Route to send all the proprietary softwares in DB.
app.get('/api/ptry', (req, res) => {
    // res.send(arr_proprietary)
    
    for(let i = 0; i < arr_proprietary.length; ++i) 
        res.send(arr_proprietary[i]);
});

// Route to send all the 'FLOSS' softwares in DB.
app.get('/api/floss', (req, res) => {
    // for(let i = 0; i < arr_floss.length; ++i)
    res.send(JSON.stringify(arr_floss));
});


app.get('/api/ptry/:id', (req, res) => {

})

app.post('/api/ptry', (req, res) => {
    if(arr_proprietary.find(sw => sw.name === req.body.name)) {
        return res.status(400).send('Software already exists');
    }

    const sw = {
        id: arr_proprietary.length + 1,
        name: req.body.name,
        details: req.body.details,
        genre: req.body.genre,
        alternatives: []
    };
    arr_proprietary.push(sw);
    res.send(sw);
});

const port = process.env.PORT | 3000;

app.listen(5000, () => {
    console.log(`Listening on port ${5000}`);
});


