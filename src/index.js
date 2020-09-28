// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { ObjectId } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

const mongoose = require('mongoose');

const { User } = require('../models/user');
//const dburi =


mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/database', {


    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});


const app = express();
const port = process.env.PORT || 3004
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.post('/auth', async(req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
        return res.sendStatus(401)
    }
    if (req.body.password !== user.password) {
        return res.sendStatus(403)
    }
    user.token = uuidv4()
    await user.save()
    res.send({ token: user.token })
})

app.use(async(req, res, next) => {
    const authHeader = req.headers['authorization']
    const user = await User.findOne({ token: authHeader })
    if (user) {
        next()
    } else {
        res.sendStatus(403)
    }
})



// starting the server
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("Database Connected")
});