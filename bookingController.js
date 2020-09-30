const createError = require('http-errors')

let reservationform = []
let idno = 0



exports.create = function(req, res, next) {
    if (!req.body.Number) {
        return (next(createError(400, "Number of customers is required")))
    }
    reservationform.push({ name: req.body.name, phone: req.body.phone, email: req.body.email, number: req.body.number })
    res.send({ result: true })
    idno++
}


exports.index = function(req, res) {
    res.send(reservationform)
}