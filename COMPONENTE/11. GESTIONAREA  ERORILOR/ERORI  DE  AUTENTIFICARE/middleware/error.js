// ____________________________________________________________________________
// (IMP-1 IMPORTAREA  BIBLIOTECiI 'WINSTON'
//  ('IMPLICIT' ESTE PT. 'LOGAREA' - 'TRANSPORTULUI' IN 'CONSOLA'):
const winston = require('winston');




// ____________________________________________________________________________
// EXPORTAREA FUNC. DE 'GESTIONARE' A 'ERORILOR MIDDLEWARE'  DIN  'EXPRESS'
module.exports = function(err, req, res, next) {
    // (1) APELAM 'WINSTON.LOG(NIVEL_DE_IMPORTANTA_AL_ERORI)'
    // PT. 'AFISAREA ERORI':
    // winston.log('error', err.message);

    // (2) SAU FOLOSIM MET. 'HELPER':
    // winston.error(err.message);

    // (3) PUTEM STOCA SI METADATE 'ERR':
    winston.error(err.message, err);

    // RETURNAM 'RASPUNSULUI' CATRE 'GENuri'
    // EROAREA '500' - 'EROARE INTERNA DE  SERVER'
    res.status(500).send('Ceva a eșuat.');
}