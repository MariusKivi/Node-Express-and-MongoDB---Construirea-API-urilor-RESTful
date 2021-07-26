/* ================================================================================
    SISTEMUL  MODULELOR  IN  NODE:
    CREAREA  'MODULULUI' - 'LOGGER.JS'
 ==================================================================================*/

// ============================================================================
// (1) TRIMITE 'REQUEST' CATRE UN 'WEBSITE'
// ============================================================================
var url = 'http://www.logger.ro/log';



// ============================================================================
// (2) CREAM  FUNC. 'LOG'
// ============================================================================
function log(mesaj) {
    // SETARE 'HTTP REQUEST'

    // AFISARE 'MESAJ':
    console.log(mesaj);
}




// ===========================================================================
// (3.1) EXPORTAM FUNCTIEI 'LOG'
// ===========================================================================
// module.exports.log = log;
module.exports = log;