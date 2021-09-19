// INCARCARI (IMPORTURI):
// ____________________________________________________________________________
// (IMP-8) IMPORTAREA BIBLIOTECI 'JSON WEB TOKEN':
const jwt = require('jsonwebtoken');

// ____________________________________________________________________________
// (IMP-7) IMPORTAREA BIBLIOTECI 'JOI':
const Joi = require('joi');

// ____________________________________________________________________________
// (IMP-6) IMPORTAREA BIBLIOTECI 'BCRYPT':
const bcrypt = require('bcrypt');


// ____________________________________________________________________________
// (IMP-5) IMPORTAREA BIBLIOTECI 'LODASH' - DENUMITA CONVENTIONAL '_':  
const _ = require('lodash');

// ____________________________________________________________________________
// (IMP-4) IMPORTAREA 'MODEL/UTILIZATOR.JS'  
//         (RETURNEAZA '.Utilizator' SI '.validare')
const { Utilizator } = require('../models/utilizator');

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
// RUTA 1: POST('/')
// PT. 'CREAREA UTILIZATORILOR, INREGISTRAREA':
// ____________________________________________________________________________
router.post('/', async(req, res) => {

    // VALIDAREA 1 -----------------------------------------------------------
    // DESTRUCTURAREA OBIECTELOR - APELAREA FUNC. 'VALIDAREGEN()'
    const { error } = validare(req.body);

    // LOGICA:  DACA 'GENUL ESTE INVALID' -> RETURNAM '400' (CERERE ERONATA)
    // VERIFICAREA VALOAREI 'REZULTAT' -> A PROP. 'ERROR'
    if (error) return res.status(400).send(error.details[0].message);


    // VALIDAREA 2 -----------------------------------------------------------
    // NE ASIGURAM CA 'UTILIZATORUL' NU ESTE 'DEJA INREGISTRAT'
    // CARE VA RETURNEAZA O 'PROMISIUNE' - PE CARE O 'AWAYT': 
    let utilizator = await Utilizator.findOne({ email: req.body.email });

    // DACA 'UTILIZATORUL NU EXISTA' IN 'BAZA DE DATE'
    //  RETURNAM 'EROAREA CU STATREA - 400' CATRE 'CLIENT':
    if (!utilizator) return res.status(400).send('Email sau parola invalida.');



    // VALIDAREA 3 -----------------------------------------------------------
    // VALIDAREA 'PAROLEI'
    // MET. 'COMPARE(PAROLA_TEXT_PLAN, PAROLA_HASH-URATA)' :
    const parolaValida = await bcrypt.compare(req.body.parola, utilizator.parola);

    // DACA 'PAROLA NU ESTE VALIDA' - RETURNAM 'EROAREA 400':
    if (!parolaValida) return res.status(400).send('Email sau parola invalida.');


    // JSON WEB TOKEN (JWT)
    // MET. SEMN'.SIGN({OBIECT_PAYLOAD}, 'CHIE_PRIVATA/SECRETA')'
    const token = jwt.sign({ _id: utilizator._id }, 'ChiePrivataJWT');

    // TRIMTEREA RASPUNSULUI 'TOKEN' CATRE 'CLIENT':
    res.send(token);
});
// ____________________________________________________________________________








// ____________________________________________________________________________
// FUNC. 'VALIDARE(REQUEST)'
// ____________________________________________________________________________
function validare(req) {
    // VALIDARE UTILIZATOR
    // DEF. 'SCHEMEI JOI' = 'OBIECT':
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        parola: Joi.string().min(5).max(255).required()
    };


    // RETURNAREA - APELARI MET. JOI 'VALIDATE()':
    return Joi.validate(req, schema);
};
// ____________________________________________________________________________





// ____________________________________________________________________________
// EXPORTARE 'ROUTER'
// ____________________________________________________________________________
module.exports = router;