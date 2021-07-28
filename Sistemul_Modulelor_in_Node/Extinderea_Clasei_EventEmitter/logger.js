/* ================================================================================
    SISTEMUL  MODULELOR  IN  NODE:
    EXTINDEREA  CLASEI  'EVENTEMITTER'
 ==================================================================================*/


// ================================================================================
// (0) IMPORTAREA MODULULUI 'EVENTS' 
//     IN CLASA 'EVENTEMITTER' ('EMITATOR DE EVENIMENTE')
// ================================================================================
const EventEmitter = require('events');



// ============================================================================
// (1) TRIMITE 'REQUEST' CATRE UN 'WEBSITE'
// ============================================================================
var url = 'http://www.logger.ro/log';



// ============================================================================
// (2) CLASA FUNCTIONALA (SYNTACTIC SUGER) 'INREGISTRATOR' 
//     EXTINDE CLASA 'EVENTEMETTER'
// ============================================================================
class Logger extends EventEmitter {

    //  METODA 'LOG'
    log(message) {
        // TRIMITERE 'HTTP REQUEST'
        // AFISARE 'MESAJ':
        console.log(message);

        //  APELAREA METODEI  'EMIT(NUMELE_EVENIMENTULUI, {ARGUMENTUL EVENIMENTULUI})'
        //  (PT. RIDICAREA/CREAREA UNUI 'EVENIMENT')
        // 'EMIT' (EMITE) = A SCOATE UN ZGOMOT, A SEMNALA , A PRODUCE O SEMNALIZARE
        this.emit('messageLogged', { id: 1, url: 'http://' });
    }
}


// ===========================================================================
// (3) EXPORTAM FUNCTIEI 'LOG'
// ===========================================================================
module.exports = Logger;