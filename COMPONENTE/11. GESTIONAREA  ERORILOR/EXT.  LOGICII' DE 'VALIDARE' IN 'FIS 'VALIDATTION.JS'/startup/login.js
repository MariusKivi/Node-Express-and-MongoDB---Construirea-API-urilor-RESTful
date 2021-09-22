// (IMP-12 IMPORTAREA  BIBLIOTECiI 'WINSTON'
//  ('IMPLICIT' ESTE PT. 'LOGAREA' - 'TRANSPORTULUI' IN 'CONSOLA'):
const winston = require('winston');

// (IMP-13 IMPORTAREA  BIBLIOTECiI 'WINSTON-MONGODB'
//'T 'INREGISTRAREA MESAJELOR' IN 'MONGODB':
require('winston-mongodb');

// (IMP-11 IMPORTAREA  MODULULUI 'EXPRESS-ASYNC-ERRORS':
require('express-async-errors');





// EXPORTAM FUNCTIA ANONIMA:
module.exports = function() {

    // (VAR. 2) TRATAREA ERORILOR - 'UNCAUGHT  EXCEPTION' ('EXCEPTIE NEPRINSA')
    // PRIN 'WINSTON' & MET. 'HANDLEEXCEPTION(OBIECT_DE_TRANSPORT)':
    winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtExceptin.log' }));

    // (VAR. 2) TRATAREA 'PROMISIUNILOR RESPINSA NETRATATE' ('UNHANDLED PROMISE REJECTED'):
    // PRIN OBIECTUL 'PROCESS' & MET. 'ON()'
    // IN CARE 'ARUNCAM EXCEPTIA':
    process.on('unhandledRejection', exception => {

        // ARUNCAREA UNEI 'EXCEPTII':
        throw exception;
    });

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

}