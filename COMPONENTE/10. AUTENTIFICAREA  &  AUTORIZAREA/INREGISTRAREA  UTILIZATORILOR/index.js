// (IMP-2) IMPORTAREA 'JOI'
const Joi = require('joi');

// (IMP-8) IMPORTAREA 'JOI-OBJECTID'
Joi.objectId = require('joi-objectid')(Joi);

const mongoose = require('mongoose');
const genuri = require('./routes/genuri');
const clienti = require('./routes/clienti');
const filme = require('./routes/filme');
const inchirieri = require('./routes/inchirieri');
const utilizatori = require('./routes/utilizatori');
const express = require('express');
const app = express();



// ____________________________________________________________________________
// CONECTAREA  LA  'BAZA DE DATE' - 'MONGODB':
mongoose.connect('mongodb://localhost/video-rent')
    // 'PROMISIUNEA' - IN 'CAZ DE SUCCES':
    .then(() => console.log('Conectat cu succes la Baza de Date MongoDB'))
    // 'PROMISIUNEA' - IN 'CAZ DE EROARE':
    .catch(err => console.error('Nu s-a putut conecta la MongoDB.'));







// ____________________________________________________________________________
// UTILIZARE
app.use(express.json());

// ____________________________________________________________________________
// DELEGAREA RUTEI '/API/GENURI' -> CATRE RUTA 'GENYRI'
app.use('/api/genuri', genuri);

// ____________________________________________________________________________
// DELEGAREA RUTEI '/API/CLIENTI' -> CATRE RUTA 'CLIENTI'
app.use('/api/clienti', clienti);

// ____________________________________________________________________________
// DELEGAREA RUTEI '/API/FILME' -> CATRE RUTA 'FILME'
app.use('/api/filme', filme);

// ____________________________________________________________________________
// DELEGAREA RUTEI '/API/INCHIRIERI' -> CATRE RUTA 'INCHIRIERI'
app.use('/api/inchirieri', inchirieri);

// ____________________________________________________________________________
// DELEGAREA RUTEI '/API/UTILIZATORI' -> CATRE RUTA 'UTILIZATORI'
app.use('/api/utilizatori', utilizatori);







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