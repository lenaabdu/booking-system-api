var express = require('express');
var router = express.Router();

const booking = require('./bookingController')

router.get('/reservation', booking.index)
router.post('/reservation/create', booking.create)

module.exports = router;