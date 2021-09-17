// INCARCARI (IMPORTURI):
// ____________________________________________________________________________
// (IMP-4) IMPORTAREA 'JOI'
const Joi = require('joi');

// ____________________________________________________________________________
// (IMP-3) IMPORTAREA 'MONGOOSE'
const mongoose = require('mongoose');







// ____________________________________________________________________________
// MODELULUI 'CLIENT' CU DEF. 'SCHEMEI':
// ____________________________________________________________________________
const Client = mongoose.model('Client', new mongoose.Schema({
    nume: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

    esteAur: {
        type: Boolean,
        default: false
    },

    telefon: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));
// ____________________________________________________________________________







// ____________________________________________________________________________
// FUNC. 'VALIDARECLIENT)'
// ____________________________________________________________________________
function validareClient(client) {
    // LOGICA: VALIDARE CLIENT
    // DEF. 'SCHEMEI' = 'OBIECT':
    const schema = {
        nume: Joi.string().min(5).max(50).required(),
        telefon: Joi.string().min(5).max(50).required(),
        esteAur: Joi.boolean()
    };


    // RETURNAREA - APELARI MET. JOI 'VALIDATE()':
    return Joi.validate(client, schema);
};
// ____________________________________________________________________________






// ___________________________________________________________________________
// EXPORTARE OBIECTULUI 'ROUTER'
// ____________________________________________________________________________
exports.Client = Client;
exports.validare = validareClient;