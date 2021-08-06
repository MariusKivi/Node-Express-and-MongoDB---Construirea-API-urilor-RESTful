// ===============================================================
//  pr. - construirea  'api'-urilor  'restful' cu 'express'
// ===============================================================

/*
    NB!

        Deci, în Această Secțiune, am Aflat că:
            - REST -> Definește un Set de Convenții pentru Crearea Serviciilor HTTP:
            - POST: -> pentru a Crea o Resursă
            - PUT: -> pentru a Actualiza Resursa
            - GET: -> pentru a Citi Resursa
            - DELETE: -> pentru a Sterge Resursa
            - Express -> este un Cadru Simplu, Minimalist și Ușor pentru Construirea Web
        Servere.

*/



// ____________________________________________________________________________
// IMPORTAREA MODULULUI 'EXPRESS'
const express = require('express');

// ____________________________________________________________________________
// OBIECTUL 'APP' - APELAREA FUNC. 'EXPRESS()'
const app = express();




// ============================================================================
//    (I) CREAREA  UNUI 'CURS'
// ============================================================================
// ____________________________________________________________________________
// RUTA 1: '/API/CURSURI'
// MET. 'POST(URL, CALLBACK_FUNC(REQ, RES))' 
app.post('/api/cursuri', (req, res) => {
    // RETURNAREA 'OBIECTULUI  CREAT' IN 'CORPUL RESPONSE':
    res.send(curs);
});
// ============================================================================



// ============================================================================
//    (II) PRELUAREA  TUTUROR CURSURILOR
// ============================================================================
// ____________________________________________________________________________
// RUTA 1.2: '/API/CURSURI'
app.get('/api/cursuri', (req, res) => {

    // PT. A 'CITI' PARAMETRII 'SIRULUI  DE  INTEROGARE'
    const sortBy = req.query.sortBy;

    // RASPUNSUL - MATRICE DE OBIECTE:
    res.send(cursuri);
});



// ____________________________________________________________________________
// RUTA 1.3 - 'PRELUAREA'  UNUI 'SINGUR CURS' - PRIN PARAMETRUL ':ID'
app.get('/api/cursuri/:id', (req, res) => {

    const idCurs = req.params.id;


    // DACA 'NU EXISTA CURSUL' PT. UN 'ID' DAT:
    return res.status(404).send('Cursul nu a fost gasit!');
    res.send(curs);
});





// ============================================================================
//    (IiI) UPGRADAREA UNUI CURS
// ============================================================================
app.put('/api/cursuri/:id', (req, res) => {

    // LOGICA: CAUTAM 'CURSUL'
    // PRELUAREA OBIECTULUI 'CURS' - PRIN APELAREA MET. 'FIND(FUNCTIA_SAGEATA)':
    const curs = cursuri.find(c => c.id === parseInt(req.params.id))

    // LOGICA: DACA 'CURSUL NU EXISTA' -> RETURNAM '404' (RESURSA NU A FOST GASITA)
    // DACA 'NU EXISTA CURSUL' PT. UN 'ID' DAT:
    if (!curs)
        return res.status(404).send('Oiectul nu a fost gasit!');


    // APELAREA FUNC. 'VALIDARECURS'
    // const rezultat = validareCurs(req.body);

    // DESTRUCTURAREA OBIECTELOR - APELAREA FUNC. 'VALIDARECURS'
    const { error } = validareCurs(req.body);

    // LOGICA:  DACA 'CURSUL ESTE INVALID' -> RETURNAM '400' (CERERE ERONATA)
    // VERIFICAREA VALOAREI 'REZULTAT' -> A PROP. 'ERROR'
    if (error)
    //  RETURNAM 'EROAREA CU STATREA - 400' CATRE 'CLIENT':
        return res.status(400).send(error.details[0].message);

    // LOGICA: UPDGRADARE CURS:
    curs.nume = req.body.nume;

    // LOGICA: RETURNARE 'CURSULUI UPGRADAT' CLIENTULUI:
    res.send(curs);
});
// ============================================================================