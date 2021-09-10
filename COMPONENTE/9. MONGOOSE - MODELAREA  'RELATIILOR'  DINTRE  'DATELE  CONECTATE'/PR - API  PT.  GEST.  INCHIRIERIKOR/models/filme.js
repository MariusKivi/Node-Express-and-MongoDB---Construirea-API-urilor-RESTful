// INCARCARI (IMPORTURI):
// ____________________________________________________________________________
// (IMP-2) IMPORTAREA 'JOI'
const Joi = require('joi');

// ____________________________________________________________________________
// (IMP-1) IMPORTAREA 'MONGOOSE'
const mongoose = require('mongoose');

// ____________________________________________________________________________
// (IMP-4) IMPORTAREA './GENURI.JS'  
const { schemaGen } = require('./genuri');






// ____________________________________________________________________________
// MODEL CU SCHEMA 'FILM' CU DEF. 'SCHEMEI'
// (REP. MODELULUI IN APLICATIE - ASA CUM ESTE STOCAT IN 'MONGODB'):
// ____________________________________________________________________________
const Film = mongoose.model('Filme', new mongoose.Schema({
    titlu: {
        type: String,
        required: true,
        // ELIMINAREA SPATIILOR DIN JURUL TITLULUI FILMULUI
        trim: true,
        minlength: 5,
        maxlength: 255
    },

    gen: {
        type: schemaGen,
        required: true
    },
    numarInStoc: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255
    },
    tarifZilnicDeInchiriere: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255
    }
}));
// ____________________________________________________________________________







// ____________________________________________________________________________
// FUNC. 'VALIDAREFIM(FILM)'
// ____________________________________________________________________________
function validareFilm(film) {

    // INPUT 'API' (CEEA CE TRIMETE CLIENTUL)
    // VALIDARE FILM
    // DEF. 'SCHEMEI' - 'JOI' = 'OBIECT':
    const schema = {
        titlu: Joi.string().min(5).max(50).required(),
        idGen: Joi.string().required(),
        numarInStoc: Joi.number().min(0).required(),
        tarifZilnicDeInchiriere: Joi.number().min(0).required()
    };


    // RETURNAREA - APELARI MET. JOI 'VALIDATE()':
    return Joi.validate(film, schema);
};
// ____________________________________________________________________________





// ____________________________________________________________________________
// EXPORTARE 
// ____________________________________________________________________________
exports.Film = Film;
exports.validare = validareFilm;