/*____________________________________________________________________________
    EXPRESS JS.COM -- Node.js Web Application Framework:
    https://expressjs.com/

    API REFERENCES (VEZI 'METODE' & 'PROPRIETATI'):
    https://expressjs.com/en/5x/api.html
____________________________________________________________________________*/


// ============================================================================
//          (I) INCARI (IMPORTARI)
// ============================================================================
// ____________________________________________________________________________
// (IMP-9) IMPORTAREA PACHETULUI 'DEBUG'  (PT. 'DEPANAREA  APLICATIEI')
// ____________________________________________________________________________
// (DEP.1) DEPANAREA 'LA PORNIURE':
// const depanareLaPornire = require('debug')('app:pornire');
const debug = require('debug')('app:debug');

// (DEP.2) 'MESAJE DE DEPANARE' -> LEGATE DE 'BAZA DE DATE'
// const depanareDB = require('debug')('app:DB');


// (IMP-8) IMPORTAREA MODULULUI 'CONFIG'  (PT. 'MG. CONFIGURARII APLICATIEI')
const config = require('config');

// (IMP-7) IMPORTAREA MIDLEWARE-ULUI 'MORGAN'  (PT. INREG. 'REQ. HTTP')
const morgan = require('morgan');

// ____________________________________________________________________________
// (IMP-6) IMPORTAREA MIDLEWARE-ULUI 'HELMET'  (PT. SETAREA 'HTTP HEARERS')
const helmet = require('helmet');

// ____________________________________________________________________________
// (IMP-5) IMPORTAREA PACHETULUI 'JOI'  (PT. 'VALIDAREA INPUT'-URILOR)
const Joi = require('joi');

// ____________________________________________________________________________
// (IMP-4) IMPORTARE FISIER 'INREGISTRARE.JS' 
const inregistrare = require('./inregistrare');

// ____________________________________________________________________________
// (IMP-3) IMPORTARE FISIER 'AUTENTIFICARE.JS' 
// const autentificare = require('./autentificare');

// ____________________________________________________________________________
// (IMP-1) IMPORTAREA MODULULUI 'EXPRESS'
const express = require('express');
// const { urlencoded } = require('express');

// ____________________________________________________________________________
// (IMP-2) OBIECTUL 'APP' - APELAREA FUNC. 'EXPRESS()'
const app = express();
// ============================================================================







// ============================================================================
//           (II) SETAREA & INCARCAREA
// ============================================================================
// ____________________________________________________________________________
// (SET-1) SETAREA 'TEMPLATE/VIEW  ENGINE' PT. 'APLICATIE'
// ____________________________________________________________________________
// METODA 'SET('NUME_PROP', 'NUMELE_tEMPLATE_ENGINE')'
// (>> EXPRES VA 'INCARCA INTERN' MODULUL 'PUG' & NU TREBUIE 'IMPORTAT' PRIN'REQUIRE')
app.set('view engine', 'pug');


// ____________________________________________________________________________
// (SET-2) SETARE PT. 'SUPRASCRIEREA' TRECERI CATRE UN 'TEMPLATE' PT. 'APLICATIE'
// ____________________________________________________________________________
// METODA 'SET('NUME_PROP', 'VALOAREA_ESTE_LOCUL_IN_CARE_STOCAM_TEMPLETE-UL')'
app.set('views', './views');
// ============================================================================







// ============================================================================
// ACTIVAREA 'HTTP REQUEST' PT. 'INREGISTRAREA' IN 'MEDIUL  DE  DEZVOLTARE'
//  PRIN VARIABILA  GLOBALAa 'NODE_ENV'
//  DACA NU ESTE 'SETATA' = RASPUNSUL VA FI 'UNDEFINE'
// ============================================================================
// DEFINIM 'TEMPLATE STRING' (PRIN CARACTERUL 'BACKTICK')
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);


