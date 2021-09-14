// ____________________________________________________________________________
// (IMP-6) IMPORTAREA 'MODEL/INCHIRIERE.JS'  
//         (RETURNEAZA '.Inchiriere' SI '.validare')
const { Inchiriere, validare } = require('../models/inchiriere');

// ____________________________________________________________________________
// (IMP-5) IMPORTAREA 'MODEL/FILME.JS'  
const { Film } = require('../models/film');

// ____________________________________________________________________________
// (IMP-4) IMPORTAREA 'MODEL/CLIENTI.JS'  
const { Client } = require('../models/client');

// ____________________________________________________________________________
// (IMP-8) IMPORTAREA 'JOI-OBJECTID'
Joi.objectId = require('joi-objectid')(Joi);

// ____________________________________________________________________________
// (IMP-3) IMPORTAREA 'MONGOOSE'
const mongoose = require('mongoose');

// ____________________________________________________________________________
// (IMP-7) IMPORTAREA BIBLIOTECI 'FAWN'
const Fawn = require('fawn');

// ____________________________________________________________________________
// (IMP-1) IMPORTAREA MODULULUI 'EXPRESS'
const express = require('express');

// ____________________________________________________________________________
// (IMP-2) OBIECTUL 'ROUTER' - APELAREA FUNC. 'EXPRESS.ROUTER()'
const router = express.Router();







// __ __________________________________________________________________________
// INITIALIZAREA - BIBLIOTECI 'FAWN' 
// __ __________________________________________________________________________
Fawn.init(mongoose);
// __ __________________________________________________________________________







// ____________________________________________________________________________
// RUTA 1.1: GET('/') - PRELUARE/CITIRE 'INCHIRIERE'
// ____________________________________________________________________________
router.get('/', async(req, res) => {
    // RETURNARE 'INCHIRIERE' & 'SORTARE' IN ORDINE 'DESCRESCATOARE' ('-PROP') DUPA 'DATA IESIRE':
    const inchirieri = await Inchiriere.find().sort('-dataIesire');

    // RASPUNSUL - MATRICE DE OBIECTE:
    res.send(inchirieri);
});







// ____________________________________________________________________________
// RUTA 2: POST('/') - CREARE 'INCHIRIERE'
// ____________________________________________________________________________
router.post('/', async(req, res) => {
    // ---------------------------------------------------------------------
    // VALIDAREA 'REQUEST'-ULUI  
    const { error } = validare(req.body);

    // DACA 'INCHIRIEREA ESTE INVALIDA' -> RETURNAM 'EROAREA 400' (CERERE ERONATA)
    if (error) return res.status(400).send(error.details[0].message);
    // ---------------------------------------------------------------------



    // ---------------------------------------------------------------------
    // GASIREA & VALIDAREA 'CLIENTULUI' DUPA 'ID' 
    const client = await Client.findById(req.body.idClient);

    // DACA 'CLIENTUL ESTE INVALID' -> RETURNAM 'EROAREA 400' (CERERE ERONATA)
    if (!client) return res.status(400).send('Client invalid.');
    // ---------------------------------------------------------------------


    // ---------------------------------------------------------------------
    // GASIREA & VALIDAREA 'FILMULUI' DUPA 'ID' - TRIMIS DE 'CLIENT': 
    const film = await Film.findById(req.body.idFilm);

    // DACA 'FILMUL ESTE INVALID' -> RETURNAM '400' (CERERE ERONATA)
    if (!film) return res.status(400).send('Film invalid.');
    // ---------------------------------------------------------------------


    //  NE ASIGURAM CA 'FILMUL NU ESTE IN STOC' = SI RET. 'EROARE 400':
    if (film.numarInStoc === 0) return res.status(400).send('Filmul nu este în stoc.');


    // ---------------------------------------------------------------------
    // CREARE OBIECT 'INCHIRIERE':
    let inchiriere = new Inchiriere({
        client: {
            _id: client._id,
            nume: client.nume,
            telefon: client.telefon
        },

        film: {
            _id: film._id,
            titlu: film.titlu,
            tarifZilnicDeInchiriere: film.tarifZilnicDeInchiriere
        }
    });

    // SALVARE 'INCHIRIERE' IN DB:
    // inchiriere = await inchiriere.save();
    // ---------------------------------------------------------------------


    // ---------------------------------------------------------------------
    // UPGRADAREA 'NUMARULUI DE FILME EXISTENTE IN STOC'
    // 'DECREMENTAND  STOCUL' ('PROP--'):
    // film.numarInStoc--;

    // SALVARE 'FILM':
    // film.save();
    // ---------------------------------------------------------------------


    // ---------------------------------------------------------------------
    // BLOCUL 'TRY{} .. CATCH{}'
    // ---------------------------------------------------------------------
    try {

        // ---------------------------------------------------------------------
        // CREAREA OBIECTULUI 'TASK()' (ASEMANATOR CU 'TRANZACTIILE')
        // PRIN INTERMEDIUL 'FAWN LIBRARY'
        // ---------------------------------------------------------------------
        new Fawn.Task()
            .save('inchirieri', inchiriere)
            .update('filme', { _id: film._id }, {
                // OPERATORUL DE 'INCREMENTARE' - '$INC'
                // A CARUI 'VALOARE' O 'DECREMENTAM' - '-1':
                $inc: { numarInStoc: -1 }
            })
            .remove();
        // ---------------------------------------------------------------------


        // RETURNAM 'RASPUNSULUI' PT.'INCHIRIERE'
        res.send(inchiriere);
    } catch (exception) {
        // RETURNAREA 'ERORI 500' CATRE 'CLIENT' (EROARE INTERNA DE SERVER):
        res.status(500).send('Ceva nu a reușit.');
    }
    // ---------------------------------------------------------------------
});




// ____________________________________________________________________________
// RUTA 1.2: GET('/:ID') 
// ____________________________________________________________________________
router.get('/:id', async(req, res) => {

    // GASIREA UNEI SINGURE INCHIRIERI DUPA ID:  
    const inchiriere = await Inchiriere.findById(req.params.id);

    // DACA 'NU EXISTA INCHIRIERE' PT. UN 'ID' DAT:
    if (!inchiriere) return res.status(404).send('Nu a fost găsită închirierea cu actul de identitate dat.');

    // RETURNAM 'RASPUNSULUI' PT.'INCHIRIERE'
    res.send(inchiriere);
});




// ____________________________________________________________________________
// EXPORTARE OBIECTULUI 'ROUTER'
// ____________________________________________________________________________
module.exports = router;