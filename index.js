const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const proprietary = require('./routes/proprietary');
const alternatives = require('./routes/alternatives');

app.use(express.static('Public'));

app.use('/api/proprietary', proprietary);
app.use('/api/alternatives', alternatives);

app.get('/', (req, res) => {
    res.send('Home Page.');
});
app.listen(3000, () => console.log('Serving at port 3k...'));