// ============================================================================
// ACTIVAREA 'HTTP REQUEST' PT. 'INREGISTRAREA' IN 'MEDIUL  DE  DEZVOLTARE'
// PRIN  METODA  OBIECTULUI  'APP.GET()'
// DACA VARIABILA 'ENV' NU ESTE 'SETATA' = VA RETURNA IMPLICIT 'MEDIUL DE DEVELOPMENT'
// ============================================================================
// DEFINIM 'TEMPLATE STRING' (PRIN CARACTERUL 'BACKTICK')
// console.log(`app: ${app.get('env')}`);







// ============================================================================
//           (III) UTILIZARI (APELARI)
// ============================================================================
// ____________________________________________________________________________
// (USE-1) ACTIVARE 'PARSAREA' OBIECTULUI 'JSON' PT. CORPUL 'REQUEST'-ULUI  [IMPLICIT = 'DEZACTIVAT']:
app.use(express.json());

// ____________________________________________________________________________
//  (USE-2) FUNCTIA 'MIDDLEWARE BUILT-IN' - 'EXPRESS.URLENCODED()':
app.use(express.urlencoded({ extend: true }));

// ____________________________________________________________________________
//  (USE-3) FUNCTIA 'MIDDLEWARE BUILT-IN' - 'EXPRESS.STATIC('NUME_FOLDER')'
//  (IN FOLDERUL 'PUBLIC' PLASAM ASSET-URILE  STATICE 'CSS', 'IMG'):
app.use(express.static('public'));

// ____________________________________________________________________________
//  (USE-4) APELAREA 'MIDDLEWARE'-ULUI (BUILT-IN) - 'HELMET'
app.use(helmet());



// ____________________________________________________________________________
//   CONFIGURARE
// ____________________________________________________________________________
// (CFG-1) AFISARE - MET. 'CONGIG.GET('NUMELE_PROP_DE_CONFIG')':
console.log('Nume Aplicatie: ' + config.get('nume'));
console.log('Server de Mail: ' + config.get('mail.host'));
console.log('Parola de Mail: ' + config.get('mail.parola'));


// ____________________________________________________________________________
// 'ACTIVAREA  MIDDLEWARE-ULUI' - 'MORGAN' PT. 'MEDIUL DE DEZVOLTARE':
// ____________________________________________________________________________
if (app.get('env') === 'development') {

    // ____________________________________________________________________________
    //  (USE-5) UTILIZAREA / APELAREA 'MIDDLEWARE'-ULUI (BUILT-IN) - 'MORGAN('OPT)'
    app.use(morgan('tiny'));

    // AFISARE IN CONSOLA:
    console.log('Morgan Activat...');

    // AFISAREA  PRIN PACHETUL 'DEBUG'
    debug('Morgan Activat...');
}



// ____________________________________________________________________________
//    'FUNCTII  MIDDLEWARE PERSONALIZATE'
// ____________________________________________________________________________
//  (MW-1) CTREARE  FUNCTIE 'MIDDLEWARE PERSONALIZATA' - PT. 'CONECTARE'
// ____________________________________________________________________________
app.use(inregistrare);

// ____________________________________________________________________________
//  (MW-2) CTREARE  FUNCTIE 'MIDDLEWARE PERSONALIZATA' - PT. 'REALIZAREA AUTENTIFICARII'
// ____________________________________________________________________________
// app.use(autentificare);

// ============================================================================







// ============================================================================
//      (IV) 'BAZA  DE  DATE' CU  'INFORMATII' PENTRU  'DEPANARE'
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
//      (V) 'HTTP GET REQUEST' PT. 'PRELUAREA  DATELOR DIN DB/MATRICE'
// ============================================================================
// ____________________________________________________________________________
// RUTA 1.1: '/'
// ____________________________________________________________________________
// MET. 'GET(URL, CALLBACK_FUNC(REQ, RES))' 
// (PT. DEFINIREA 'RUTEI')
// FUNCTIA 'CALLBACK' MAI ESTE DEN. 'MANIPULATOR DE TRASEU/RUTE'
app.get('/', (req, res) => {
    // RASPUNSUL - PRIN 'PUG TEMPLATE ENGINE':
    // MET. 'RENDER('NUMELE_FISIERULUI.PUG_TEMPLATE', {VAPORI_ALE_PARAMS_DIN_TEMPLATE})'
    res.render('index', { titlu: 'Aplicatia Mea Express', mesaj: 'Va saluta Marius!' });
});



