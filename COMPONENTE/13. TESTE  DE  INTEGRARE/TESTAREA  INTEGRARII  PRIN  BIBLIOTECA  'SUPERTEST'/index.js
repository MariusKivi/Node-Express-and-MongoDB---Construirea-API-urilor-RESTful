const winston = require('winston');
const express = require('express');
const app = express();

// IMPORTAREA  FISIERELOR DIN FOLDER-UL 'STARTUP':
require('./startup/login')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();





// ____________________________________________________________________________
// VARIABILA 'ENVIRONMENT' - 'PORT'  SAu  PORTUL '3000':
// (IN OBIECTUL GLOBAL 'PROCESS', IN PROP. 'ENV')
const port = process.env.PORT || 3000;


// ____________________________________________________________________________
// PRELUAREA 'REZULTATULUI' NUMIT 'SERVER'
// MET. 'LISTEN(NR_PORT, CALLBACK FUNC*())' 
// ASCULTAREA 'VARIABILEI ENVIRONMENT':
const server = app.listen(port, () => winston.info(`Port de Ascultare ${port}...`));

// EXPORTAREA OBIECTULUI 'SERVER':
module.exports = server;