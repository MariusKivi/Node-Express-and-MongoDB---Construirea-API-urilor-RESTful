/*
    EXPRESS JS.COM -- Node.js Web Application Framework:
    https://expressjs.com/

    API REFERENCES (VEZI 'METODE' & 'PROPRIETATI'):
    https://expressjs.com/en/5x/api.html
*/

// IMPORTAREA MODULULUI 'EXPRESS'
const express = require('express');

// APELAREA FUNC. 'EXPRESS()'
const app = express();

// RUTA 1: '/'
// MET. 'GET(URL, CALLBACK_FUNC(REQ, RES))' 
// (PT. DEFINIREA 'RUTEI')
// FUNCTIA 'CALLBACK' MAI ESTE DEN. 'MANIPULATOR DE TRASEU/RUTE'
app.get('/', (req, res) => {
    // RASPUNSUL:
    res.send('Salut Lume!!!');
});


// RUTA 2: '/'
app.get('/api/cursuri', (req, res) => {
    // RASPUNSUL - MATRICE DE NUMERE:
    res.send([1, 2, 3]);
});


// RUTA 3 - 'PRELUAREA'  UNUI 'SINGUR CURS' - PRIN PARAMETRUL ':ID'
app.get('/api/cursuri/:id', (req, res) => {
    // RASPUNSUL - cu  "CITIREA PARAMETRULUI 'ID'":
    res.send(req.params.id);
});


// RUTA 4 - 'PRELUAREA' A 'MAI MULTOR PARAMETRIIS' 
// app.get('/api/posts/:year/:month', (req, res) => {
//     // RASPUNSUL - cu  "CITIREA MAI MULTOR PARAMETRI":
//     res.send(req.params);
// });



// RUTA 5 - 'PRELUAREA' - PARAMETRILOR 'QUERY  STRING':
app.get('/api/posts/:year/:month', (req, res) => {
    // RASPUNSUL - cu  "CITIREA 'PARAMETRILOR QUERY  STRING'":
    res.send(req.query);
});


// VARIABILA 'ENVIRONMENT' - 'PORT'  SAu  PORTUL '3000':
// (IN OBIECTUL GLOBAL 'PROCESS', IN PROP. 'ENV')
const port = process.env.PORT || 3000;


// MET. 'LISTEN(NR_PORT, CALLBACK FUNC*())' 
// ASCULTAREA 'VARIABILEI ENVIRONMENT':
app.listen(port, () => {
    // 'TEMPLATE  STRING' (PRIN UTIL. 'BACKTICK')
    console.log(`Port de Ascultare ${port}...`);
});