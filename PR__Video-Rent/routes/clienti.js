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
// RUTA 1.1: GET('/')
// ____________________________________________________________________________
router.get('/', async(req, res) => {
    // RETURNARE 'GENURI' & 'SORTARE' DUPA 'NUME':
    const clienti = await Gen.find().sort('nume');

    // RASPUNSUL - MATRICE DE OBIECTE:
    res.send(clienti);
});
// ____________________________________________________________________________







// ____________________________________________________________________________
// RUTA 2: POST('/')
// ____________________________________________________________________________
router.post('/', async(req, res) => {

    // DESTRUCTURAREA OBIECTELOR - APELAREA FUNC. 'VALIDAREGEN()'
    const { error } = validareClient(req.body);

    // LOGICA:  DACA 'GENUL ESTE INVALID' -> RETURNAM '400' (CERERE ERONATA)
    // VERIFICAREA VALOAREI 'REZULTAT' -> A PROP. 'ERROR'
    if (error)
    //  RETURNAM 'EROAREA CU STATREA - 400' CATRE 'CLIENT':
        return res.status(400).send(error.details[0].message);


    // CREARE OBIECTUL 'GEN':
    let client = new Client({
        nume: req.body.nume,
        telefon: req.body.telefon,
        esteAur: req.body.esteAur
    });


    //     // ADAUGAM OBIECTUL 'CURS' -> IN MATRICEA 'CURSURI':
    // SALVAREA IN BAZA DE DATE:
    client = await client.save();

    // RETURNAREA 'OBIECTULUI' CATRE 'CLIENT':
    res.send(client);
});
// ____________________________________________________________________________







// ____________________________________________________________________________
// RUTA 3: PUT('/:ID') -- PT. 'UPGRADARE'
// ____________________________________________________________________________
router.put('/:id', async(req, res) => {
    // APELAREA FUNC. 'VALIDARE CLIENT()':
    const { error } = validareClient(req.body);

    // LOGICA:  DACA 'GENUL ESTE INVALID' -> RETURNAM '400' (CERERE ERONATA)
    // VERIFICAREA VALOAREI 'REZULTAT' -> A PROP. 'ERROR'
    if (error) return res.status(400).send(error.details[0].message);


    //  LOGICA:  DACAGASIREA 'GENULUI':
    const client = await Client.findByIdAndUpdate(req.params.id, {
        nume: req.body.nume,
        esteAur: req.body.esteAur,
        telefon: req.body.phone
    }, { new: true });

    // LOGICA: DACA 'CURSUL NU EXISTA' -> RETURNAM '404' (RESURSA NU A FOST GASITA)
    // DACA 'NU EXISTA GEN' PT. UN 'ID' DAT:
    if (!client) return res.status(404).send('Clientul cu ID-ul dat nu a fost găsit.');

    // LOGICA: RETURNARE 'GENULUI UPGRADAT' CLIENTULUI:
    res.send(client);
});
// ____________________________________________________________________________







// ____________________________________________________________________________
// RUTA 4: DELETE('/:ID')
// ____________________________________________________________________________
router.delete('/:id', async(req, res) => {

    // 'GASIREA & STERGEREA' DUPA 'ID':
    const client = await Client.findByIdAndRemove(req.params.id);


    // LOGICA '1.2': DACA 'ELEMENTUL CAUTAT' NU EXISTA - RETURNAM EROAREA '404'
    // DACA 'NU EXISTA GEN' PT. UN 'ID' DAT:
    if (!client)
        return res.status(404).send('Clientul cu ID-ul dat nu a fost găsit.');


    // LOGICA '2.2': RETURNAM 'RASPUNSULUI' CATRE 'CLIENT'
    res.send(client);
});
// ____________________________________________________________________________







// ____________________________________________________________________________
// RUTA 1.2: GET('/:ID') 
// ____________________________________________________________________________
router.get('/:id', async(req, res) => {

    // GASIREA UNUI SINGUR GEN DUPA ID:
    const client = await Client.findById(req.params.id);

    // DACA 'NU EXISTA GEN' PT. UN 'ID' DAT:
    if (!client)
        return res.status(404).send('Clientul cu ID-ul dat nu a fost găsit.');
    res.send(client);
});
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


    // RETURNAREA - APELARI MET. 'VALIDATE()':
    return Joi.validate(client, schema);
};
// ____________________________________________________________________________



// ____________________________________________________________________________
// EXPORTARE OBIECTULUI 'ROUTER'
// ____________________________________________________________________________
module.exports = router;