// INCARCARI (IMPORTURI):
// ____________________________________________________________________________
// (IMP-4) IMPORTAREA 'JOI'
const Joi = require('joi');

// ____________________________________________________________________________
// (IMP-3) IMPORTAREA 'MONGOOSE'
const mongoose = require('mongoose');

// ____________________________________________________________________________
// (IMP-1) IMPORTAREA MODULULUI 'EXPRESS'
const express = require('express');

// ____________________________________________________________________________
// (IMP-2) OBIECTUL 'ROUTER' - APELAREA FUNC. 'EXPRESS.RIUTER()'
const router = express.Router();







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
// RUTA 1.1: '/'
// 'CITIREA' PRIN  MET. 'GET()':
// ____________________________________________________________________________
router.get('/', async(req, res) => {
    // RETURNARE 'GENURI' & 'SORTARE' DUPA 'NUME':
    const genuri = await Gen.find().sort('nume');

    // RASPUNSUL - MATRICE DE OBIECTE:
    res.send(genuri);
});
// ____________________________________________________________________________







// ____________________________________________________________________________
// RUTA 2: '/'
// 'CREAREA' PRIN MET. 'POST(URL, CALLBACK_FUNC(REQ, RES))' 
// ____________________________________________________________________________
router.post('/', async(req, res) => {

    // DESTRUCTURAREA OBIECTELOR - APELAREA FUNC. 'VALIDAREGEN()'
    const { error } = validareGen(req.body);

    // LOGICA:  DACA 'GENUL ESTE INVALID' -> RETURNAM '400' (CERERE ERONATA)
    // VERIFICAREA VALOAREI 'REZULTAT' -> A PROP. 'ERROR'
    if (error)
    //  RETURNAM 'EROAREA CU STATREA - 400' CATRE 'CLIENT':
        return res.status(400).send(error.details[0].message);


    // CREARE OBIECTUL 'GEN':
    let gen = new Gen({ nume: req.body.nume });


    //     // ADAUGAM OBIECTUL 'CURS' -> IN MATRICEA 'CURSURI':
    // SALVAREA IN BAZA DE DATE:
    gen = await gen.save();

    // RETURNAREA 'OBIECTULUI' CATRE 'CLIENT':
    res.send(gen);
});
// ____________________________________________________________________________








// ____________________________________________________________________________
// RUTA 3: '/:ID'
// 'UPGRADARE' PRIN MET. 'PUT(URL, CALLBACK_FUNC(REQ, RES))' 
// ____________________________________________________________________________
router.put('/:id', async(req, res) => {
    const { error } = validareGen(req.body);

    // LOGICA:  DACA 'GENUL ESTE INVALID' -> RETURNAM '400' (CERERE ERONATA)
    // VERIFICAREA VALOAREI 'REZULTAT' -> A PROP. 'ERROR'
    if (error) return res.status(400).send(error.details[0].message);

    //  LOGICA:  DACAGASIREA 'GENULUI':
    const gen = await Gen.findByIdAndUpdate(req.params.id, { nume: req.body.nume }, {
        new: true
    });

    // LOGICA: DACA 'CURSUL NU EXISTA' -> RETURNAM '404' (RESURSA NU A FOST GASITA)
    // DACA 'NU EXISTA GEN' PT. UN 'ID' DAT:
    if (!gen) return res.status(404).send('Genul cu ID-ul dat nu a fost găsit.');

    // LOGICA: RETURNARE 'GENULUI UPGRADAT' CLIENTULUI:
    res.send(gen);
});
// ____________________________________________________________________________







// ____________________________________________________________________________
// RUTA 4: '/:ID'
// 'STERGEREA' PRIN MET. 'DELETE(URL, CALLBACK_FUNC(REQ, RES))' 
// ____________________________________________________________________________
router.delete('/:id', async(req, res) => {

    // 'GASIREA & STERGEREA' DUPA 'ID':
    const gen = await Gen.findByIdAndRemove(req.params.id);


    // LOGICA '1.2': DACA 'ELEMENTUL CAUTAT' NU EXISTA - RETURNAM EROAREA '404'
    // DACA 'NU EXISTA GEN' PT. UN 'ID' DAT:
    if (!gen)
        return res.status(404).send('Genul cu ID-ul dat nu a fost găsit.');


    // LOGICA '2.2': RETURNAM 'RASPUNSULUI' CATRE 'CLIENT'
    res.send(gen);
});
// ____________________________________________________________________________







// ____________________________________________________________________________
// RUTA 1.2: '/:ID' 
// 'CITIREA' PRIN MET. 'GET()'
// ____________________________________________________________________________
router.get('/:id', async(req, res) => {

    // GASIREA UNUI SINGUR GEN DUPA ID:
    const gen = await Gen.findById(req.params.id);

    // DACA 'NU EXISTA GEN' PT. UN 'ID' DAT:
    if (!gen)
        return res.status(404).send('Genul cu ID-ul dat nu a fost găsit.');
    res.send(gen);
});
// ____________________________________________________________________________







// ____________________________________________________________________________
// FUNC. 'VALIDAREGEN(GEN)'
// ____________________________________________________________________________
function validareGen(gen) {
    // LOGICA: VALIDARE CURS
    // DEF. 'SCHEMEI' = 'OBIECT':
    const schema = {
        nume: Joi.string().min(3).required()
    };


    // RETURNAREA - APELARI MET. 'VALIDATE()':
    return Joi.validate(gen, schema);
};
// ____________________________________________________________________________



// ____________________________________________________________________________
// EXPORTARE 'ROUTER'
// ____________________________________________________________________________
module.exports = router;