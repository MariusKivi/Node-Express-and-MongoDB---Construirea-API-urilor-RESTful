const winston = require('winston');
const express = require('express');
const app = express();

// IMPORTAREA  FISIERELOR DIN FOLDER-UL 'STARTUP':
require('./startup/login');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();





// ____________________________________________________________________________
// VARIABILA 'ENVIRONMENT' - 'PORT'  SAu  PORTUL '3000':
// (IN OBIECTUL GLOBAL 'PROCESS', IN PROP. 'ENV')
const port = process.env.PORT || 3000;


// ____________________________________________________________________________
// MET. 'LISTEN(NR_PORT, CALLBACK FUNC*())' 
// ASCULTAREA 'VARIABILEI ENVIRONMENT':
app.listen(port, () => {
    // 'TEMPLATE  STRING' (PRIN UTIL. 'BACKTICK')
    // console.log(`Port de Ascultare ${port}...`);

    // APELARE 'WINSTON' 
    // MET. 'INFO()' & 'TEMPLATE  STRING' (PRIN UTIL. 'BACKTICK')
    winston.info(`Port de Ascultare ${port}...`);
});