/*____________________________________________________________________________
    EXPRESS JS.COM -- Node.js Web Application Framework:
    https://expressjs.com/

    API REFERENCES (VEZI 'METODE' & 'PROPRIETATI'):
    https://expressjs.com/en/5x/api.html
____________________________________________________________________________*/


// ============================================================================
//           INCARI (IMPORTARI)
// ============================================================================
// ____________________________________________________________________________
// IMPORTAREA MODULULUI 'CONFIG'  (PT. 'MG. CONFIGURARII APLICATIEI')
const config = require('config');

// IMPORTAREA MIDLEWARE-ULUI 'MORGAN'  (PT. INREG. 'REQ. HTTP')
const morgan = require('morgan');

// ____________________________________________________________________________
// IMPORTAREA MIDLEWARE-ULUI 'HELMET'  (PT. SETAREA 'HTTP HEARERS')
const helmet = require('helmet');

// ____________________________________________________________________________
// IMPORTAREA PACHETULUI 'JOI'  (PT. 'VALIDAREA INPUT'-URILOR)
const Joi = require('joi');

// ____________________________________________________________________________
// IMPORTARE FISIER 'INREGISTRARE.JS' 
const inregistrare = require('./inregistrare');

// ____________________________________________________________________________
// IMPORTARE FISIER 'AUTENTIFICARE.JS' 
// const autentificare = require('./autentificare');

// ____________________________________________________________________________
// IMPORTAREA MODULULUI 'EXPRESS'
const express = require('express');
const { urlencoded } = require('express');

// ____________________________________________________________________________
// OBIECTUL 'APP' - APELAREA FUNC. 'EXPRESS()'
const app = express();
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
//           UTILIZARI (APELARI)
// ============================================================================
// ____________________________________________________________________________
// ACTIVARE 'PARSAREA' OBIECTULUI 'JSON' PT. CORPUL 'REQUEST'-ULUI  [IMPLICIT = 'DEZACTIVAT']:
app.use(express.json());

// ____________________________________________________________________________
//  FUNCTIA 'MIDDLEWARE BUILT-IN' - 'EXPRESS.URLENCODED()':
app.use(express.urlencoded({ extend: true }));

// ____________________________________________________________________________
//  FUNCTIA 'MIDDLEWARE BUILT-IN' - 'EXPRESS.STATIC('NUME_FOLDER')'
//  (IN FOLDERUL 'PUBLIC' PLASAM ASSET-URILE  STATICE 'CSS', 'IMG'):
app.use(express.static('public'));

// ____________________________________________________________________________
//  APELAREA 'MIDDLEWARE'-ULUI (BUILT-IN) - 'HELMET'
app.use(helmet());



// ____________________________________________________________________________
//   CONFIGURARE
// ____________________________________________________________________________
//  AFISARE - MET. 'CONGIG.GET('NUMELE_PROP_DE_CONFIG')':
console.log('Nume Aplicatie: ' + config.get('nume'));
console.log('Server de Mail: ' + config.get('mail.host'));
console.log('Parola de Mail: ' + config.get('mail.parola'));



// ____________________________________________________________________________
// 'ACTIVAREA  MIDDLEWARE-ULUI' - 'MORGAN' PT. 'MEDIUL DE DEZVOLTARE':
// ____________________________________________________________________________
if (app.get('env') === 'development') {

    // ____________________________________________________________________________
    //  UTILIZAREA / APELAREA 'MIDDLEWARE'-ULUI (BUILT-IN) - 'MORGAN('OPT)'
    app.use(morgan('tiny'));

    // AFISARE IN CONSOLA:
    console.log('Morgan Activat...');
}
// ============================================================================











// ============================================================================
//    'FUNCTII  MIDDLEWARE PERSONALIZATE'
// ============================================================================
// ____________________________________________________________________________
//  (MW1) CTREARE  FUNCTIE 'MIDDLEWARE PERSONALIZATA' - PT. 'CONECTARE'
// ____________________________________________________________________________
app.use(inregistrare);

// ____________________________________________________________________________
//  (MW2) CTREARE  FUNCTIE 'MIDDLEWARE PERSONALIZATA' - PT. 'REALIZAREA AUTENTIFICARII'
// ____________________________________________________________________________
// app.use(autentificare);
// ============================================================================




// MATRICE DE OBIECTE:
const cursuri = [
    { id: 1, nume: 'Curs 1' },
    { id: 2, nume: 'Curs 2' },
    { id: 3, nume: 'Curs 3' }
];




// ============================================================================
//    (I) 'HTTP GET REQUEST' PT. 'PRELUAREA  DATELOR DIN DB/MATRICE'
// ============================================================================
// ____________________________________________________________________________
// RUTA 1.1: '/'
// MET. 'GET(URL, CALLBACK_FUNC(REQ, RES))' 
// (PT. DEFINIREA 'RUTEI')
// FUNCTIA 'CALLBACK' MAI ESTE DEN. 'MANIPULATOR DE TRASEU/RUTE'
app.get('/', (req, res) => {
    // RASPUNSUL:
    res.send('Salut Lume!!!');
});


// ____________________________________________________________________________
// RUTA 1.2: '/API/CURSURI'
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
//    (II) 'HTTP POST REQUEST' PT. 'CREAREA DATELOR NOI DIN DB/MATRICE'
// ============================================================================
// ____________________________________________________________________________
// RUTA 2: '/API/CURSURI'
// MET. 'POST(URL, CALLBACK_FUNC(REQ, RES))' 
app.post('/api/cursuri', (req, res) => {

    // DEF. 'SCHEMEI' = 'OBIECT':
    // const schema = {
    //     nume: Joi.string().min(3).required()
    // };

    // APELAREA MET. 'VALIDATE()':
    // const rezultat = Joi.validate(req.body, schema);

    // AFISAREA REZULTATULUI:
    // console.log(rezultat);

    // PRELUAREA OBIECTULUI 'CURS' - PRIN APELAREA MET. 'FIND(FUNCTIA_SAGEATA)':
    // const curs = cursuri.find(c => c.id === parseInt(req.params.id))

    // DACA 'NU EXISTA CURSUL' PT. UN 'ID' DAT:
    // if (!curs)
    //     res.status(404).send('Oiectul nu a fost gasit!');

    // LOGICA DE VALIDARE A 'INPUT'-URILOR:
    // DACA NU EXISTA PROP. 'REQ.BODY.NUME' SAU ESTE 'MAI MICA DE 3':
    // if (!req.body.nume || !req.body.nume.length < 3) {
    // RETURNAM 'EROAREA CU STATREA - 400' CATRE 'CLIENT' & TRIMITEM UN 'MESAJ':
    // res.status(400).send('Numele este obligatoriu și trebuie să aibă minimum 3 caractere.');
    //     return;
    // }


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


    // ADAUGAM OBIECTUL 'CURS' -> IN MATRICEA 'CURSURI':
    cursuri.push(curs);

    // RETURNAREA 'OBIECTULUI  CREAT' IN 'CORPUL RESPONSE':
    res.send(curs);
});
// ============================================================================






// ============================================================================
//    (IiI) 'HTTP PUT REQUEST' PT. 'UPGRADAREA  ELEMENTELOR  DIN  DB/MATRICE'
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
//    (IV) 'HTTP DELETE REQUEST' PT. 'STERGEREA  ELEMENTELOR  DIN  DB/MATRICE'
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