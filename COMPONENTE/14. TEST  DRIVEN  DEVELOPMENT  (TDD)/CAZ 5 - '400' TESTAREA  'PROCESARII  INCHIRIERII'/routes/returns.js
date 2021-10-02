// IMPORTAM:
const { Rental } = require('../models/rental');
const express = require('express');
const router = express.Router();



// RUTA 'POST('/')'
router.post('/', async(req, res) => {
    // DACA ('ID CLIENT' DIN 'CORPUL RASP' NU ARE 'O VALOARE')
    // RETURNAM 'RASP.' CU STATUS '400'
    // CU MESAJUL:
    if (!req.body.customerId) return res.status(400).send('customerId not provided.');
    if (!req.body.movieId) return res.status(400).send('movieId not provided.');


    // CAUTAM 'CUSTOMERID' & 'MOVIEID'
    Rental.findOne({
        'customer._id': req.body.customerId,
        'movie._id': req.body.movieId
    });

    // DACA (NU EXISTA 'INCHIRIERE') - RETURNAM '404':
    if (!rental) return res.status(404).send('Rental.not found.');


    // DACA (DATA DE RETURNARE) ESTE DEJA SETATA - RETURNAM '400':
    if (rental.dateReturned) return res.status(400).send('Return already processed.');


    // RASPUNS: 'NEAUTORIZAT'
    res.status(401).send('Unauthorized.');
});


// EXPORTAM:
module.exports = router;