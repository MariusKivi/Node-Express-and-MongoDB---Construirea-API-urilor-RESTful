// (IMP-12 IMPORTAREA  BIBLIOTECiI 'WINSTON'
//  ('IMPLICIT' ESTE PT. 'LOGAREA' - 'TRANSPORTULUI' IN 'CONSOLA'):
const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');



// EXPORTAM FUNCTIA ANONIMA:
module.exports = function() {

    // CONSTANTA 'DB':
    const db = config.get('db');

    // CONECTAREA DINAMICA LA  'BAZA DE DATE' - 'MONGODB'
    // BAZATA PE 'ENVIRONMENT'-UL IN CARE APLICATIA 'RULEAZA':
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
        // 'PROMISIUNE' - IN 'CAZ DE SUCCES':
        // .then(() => console.log('Conectat cu succes la Baza de Date MongoDB'))
        .then(() => winston.info(`Conectat cu succes la ${db}...`));
}