const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const proprietary = require('./routes/proprietary');
const alternatives = require('./routes/alternatives');
const root = require('./routes/root');

app.use(express.static('Public'));

app.use('/api/proprietary', proprietary);
app.use('/api/alternatives', alternatives);
app.use('/', root);


const PORT = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Serving at port ${PORT}...`));
