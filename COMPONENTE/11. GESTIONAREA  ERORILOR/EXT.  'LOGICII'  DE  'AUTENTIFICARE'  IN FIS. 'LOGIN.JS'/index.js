// (IMP-9) IMPORTAREA  MODULULUI 'CONFIG':
const config = require('config');

// (IMP-2) IMPORTAREA 'JOI'
const Joi = require('joi');

// (IMP-8) IMPORTAREA 'JOI-OBJECTID'
Joi.objectId = require('joi-objectid')(Joi);

const express = require('express');
const app = express();

// IMPORTAREA  MODULULUI 'STARTUP/LOGIN':
require('./startup/login');
// IMPORTAREA  MODULULUI 'STARTUP/ROUTES':
require('./startup/routes')(app);
// IMPORTAREA  MODULULUI 'STARTUP/DB':
require('./startup/db')();





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