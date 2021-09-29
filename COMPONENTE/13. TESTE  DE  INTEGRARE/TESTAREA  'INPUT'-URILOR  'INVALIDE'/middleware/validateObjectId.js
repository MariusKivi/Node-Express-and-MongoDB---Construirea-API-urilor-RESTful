// IMP. \MONGOOSE\
const mongoose = require('mongoose');


// FUNCTIA EXPORTATA 'VALIDATEOBJECTID':
module.exports = function(req, res, next) {
    // DACA 'NU ESTE VALIDA' - APELAM TIPULUI 'OBJECTID' DIN 'MONGOOSE'
    // DACA 'NU ESTE VALIDA' - APELAM TIPULUI 'OBJECTID' DIN 'MONGOOSE'
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid ID.');

    // ALTFEL 'TRECEM CONTROLUL' CATRE FUNC. MIDDLEWARE 'URMATOARE':
    next();
}