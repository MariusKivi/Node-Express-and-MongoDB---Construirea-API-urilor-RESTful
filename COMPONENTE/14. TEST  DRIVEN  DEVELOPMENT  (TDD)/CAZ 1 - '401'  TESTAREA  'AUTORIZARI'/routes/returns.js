// IMPORTAM:
const express = require('express');
const router = express.Router();



// RUTA 'POST('/')'
router.post('/', async(req, res) => {

    // RASPUNS: 'NEAUTORIZAT'
    res.status(401).send('Unauthorized.');
});


// EXPORTAM:
module.exports = router;