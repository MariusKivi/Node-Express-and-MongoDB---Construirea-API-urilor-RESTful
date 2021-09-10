// ____________________________________________________________________________
// INCARCARI (IMPORTURI):
// ____________________________________________________________________________
// (IMP-5) IMPORTAREA 'MODEL/FILME.JS'  
//         (RETURNEAZA '.Filme' SI '.validare')
const { Filme, validare } = require('../models/filme');

// ____________________________________________________________________________
// (IMP-4) IMPORTAREA 'MODEL/GENURI.JS'  
const { Genuri } = require('../models/genuri');

// ____________________________________________________________________________
// (IMP-3) IMPORTAREA 'MONGOOSE'
const mongoose = require('mongoose');

// ____________________________________________________________________________
// (IMP-1) IMPORTAREA MODULULUI 'EXPRESS'
const express = require('express');

// ____________________________________________________________________________
// (IMP-2) OBIECTUL 'ROUTER' - APELAREA FUNC. 'EXPRESS.ROUTER()'
const router = express.Router();




// ____________________________________________________________________________
// RUTA 1.1: GET('/')
// ____________________________________________________________________________
router.get('/', async(req, res) => {
    // RETURNARE 'FILM' & 'SORTARE' DUPA 'NUME':
    const filme = await Film.find().sort('nume');

    // RASPUNSUL - MATRICE DE OBIECTE:
    res.send(filme);
});




// ____________________________________________________________________________
// RUTA 2: POST('/')
// ____________________________________________________________________________
router.post('/', async(req, res) => {
    // DESTRUCTURAREA OBIECTELOR - APELAREA FUNC. 'VALIDAREFILM()'  
    const { error } = validare(req.body);

    // DACA 'FILMUL ESTE INVALID' -> RETURNAM '400' (CERERE ERONATA)
    // VERIFICAREA VALOARII 'REZULTAT' -> A PROP. 'ERROR'
    if (error) return res.status(400).send(error.details[0].message);


    // GASIREA 'GENULUI FILMULUI' DUPA 'ID':
    const gen = await Gen.findById(req.body.idGen);
    // DACA 'GENUL NU EXISTA' RETURNAM 'EROAREA 400':
    if (!gen) return res.status(400).send('Gen nevalid');


    // CREARE OBIECT 'FILM':
    let film = new Film({
        titlu: req.body.titlu,
        gen: {
            _id: gen._id,
            nume: gen.nume
        },
        numarInStoc: req.body.numarInStoc,
        tarifZilnicDeInchiriere: req.body.tarifZilnicDeInchiriere
    });

    // SALVAREA IN BAZA DE DATE:
    film = await film.save();

    // RETURNAM 'RASPUNSULUI' CU 'FILM'
    res.send(film);
});




// ____________________________________________________________________________
// RUTA 3: PUT('/:ID') -- PT. 'UPGRADARE'
// ____________________________________________________________________________
router.put('/:id', async(req, res) => {
    // APELAREA FUNC. 'VALIDARE FILM()':  
    const { error } = validare(req.body);

    // DACA 'FILMUL ESTE INVALID' -> RETURNAM '400' (CERERE ERONATA)
    // VERIFICAREA VALORI 'REZULTAT' -> A PROP. 'ERROR'
    if (error) return res.status(400).send(error.details[0].message);


    // GASIREA 'GENULUI FILMULUI' DUPA 'ID':
    const gen = await Gen.findById(req.body.idGen);
    // DACA 'GENUL NU EXISTA' RETURNAM 'EROAREA 400':
    if (!gen) return res.status(400).send('Gen nevalid.');


    // GASIREA DUPA 'ID'& UPGRADAREA 'FILMULUI':
    const film = await Film.findByIdAndUpdate(req.params.id, {
        titlu: req.body.titlu,
        gen: {
            _id: gen._id,
            nume: gen.nume
        },
        numarInStoc: req.body.numarInStoc,
        tarifZilnicDeInchiriere: req.body.tarifZilnicDeInchiriere
    }, { new: true });

    // DACA 'FILMUL NU EXISTA' -> RETURNAM '404'
    // ('NU EXISTA FILM' PT. UN 'ID' DAT):
    if (!film) return res.status(404).send('Filmul cu ID-ul dat nu a fost găsit.');

    // RETURNAM 'RASPUNSULUI' CU 'FILM'
    res.send(film);
});




// ____________________________________________________________________________
// RUTA 4: DELETE('/:ID')
// ____________________________________________________________________________
router.delete('/:id', async(req, res) => {
    // 'GASIREA & STERGEREA' DUPA 'ID':  
    const film = await Film.findByIdAndRemove(req.params.id);

    // DACA 'ELEMENTUL CAUTAT' NU EXISTA - RETURNAM EROAREA '404'
    // DACA 'NU EXISTA FILM' PT. UN 'ID' DAT:
    if (!film) return res.status(404).send('Filmul cu ID-ul dat nu a fost găsit.');

    // RETURNAM 'RASPUNSULUI' CU 'FILM'
    res.send(film);
});




// ____________________________________________________________________________
// RUTA 1.2: GET('/:ID') 
// ____________________________________________________________________________
router.get('/:id', async(req, res) => {
    // GASIREA UNUI SINGUR FILM DUPA ID:  
    const film = await Film.findById(req.params.id);

    // DACA 'NU EXISTA FILMUL' PT. UN 'ID' DAT:
    if (!film) return res.status(404).send('Filmul cu ID-ul dat nu a fost găsit.');

    // RETURNAM 'RASPUNSULUI' CU 'FILM'
    res.send(film);
});




// ____________________________________________________________________________
// EXPORTARE OBIECTULUI 'ROUTER'
// ____________________________________________________________________________
module.exports = router;