// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('../router')
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/database', {

    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

});
const app = express();
const port = process.env.PORT || 3007
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.use(router);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("Database Connected")
});