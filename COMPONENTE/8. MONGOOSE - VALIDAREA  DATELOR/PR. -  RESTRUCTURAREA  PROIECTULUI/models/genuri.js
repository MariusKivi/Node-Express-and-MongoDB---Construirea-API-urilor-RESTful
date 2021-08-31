// INCARCARI (IMPORTURI):
// ____________________________________________________________________________
// (IMP-4) IMPORTAREA 'JOI'
const Joi = require('joi');

// ____________________________________________________________________________
// (IMP-3) IMPORTAREA 'MONGOOSE'
const mongoose = require('mongoose');







// ____________________________________________________________________________
// CREAREA MODELULUI 'GEN' CU DEF. 'SCHEMEI':
// ____________________________________________________________________________
const Gen = mongoose.model('Gen', new mongoose.Schema({
    nume: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));
// ____________________________________________________________________________







// ____________________________________________________________________________
// FUNC. 'VALIDAREGEN(GEN)'
// ____________________________________________________________________________
function validareGen(gen) {
    // LOGICA: VALIDARE CURS
    // DEF. 'SCHEMEI' = 'OBIECT':
    const schema = {
        nume: Joi.string().min(5).max(50).required()
    };


    // RETURNAREA - APELARI MET. 'VALIDATE()':
    return Joi.validate(gen, schema);
};
// ____________________________________________________________________________





// ____________________________________________________________________________
// EXPORTARE 
// ____________________________________________________________________________
exports.Gen = Gen;
exports.validare = validareGen;