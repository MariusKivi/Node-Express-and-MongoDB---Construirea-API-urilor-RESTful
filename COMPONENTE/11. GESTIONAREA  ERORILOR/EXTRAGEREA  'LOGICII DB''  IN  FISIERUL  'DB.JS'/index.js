// (IMP-11 IMPORTAREA  MODULULUI 'EXPRESS-ASYNC-ERRORS':
require('express-async-errors');

// (IMP-12 IMPORTAREA  BIBLIOTECiI 'WINSTON'
//  ('IMPLICIT' ESTE PT. 'LOGAREA' - 'TRANSPORTULUI' IN 'CONSOLA'):
const winston = require('winston');

// (IMP-13 IMPORTAREA  BIBLIOTECiI 'WINSTON-MONGODB'
//'T 'INREGISTRAREA MESAJELOR' IN 'MONGODB':
require('winston-mongodb');

// (IMP-9) IMPORTAREA  MODULULUI 'CONFIG':
const config = require('config');

// (IMP-2) IMPORTAREA 'JOI'
const Joi = require('joi');

// (IMP-8) IMPORTAREA 'JOI-OBJECTID'
Joi.objectId = require('joi-objectid')(Joi);

const express = require('express');
const app = express();

// (IMP-14 IMPORTAREA  MODULULUI 'STARTUP/ROUTES':
require('./startup/routes')(app);
// (IMP-15 IMPORTAREA  MODULULUI 'STARTUP/DB':
require('./startup/db')();






// (VAR. 2) TRATAREA ERORILOR - 'UNCAUGHT  EXCEPTION' ('EXCEPTIE NEPRINSA')
// PRIN 'WINSTON' & MET. 'HANDLEEXCEPTION(OBIECT_DE_TRANSPORT)':
winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtExceptin.log' }));




//__________________________________________________________________________
// (VAR. 2) TRATAREA 'PROMISIUNILOR RESPINSA NETRATATE' ('UNHANDLED PROMISE REJECTED'):
// PRIN OBIECTUL 'PROCESS' & MET. 'ON()'
// IN CARE 'ARUNCAM EXCEPTIA':
process.on('unhandledRejection', exception => {

    // ARUNCAREA UNEI 'EXCEPTII':
    throw exception;
});




// ____________________________________________________________________________
// APELAREA 'WINSTON'
//'TRANSPORT' PT 'INREGISTRAREA MESAJELOR' INTR-UN 'FISIER':
winston.add(winston.transports.File, { filename: 'logfile.log' });




// DACA DORIM DOAR SA 'AFISAM EROAREA' IN 'MONGODB'
// (2) FARA A 'STOCA MESAJUL INFORMATIV'
// ADAUGAM SI PROP. 'LEVEL'
winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/video-renting',
    level: 'error'
});




// ____________________________________________________________________________
// 'PROMISIUNEA RESPINSA' ('REJECTED PROMISE')
// CU MET. '.REJECT(OBIECT_ERROR())'
const p = Promise.reject(new Error('Ceva a eșuat lamentabil.'));

// APELAREA 'PROMISIUNI'
// NU APELAM MET. 'CATCH()' PT. 'GESTIONAREA RESPINGERI'
// AVEM O 'RESPINGERE NETRATATA / SOLUTIONATA' (UNHANDLED):
p.then(() => console.log('Terminat'));




// ____________________________________________________________________________
// CONDITIE:
if (!config.get('cheiaPrivataJWT')) {

    // AFISAREA 'ERORI':
    console.error('EROARE FATALA: cheiaPrivataJWT nu este definita.');

    // IESIREA DIN OBIECTUL GLOBAL - 'PROCESS'
    // MET. 'EXIT(0 = SUCCES, ALT_NR = ESEC)':
    process.exit(1);
}






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