// (IMP-5) IMPORTAREA 'MIDDLEWARE/AUTORIZARE.JS'
const autorizare = require('../middleware/autorizare');

// (IMP-7) IMPORTAREA BIBLIOTECI 'JSOM WEB TOKEN':
const jwt = require('jsonwebtoken');

// (IMP-8) IMPORTAREA BIBLIOTECI 'CONFIG':
const config = require('config');

// (IMP-6) IMPORTAREA BIBLIOTECI 'BCRYPT':
const bcrypt = require('bcrypt');

// (IMP-5) IMPORTAREA BIBLIOTECI 'LODASH' - DENUMITA CONVENTIONAL '_':  
const _ = require('lodash');

// (IMP-4) IMPORTAREA 'MODEL/UTILIZATOR.JS'  
//         (RETURNEAZA '.Utilizator' SI '.validare')
const { Utilizator, validare } = require('../models/utilizator');

// (IMP-3) IMPORTAREA 'MONGOOSE'
const mongoose = require('mongoose');

// (IMP-1) IMPORTAREA MODULULUI 'EXPRESS'
const express = require('express');

// (IMP-2) OBIECTUL 'ROUTER' - APELAREA FUNC. 'EXPRESS.ROUTER()'
const router = express.Router();







// ____________________________________________________________________________
// RUTA 2: GET('/ME', MANIPULAREA_RUTEI) - 
// PRIN '/EU' - CLIENTUL NU TRIMITE 'ID'-UL
// PT. 'PRELUAREA/CITIREA UTILIZATORULUI':
// ____________________________________________________________________________
router.get('/eu', autorizare, async(req, res) => {
    // OBTINEREA OBIECTULUI 'UTILIZATOR' EVITAND 'PROMISIUNEA'
    // GASIREA 'UTILIZATORULUI DUPA ID'
    // &CEREREA OBIECTULUI 'UTILIZATOR' 
    // & ACCESAREA PROP. '_ID'
    // & EXCLUDEM PROP. 'PAROLA':
    const utilizator = await Utilizator
        .findById(req.utilizator._id)
        .select('-parola');

    // TRIMITEREA 'RASPUNSULUI' CATRE 'CLIENT': 
    res.send(utilizator);
});
// ____________________________________________________________________________







// ____________________________________________________________________________
// RUTA 1: POST('/')
// PT. 'CREAREA UTILIZATORILOR, INREGISTRAREA':
// ____________________________________________________________________________
router.post('/', async(req, res) => {

    // VALIDAREA 1:
    // DESTRUCTURAREA OBIECTELOR - APELAREA FUNC. 'VALIDAREGEN()'
    const { error } = validare(req.body);
    // LOGICA:  DACA 'GENUL ESTE INVALID' -> RETURNAM '400' (CERERE ERONATA)
    // VERIFICAREA VALOAREI 'REZULTAT' -> A PROP. 'ERROR'
    if (error) return res.status(400).send(error.details[0].message);


    // VALIDAREA 2:
    // NE ASIGURAM CA 'UTILIZATORUL' NU ESTE 'DEJA INREGISTRAT'
    // CARE VA RETURNEAZA O 'PROMISIUNE' - PE CARE O 'AWAYT': 
    let utilizator = await Utilizator.findOne({ email: req.body.email });
    // DACA 'UTILIZATORUL EXISTA' IN 'BAZA DE DATE'
    //  RETURNAM 'EROAREA CU STATREA - 400' CATRE 'CLIENT':
    if (utilizator) return res.status(400).send('Utilizator deja înregistrat.');


    // RESETAREA - OBIECTULUI 'UTILIZATOR'
    // CU MET. 'PICK(OBIECT, ['PROP1','PROP2'.. ])':
    utilizator = new Utilizator(_.pick(req.body, ['nume', 'email', 'parola']));


    // MET. ASINCRON 'GENSALT(NR_CARACTERE, CALLBACK_FUNC)' SAU 'PROMISIUNE'
    // (STRING RENDOM - ADAUGAT INAINTE / DUPA PAROLA):
    const salt = await bcrypt.genSalt(10);

    // MET. 'HASH('PAROLA', SALT, CALLBACK)' SAu 'PROMISIUNE'  PT HASURAREA PAROLEI:
    utilizator.parola = await bcrypt.hash(utilizator.parola, salt);


    // SALVAREA 'UTILIZATORULUI' IN 'BAZA DE DATE'
    await utilizator.save();


    // PRINCIPIUL 'EXPERTULUI IN INFORMATII' (DIN OOP)
    // APELAREA  MET. '.GENERARETOKENAUTENTIFICARE()':
    const token = utilizator.generareTokenAutentificare();


    // (ABORDAREA 2) BIBLIOTECA 'LODASH' - '_'
    // CU MET. 'PICK(OBIECT, ['PROP1','PROP2'.. ])'
    // SI MET. 'HEADER('PREFIX-NUME_ALEATORIU', VALOARE)':
    res.header('x-autentificare-token', token).send(_.pick(utilizator, ['_id', 'nume', 'email']));
});
// ____________________________________________________________________________




// ____________________________________________________________________________
// EXPORTARE 'ROUTER'
// ____________________________________________________________________________
module.exports = router;