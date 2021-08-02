/*____________________________________________________________________________
    EXPRESS JS.COM -- Node.js Web Application Framework:
    https://expressjs.com/

    API REFERENCES (VEZI 'METODE' & 'PROPRIETATI'):
    https://expressjs.com/en/5x/api.html
____________________________________________________________________________*/



// ____________________________________________________________________________
// IMPORTAREA PACHETULUI 'JOI'  (PT. 'VALIDAREA INPUT'-URILOR)
const Joi = require('joi');

// ____________________________________________________________________________
// IMPORTAREA MODULULUI 'EXPRESS'
const express = require('express');

// ____________________________________________________________________________
// OBIECTUL 'APP' - APELAREA FUNC. 'EXPRESS()'
const app = express();


// ____________________________________________________________________________
// ACTIVARE 'PARSAREA' OBIECTULUI 'JSON' PT. CORPUL 'REQUEST'-ULUI  [IMPLICIT = 'DEZACTIVAT']:
app.use(express.json());



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
        res.status(404).send('Oiectul nu a fost gasit!');
    res.send(curs);
});



// ____________________________________________________________________________
// RUTA 1.4 - 'PRELUAREA' A 'MAI MULTOR PARAMETRIIS' 
// app.get('/api/posts/:year/:month', (req, res) => {
//     // RASPUNSUL - cu  "CITIREA MAI MULTOR PARAMETRI":
//     res.send(req.params);
// });



// ____________________________________________________________________________
// RUTA 1.5 - 'PRELUAREA' - PARAMETRILOR 'QUERY  STRING':
// app.get('/api/posts/:year/:month', (req, res) => {
//     // RASPUNSUL - cu  "CITIREA 'PARAMETRILOR QUERY  STRING'":
//     res.send(req.query);
// });
// ===================================================================






// ============================================================================
//    (II) 'HTTP POST REQUEST' PT. 'CREAREA DATELOR NOI DIN DB/MATRICE'
// ============================================================================

// ____________________________________________________________________________
// RUTA 2.1: '/API/CURSURI'
// MET. 'POST(URL, CALLBACK_FUNC(REQ, RES))' 
app.post('/api/cursuri', (req, res) => {

    // DEF. 'SCHEMEI' = 'OBIECT':
    const schema = {
        nume: Joi.string().min(3).required()
    };

    // APELAREA MET. 'VALIDATE()':
    const rezultat = Joi.validate(req.body, schema);

    // AFISAREA REZULTATULUI:
    // console.log(rezultat);


    // LOGICA DE VALIDARE A 'INPUT'-URILOR:
    // DACA NU EXISTA PROP. 'REQ.BODY.NUME' SAU ESTE 'MAI MICA DE 3':
    // if (!req.body.nume || !req.body.nume.length < 3) {
    //     // RETURNAM 'EROAREA CU STATREA - 400' CATRE 'CLIENT' & TRIMITEM UN 'MESAJ':
    //     res.status(400).send('Numele este obligatoriu și trebuie să aibă minimum 3 caractere.');
    //     return;
    // }


    // VERIFICAREA VALOAREI 'REZULTAT' -> A PROP. 'ERROR'
    if (rezultat.error) {
        // RETURNAM 'EROAREA CU STATREA - 400' CATRE 'CLIENT':
        // res.status(400).send(rezultat.error);
        res.status(400).send(rezultat.error.details[0].message);
        return;
    }


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