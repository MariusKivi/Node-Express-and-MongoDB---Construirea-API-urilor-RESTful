// (IMP-2) IMPORTAREA 'JOI'
const Joi = require('joi');



// EXPORTAM FUNCTIA ANONIMA:
module.exports = function() {
    // ADAUGAREA 'ID-ULUI OBIECTULUI' LUI 'JOI-OBJECTID'
    Joi.objectId = require('joi-objectid')(Joi);
}