//const cruds=require('./cruds');

const express=require('express');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));

const proprietary=require('./routes/proprietary');
const alternatives=require('./routes/alternatives');

app.use(express.static('Public'));

app.use('/api/proprietary', proprietary);
app.use('/api/alternatives', alternatives);

//cruds.searchProprietarySoftwares('windows');
// cruds.addProprietarySoftware('Opera','A closed source web browser',['browser']);
//cruds.getAlternatives('Adobe Photoshop');
// cruds.addFreeSoftware('TOR Browser','An open source browser','Various from Mozilla','browser');

// cruds.addFreeSoftware('GIMP','A free and open source image processing software','GPL','multimedia');



// console.log('WAY PAST ADDING');
// const results=cruds.getAlternatives('windows');
// console.log(results);


app.listen(3000, () => console.log('Serving at port 3k...'));
