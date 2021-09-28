// IMPORTARE 'EXPRESS':
const express = require('express');

// IMPORTAREA 'RUTELOR':
const genuri = require('../routes/genuri');
const clienti = require('../routes/clienti');
const filme = require('../routes/filme');
const inchirieri = require('../routes/inchirieri');
const utilizatori = require('../routes/utilizatori');
const autentificare = require('../routes/autentificare');

// IMPORTAREA  MODULULUI 'ERROR':
const error = require('../middleware/error');




// EXPORTAM FUNCTIA ANONIMA:
module.exports = function(app) {


    // UTILIZARE
    app.use(express.json(app));

    // DELEGAREA RUTEI '/API/GENURI' -> CATRE RUTA 'GENYRI'
    app.use('/api/genuri', genuri);

    // DELEGAREA RUTEI '/API/CLIENTI' -> CATRE RUTA 'CLIENTI'
    app.use('/api/clienti', clienti);

    // DELEGAREA RUTEI '/API/FILME' -> CATRE RUTA 'FILME'
    app.use('/api/filme', filme);

    // DELEGAREA RUTEI '/API/INCHIRIERI' -> CATRE RUTA 'INCHIRIERI'
    app.use('/api/inchirieri', inchirieri);

    // DELEGAREA RUTEI '/API/UTILIZATORI' -> CATRE RUTA 'UTILIZATORI'
    app.use('/api/utilizatori', utilizatori);

    // DELEGAREA RUTEI '/API/AUTENTIFICARE' -> CATRE RUTA 'AUTENTIFICARE'
    app.use('/api/autentificare', autentificare);


    // UTILIZAREA - FUNC 'MIDDLEWARE ERROR' PRIN 'REFERINTA':
    app.use(error);
}