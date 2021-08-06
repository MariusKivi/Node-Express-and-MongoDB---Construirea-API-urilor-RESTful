// ============================================================================
//          (I) INCARI (IMPORTARI)
// ============================================================================
// ____________________________________________________________________________
// (IMP-1) IMPORTAREA MODULULUI 'EXPRESS'
const express = require('express');

// ____________________________________________________________________________
// (IMP-2) OBIECTUL 'ROUTER' - APELAREA FUNC. 'EXPRESS.RIUTER()'
const router = express.Router();
// ============================================================================








// ============================================================================
//      (II)  'BAZA  DE  DATE' CU  'INFORMATII' PENTRU  'DEPANARE'
// ============================================================================
// UTILIZAREA -  'MESAJELOR  DE  DEPANARI' -> LEGATE DE 'BAZA DE DATE'
// depanareDB('Conectat la Baza de Date')



// MATRICE DE OBIECTE:
const cursuri = [
    { id: 1, nume: 'Curs 1' },
    { id: 2, nume: 'Curs 2' },
    { id: 3, nume: 'Curs 3' }
];
// ============================================================================







// ============================================================================
//      (III) 'HTTP GET REQUEST' PT. 'PRELUAREA  DATELOR DIN DB/MATRICE'
// ============================================================================
// ---------------------------------------------------------------------------------
//      (GET) 'HTTP GET REQUEST' PT. 'PRELUAREA  DATELOR DIN DB/MATRICE'
// ---------------------------------------------------------------------------------
// ____________________________________________________________________________
// RUTA 1.1: '/API/CURSURI'
// ____________________________________________________________________________
router.get('/', (req, res) => {
    // RASPUNSUL - MATRICE DE OBIECTE:
    res.send(cursuri);
});



// ____________________________________________________________________________
// RUTA 1.2 - 'PRELUAREA'  UNUI 'SINGUR CURS' - PRIN PARAMETRUL ':ID'
router.get('/:id', (req, res) => {
    // PRELUAREA OBIECTULUI 'CURS' - PRIN APELAREA MET. 'FIND(FUNCTIA_SAGEATA)':
    const curs = cursuri.find(c => c.id === parseInt(req.params.id))

    // DACA 'NU EXISTA CURSUL' PT. UN 'ID' DAT:
    if (!curs)
        return res.status(404).send('Oiectul nu a fost gasit!');
    res.send(curs);
});



// ____________________________________________________________________________
// RUTA 1.3 - 'PRELUAREA' A 'MAI MULTOR PARAMETRIIS' 
// app.get('/api/posts/:year/:month', (req, res) => {
// RASPUNSUL - cu  "CITIREA MAI MULTOR PARAMETRI":
//     res.send(req.params);
// });



// ____________________________________________________________________________
// RUTA 1.4 - 'PRELUAREA' - PARAMETRILOR 'QUERY  STRING':
// app.get('/api/posts/:year/:month', (req, res) => {
// RASPUNSUL - cu  "CITIREA 'PARAMETRILOR QUERY  STRING'":
//     res.send(req.query);
// });
// ---------------------------------------------------------------------------------







// ---------------------------------------------------------------------------------
//    (POST) 'HTTP POST REQUEST' PT. 'CREAREA DATELOR NOI DIN DB/MATRICE'
// ---------------------------------------------------------------------------------
// ____________________________________________________________________________
// RUTA 2: '/API/CURSURI'
// MET. 'POST(URL, CALLBACK_FUNC(REQ, RES))' 
router.post('/', (req, res) => {

    // DESTRUCTURAREA OBIECTELOR - APELAREA FUNC. 'VALIDARECURS'
    const { error } = validareCurs(req.body);

    // LOGICA:  DACA 'CURSUL ESTE INVALID' -> RETURNAM '400' (CERERE ERONATA)
    // VERIFICAREA VALOAREI 'REZULTAT' -> A PROP. 'ERROR'
    if (error)
    //  RETURNAM 'EROAREA CU STATREA - 400' CATRE 'CLIENT':
        return res.status(400).send(error.details[0].message);


    // OBIECTUL 'CURS':
    const curs = {
        // CREARE 'OBIECT NOU' = 'CURS':
        id: cursuri.length + 1,

        // CITIREA OBIECTULUI 'CURS' DIN 'CORPUL REQUEST'-ULUI:
        nume: req.body.nume
    };


    //     // ADAUGAM OBIECTUL 'CURS' -> IN MATRICEA 'CURSURI':
    cursuri.push(curs);

    // RETURNAREA 'OBIECTULUI  CREAT' IN 'CORPUL RESPONSE':
    res.send(curs);
});
// ---------------------------------------------------------------------------------






// ---------------------------------------------------------------------------------
//    (PUT) 'HTTP PUT REQUEST' PT. 'UPGRADAREA  ELEMENTELOR  DIN  DB/MATRICE'
// ---------------------------------------------------------------------------------
// RUTA 3: '/API/CURSURI/:ID'
// MET. 'PUT(URL, CALLBACK_FUNC(REQ, RES))' 
router.put('/:id', (req, res) => {

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
// ---------------------------------------------------------------------------------





// ---------------------------------------------------------------------------------
//    (DELETE) 'HTTP DELETE REQUEST' PT. 'STERGEREA  ELEMENTELOR  DIN  DB/MATRICE'
// ---------------------------------------------------------------------------------
// RUTA 4: '/API/CURSURI/:ID'
// MET. 'DELETE(URL, CALLBACK_FUNC(REQ, RES))' 
router.delete('/:id', (req, res) => {

    // LOGICA '1.1': 'CAUTAM ELEMENTUL' DUPA UN 'ID' DAT
    // PRELUAREA OBIECTULUI 'CURS' - PRIN APELAREA MET. 'FIND(FUNCTIA_SAGEATA)':
    const curs = cursuri.find(c => c.id === parseInt(req.params.id))

    // LOGICA '1.2': DACA 'ELEMENTUL CAUTAT' NU EXISTA - RETURNAM EROAREA '404'
    // DACA 'NU EXISTA CURSUL' PT. UN 'ID' DAT:
    if (!curs)
        return res.status(404).send('Oiectul nu a fost gasit!');


    // LOGICA '2.1': DACA 'ELEMENTUL CAUTAT' EXISTA - IL 'STERGEM'
    // GASIREA 'INDEX'-ULUI 'CURSULUI' -> IN mATRICEAA 'CURSURI'
    const index = cursuri.indexOf(curs);

    // UTILIZAREA METODEI 'SPLICE()'  (PT. 'ELIMINAREA' UNUI 'OBIECT' DIN 'MATRICE')
    cursuri.splice(index, 1);


    // LOGICA '2.2': RETURNAM 'RASPUNSULUI' CATRE 'CLIENT'
    res.send(curs);

});
// ---------------------------------------------------------------------------------
// ============================================================================





// ============================================================================
//     (V) FUNC. 'VALIDARE CURS()'
// ============================================================================
function validareCurs(curs) {
    // LOGICA: VALIDARE CURS
    // DEF. 'SCHEMEI' = 'OBIECT':
    const schema = {
        nume: Joi.string().min(3).required()
    };

    // RETURNAREA - APELAREA MET. 'VALIDATE()':
    return Joi.validate(curs, schema);
};
// ============================================================================



// ============================================================================
//    (VI) EXPORTARE 'ROUTER'
// ============================================================================
module.exports = router;
// ============================================================================