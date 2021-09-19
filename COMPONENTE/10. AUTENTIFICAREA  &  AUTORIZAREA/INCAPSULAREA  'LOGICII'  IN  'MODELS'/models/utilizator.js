// INCARCARI (IMPORTURI):
// ____________________________________________________________________________
// (IMP-6) IMPORTAREA  MODULULUI 'CONFIG':
const config = require('config');

// ____________________________________________________________________________
// (IMP-5) IMPORTAREA BIBLIOTECI 'JSON WEB TOKEN':
const jwt = require('jsonwebtoken');

// ____________________________________________________________________________
// (IMP-4) IMPORTAREA 'JOI'
const Joi = require('joi');

// ____________________________________________________________________________
// (IMP-3) IMPORTAREA 'MONGOOSE'
const mongoose = require('mongoose');






// ____________________________________________________________________________
//  SCHEMA SEPARATA 'SCHEMAUTILIZATOR':
// ____________________________________________________________________________
const schemaUtilizator = new mongoose.Schema({
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
});
// ____________________________________________________________________________







// ____________________________________________________________________________
//  MET. '.METHODS.GENERARETOKENAUTENTIFICARE()' IN 'SCHEMAUTILIZATOR' 
//  CA FUNCTIE ANONIMA::
// ____________________________________________________________________________
schemaUtilizator.methods.generareTokenAutentificare = function() {

    // JSON WEB TOKEN (JWT)
    // MET. 'JWT..SIGN({OBIECT_PAYLOAD}, 'CHIE_PRIVATA/SECRETA')'
    // APELAREA MET. 'CONGIG.GET()' CA ARGUMENT:
    const token = jwt.sign({ _id: this._id }, config.get('cheiaPrivataJWT'));
    return token;
};
// ____________________________________________________________________________







// ____________________________________________________________________________
//  MODELUL 'UTILIZATOR' CU APELARE 'SCHEMAUTILIZATOR' :
// ____________________________________________________________________________
const Utilizator = mongoose.model('Utilizator', schemaUtilizator);
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