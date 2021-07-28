/* ================================================================================
    SISTEMUL  MODULELOR  IN  NODE:
    EXTINDEREA  CLASEI  'EVENTEMITTER'
 ==================================================================================*/


// ================================================================================
// (0.1) IMPORTAREA MODULULUI 'EVENTS' 
//     IN CLASA 'EVENTEMITTER' ('EMITATOR DE EVENIMENTE')
// ================================================================================
const EventEmitter = require('events');


// ================================================================================
// (0.2) IMPORTAREA CLASEI 'INREGISTRATOR' DIN  MODULULUI 'Extinderea_Clasei_EventEmitter' 
// ================================================================================
const Logger = require('./logger');


// ================================================================================
// (1) CREAM OBIECTUL 'INREGISTRATOR'
// ================================================================================
const logger = new Logger();



// ================================================================================
// (2) METODA LISTENER 'ON(EMITTER, CALLBACK FUNC(ARGUMENTUL_EVENIMENT))' / 'ADDLISTENER()' 
//       (PT. ASCULTAREA EVENIMENTULUI (EMIT()))
// ================================================================================
logger.on('messageLogged', (arg) => {
    console.log('Listener Apelat!', arg);
});


// ================================================================================
// (3) APELAREA FUNCTIE 'LOG()' 
// ================================================================================
logger.log(message);



/*
    RULAM COMANDA:
        node app.js
*/