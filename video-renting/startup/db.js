// (IMP-12 IMPORTAREA  BIBLIOTECiI 'WINSTON'
//  ('IMPLICIT' ESTE PT. 'LOGAREA' - 'TRANSPORTULUI' IN 'CONSOLA'):
const winston = require('winston');
const mongoose = require('mongoose');



// EXPORTAM FUNCTIA ANONIMA:
module.exports = function() {

    // CONECTAREA  LA  'BAZA DE DATE' - 'MONGODB':
    mongoose.connect('mongodb://localhost/video-renting', { useNewUrlParser: true, useUnifiedTopology: true })
    A // 'PROMISIUNE' - IN 'CAZ DE SUCCES':
    // .then(() => console.log('Conectat cu succes la Baza de Date MongoDB'))
        .then(() => winston.info('Conectat cu succes la Baza de Date MongoDB'));
    // 'PROMISIUNEA' - IN 'CAZ DE EROARE':
    // .catch(err => console.error('Nu s-a putut conecta la MongoDB.'));
}