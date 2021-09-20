// INCARCARI (IMPORTURI):
// ____________________________________________________________________________
// (IMP-4) IMPORTAREA 'MODEL/CLIENT.JS'  
//         (RETURNEAZA '.Client' SI '.validare')
const { Client, validare } = require('../models/client');

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
    // RETURNARE 'CLIENT' & 'SORTARE' DUPA 'NUME':
    const clienti = await Client.find().sort('nume');

    // RASPUNSUL - MATRICE DE OBIECTE:
    res.send(clienti);
});
// ____________________________________________________________________________







// ____________________________________________________________________________
// RUTA 2: POST('/')
// ____________________________________________________________________________
router.post('/', async(req, res) => {

    // DESTRUCTURAREA OBIECTELOR - APELAREA FUNC. 'VALIDARECLIENT()'
    const { error } = validare(req.body);

    // LOGICA:  DACA 'CLIENTUL ESTE INVALID' -> RETURNAM '400' (CERERE ERONATA)
    // VERIFICAREA VALOAREI 'REZULTAT' -> A PROP. 'ERROR'
    if (error)
    //  RETURNAM 'EROAREA CU STATREA - 400' CATRE 'CLIENT':
        return res.status(400).send(error.details[0].message);


    // CREARE OBIECTUL 'CLIENT':
    let client = new Client({
        nume: req.body.nume,
        esteAur: req.body.esteAur,
        telefon: req.body.telefon
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
    const { error } = validare(req.body);

    // LOGICA:  DACA 'CLIENTUL ESTE INVALID' -> RETURNAM '400' (CERERE ERONATA)
    // VERIFICAREA VALOAREI 'REZULTAT' -> A PROP. 'ERROR'
    if (error) return res.status(400).send(error.details[0].message);


    // GASIREA DUPA 'ID'& UPGRADAREA 'CLIENTULUI':
    const client = await Client.findByIdAndUpdate(req.params.id, {
        nume: req.body.nume,
        esteAur: req.body.esteAur,
        telefon: req.body.telefon
    }, { new: true });

    // LOGICA: DACA 'CURSUL NU EXISTA' -> RETURNAM '404' (RESURSA NU A FOST GASITA)
    // DACA 'NU EXISTA CLIENT' PT. UN 'ID' DAT:
    if (!client) return res.status(404).send('Clientul cu ID-ul dat nu a fost găsit.');

    // LOGICA: RETURNARE 'CLIENTULUI UPGRADAT' CLIENTULUI:
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
    // DACA 'NU EXISTA CLIENT' PT. UN 'ID' DAT:
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

    // GASIREA UNUI SINGUR CLIENT DUPA ID:
    const client = await Client.findById(req.params.id);

    // DACA 'NU EXISTA CLIENT' PT. UN 'ID' DAT:
    if (!client)
        return res.status(404).send('Clientul cu ID-ul dat nu a fost găsit.');
    res.send(client);
});
// ____________________________________________________________________________






// ____________________________________________________________________________
// EXPORTARE OBIECTULUI 'ROUTER'
// ____________________________________________________________________________
module.exports = router;