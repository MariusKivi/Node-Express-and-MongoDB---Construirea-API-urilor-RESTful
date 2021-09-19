// INCARCARI (IMPORTURI):
// ____________________________________________________________________________
// (IMP-4) IMPORTAREA 'JOI'
const Joi = require('joi');

// ____________________________________________________________________________
// (IMP-3) IMPORTAREA 'MONGOOSE'
const mongoose = require('mongoose');






// ____________________________________________________________________________
//  MODELUL 'UTILIZATOR' CU SCHEMA :
// ____________________________________________________________________________
const Utilizator = mongoose.model('Utilizator', new mongoose.Schema({
    nume: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // UNICITATEA PROP. 'EMAIL':
        unique: true
    },
    parola: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    }
}));
// ____________________________________________________________________________





// ____________________________________________________________________________
// FUNC. 'VALIDAREUTILIZATOR(UTILIZATOR)'
// ____________________________________________________________________________
function validareUtilizator(utilizator) {
    // VALIDARE UTILIZATOR
    // DEF. 'SCHEMEI JOI' = 'OBIECT':
    const schema = {
        nume: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        parola: Joi.string().min(5).max(255).required()
    };


    // RETURNAREA - APELARI MET. JOI 'VALIDATE()':
    return Joi.validate(utilizator, schema);
};
// ____________________________________________________________________________





// ____________________________________________________________________________
// EXPORTARE 
// ____________________________________________________________________________
exports.Utilizator = Utilizator;
exports.validare = validareUtilizator;