// ____________________________________________________________________________
// (IMP-4) IMPORTAREA 'JOI'
const Joi = require('joi');

// ____________________________________________________________________________
// (IMP-3) IMPORTAREA 'MONGOOSE'
const mongoose = require('mongoose');







// ____________________________________________________________________________
//  SCHEMEI 'SCHEMAGEN':
// ____________________________________________________________________________
const schemaGen = new mongoose.Schema({
    nume: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});
// ____________________________________________________________________________




// ____________________________________________________________________________
//  MODELUL 'GEN' CU SCHEMA :
// ____________________________________________________________________________
const Gen = mongoose.model('Gen', schemaGen);





// ____________________________________________________________________________
// FUNC. 'VALIDAREGEN(GEN)'
// ____________________________________________________________________________
function validareGen(gen) {
    // LOGICA: VALIDARE CURS
    // DEF. 'SCHEMEI' = 'OBIECT':
    const schema = {
        nume: Joi.string().min(5).required()
    };


    // RETURNAREA - APELARI MET. JOI 'VALIDATE()':
    return Joi.validate(gen, schema);
};
// ____________________________________________________________________________





// ____________________________________________________________________________
// EXPORTARE 
// ____________________________________________________________________________
exports.schemaGen = schemaGen;
exports.Gen = Gen;
exports.validare = validareGen;