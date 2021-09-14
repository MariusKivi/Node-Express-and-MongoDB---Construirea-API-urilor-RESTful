// ____________________________________________________________________________
// (IMP-2) IMPORTAREA 'JOI'
const Joi = require('joi');

// ____________________________________________________________________________
// (IMP-1) IMPORTAREA 'MONGOOSE'
const mongoose = require('mongoose');






// ____________________________________________________________________________
// MODEL CU SCHEMA 'INCHIRIERE' CU DEF. 'SCHEMEI'
// (REP. MODELULUI IN APLICATIE - ASA CUM ESTE STOCAT IN 'MONGODB'):
// ____________________________________________________________________________
const Inchiriere = mongoose.model('Inchiriere', new mongoose.Schema({
    client: {
        type: new mongoose.Schema({
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
        }),
        required: true
    },
    film: {
        type: new mongoose.Schema({
            titlu: {
                type: String,
                required: true,
                // ELIMINAREA SPATIILOR DIN JURUL TITLULUI FILMULUI
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            tarifZilnicDeInchiriere: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dataIesire: {
        type: Date,
        required: true,
        default: Date.now
    },
    dataReturnare: {
        type: Date
    },
    taxaDeInchiriere: {
        type: Number,
        min: 0
    }
}));







// ____________________________________________________________________________
// FUNC. 'VALIDAREINCHIRIERE(INCHIRIERE)'
// ____________________________________________________________________________
function validareInchiriere(inchiriere) {

    // INPUT 'API' (CEEA CE TRIMETE CLIENTUL)
    // VALIDARE INCHIRIERE
    // DEF. 'SCHEMEI' - 'JOI' = 'OBIECT':
    const schema = {
        idClient: Joi.string().required(),
        idFilm: Joi.string().required()
    };

    // METODA JOI - 'VALIDATE()':
    return Joi.validate(inchiriere, schema);
}




// ____________________________________________________________________________
// EXPORTARE 
// ____________________________________________________________________________
exports.Inchiriere = Inchiriere;
exports.validare = validareInchiriere;