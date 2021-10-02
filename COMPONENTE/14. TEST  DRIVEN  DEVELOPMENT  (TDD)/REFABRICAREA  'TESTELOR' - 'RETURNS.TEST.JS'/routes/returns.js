// IMPORTAM:
const express = require('express');
const router = express.Router();



// RUTA 'POST('/')'
router.post('/', async(req, res) => {
    // DACA ('ID CLIENT' DIN 'CORPUL RASP' NU ARE 'O VALOARE')
    // RETURNAM 'RASP.' CU STATUS '400'
    // CU MESAJUL:
    if (!req.body.customerId) return res.status(400).send('customerId not provided.');
    if (!req.body.movieId) return res.status(400).send('movieId not provided.');

    // RASPUNS: 'NEAUTORIZAT'
    res.status(401).send('Unauthorized.');
});


// EXPORTAM:
module.exports = router;