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
    res.send('Salut Lume');
});


// RUTA 2: '/'
app.get('/api/cursuri', (req, res) => {
    // RASPUNSUL - MATRICE DE NUMERE:
    res.send([1, 2, 3]);
});


// MET. 'LISTEN(NR_PORT, CALLBACK FUNC*())' 
// ASCULTAREA 'PORTULUI 3000':
app.listen(3000, () => {
    // AFISARE
    console.log('Port de Ascultare 3000');
});