// ____________________________________________________________________________
// RUTA 1.2: '/API/CURSURI'
// ____________________________________________________________________________
app.get('/api/cursuri', (req, res) => {
    // RASPUNSUL - MATRICE DE OBIECTE:
    res.send(cursuri);
});



// ____________________________________________________________________________
// RUTA 1.3 - 'PRELUAREA'  UNUI 'SINGUR CURS' - PRIN PARAMETRUL ':ID'
app.get('/api/cursuri/:id', (req, res) => {
    // PRELUAREA OBIECTULUI 'CURS' - PRIN APELAREA MET. 'FIND(FUNCTIA_SAGEATA)':
    const curs = cursuri.find(c => c.id === parseInt(req.params.id))

    // DACA 'NU EXISTA CURSUL' PT. UN 'ID' DAT:
    if (!curs)
        return res.status(404).send('Oiectul nu a fost gasit!');
    res.send(curs);
});



// ____________________________________________________________________________
// RUTA 1.4 - 'PRELUAREA' A 'MAI MULTOR PARAMETRIIS' 
// app.get('/api/posts/:year/:month', (req, res) => {
// RASPUNSUL - cu  "CITIREA MAI MULTOR PARAMETRI":
//     res.send(req.params);
// });



// ____________________________________________________________________________
// RUTA 1.5 - 'PRELUAREA' - PARAMETRILOR 'QUERY  STRING':
// app.get('/api/posts/:year/:month', (req, res) => {
// RASPUNSUL - cu  "CITIREA 'PARAMETRILOR QUERY  STRING'":
//     res.send(req.query);
// });
// ===================================================================







// ============================================================================
//    (VI) 'HTTP POST REQUEST' PT. 'CREAREA DATELOR NOI DIN DB/MATRICE'
// ============================================================================
// ____________________________________________________________________________
// RUTA 2: '/API/CURSURI'
// MET. 'POST(URL, CALLBACK_FUNC(REQ, RES))' 
app.post('/api/cursuri', (req, res) => {

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
// ============================================================================






// ============================================================================
//    (ViI) 'HTTP PUT REQUEST' PT. 'UPGRADAREA  ELEMENTELOR  DIN  DB/MATRICE'
// ============================================================================
// RUTA 3: '/API/CURSURI/:ID'
// MET. 'PUT(URL, CALLBACK_FUNC(REQ, RES))' 
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





// ============================================================================
//    (VIII) 'HTTP DELETE REQUEST' PT. 'STERGEREA  ELEMENTELOR  DIN  DB/MATRICE'
// ============================================================================
// RUTA 4: '/API/CURSURI/:ID'
// MET. 'DELETE(URL, CALLBACK_FUNC(REQ, RES))' 
app.delete('/api/cursuri/:id', (req, res) => {

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
// ============================================================================





// ____________________________________________________________________________
//   FUNC. 'VALIDARE CURS()'
// ____________________________________________________________________________
function validareCurs(curs) {
    // LOGICA: VALIDARE CURS
    // DEF. 'SCHEMEI' = 'OBIECT':
    const schema = {
        nume: Joi.string().min(3).required()
    };

    // RETURNAREA - APELAREA MET. 'VALIDATE()':
    return Joi.validate(curs, schema);
};
// ____________________________________________________________________________




// ____________________________________________________________________________
// VARIABILA 'ENVIRONMENT' - 'PORT'  SAu  PORTUL '3000':
// (IN OBIECTUL GLOBAL 'PROCESS', IN PROP. 'ENV')
const port = process.env.PORT || 3000;



// ____________________________________________________________________________
// MET. 'LISTEN(NR_PORT, CALLBACK FUNC*())' 
// ASCULTAREA 'VARIABILEI ENVIRONMENT':
app.listen(port, () => {
    // 'TEMPLATE  STRING' (PRIN UTIL. 'BACKTICK')
    console.log(`Port de Ascultare ${port}...`);
});