const express = require('express');
const app = express();
const port = process.env.PORT || 8008;
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const user = require('./routes/api/user');
const plant = require('./routes/api/plant');
const bodyParser = require('body-parser');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('Hello world!'));
app.use('/api/user', user);
app.use('/api/plant', plant);
app.use('/api/login', user);
app.get('/user/:id', (req, res) => {
    res.send('user ${req.params.i}')
});

const conn_str = 'mongodb+srv://plantish:plantish@cluster0.rqqi0ou.mongodb.net/Plantish-DB'
mongoose.set('strictQuery', false);
mongoose.connect(conn_str).then(() => {
    app.listen(port)
    console.log('MongoDB Connected Suceeded...')
}).catch(err => {
    console.log('Error in DB connection ${err}')
});


