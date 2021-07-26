/* ================================================================================
    SISTEMUL  MODULELOR  IN  NODE:
    FUNCTIA 'IMPACHETATOR'  AL  'MODULULUI'
 ==================================================================================*/

/*
   'NODE'
       => NU EXECUTA ACEST COD IN MOD DIRECT.
       => IMPACHETEAZA 'CODUL' INTR-O 'FUNCTIE'.

    'CODUL' ESTE 'CONVERTIT' IN:
        (function (exports, requi re, module, __filename, __dirname){})

*/



// ============================================================================
// (#) CREAM 'EROAREA SINTACTICA'
// AFISARE: SYNTAXERROR  UNEXPECTED ERROR TOKEN ';'
// ============================================================================
// var x = ;


// ============================================================================
// (0) 'EXPRESIA FUNCTIONALA' DE  IMPACHETARE  A  MODULULUI  (PT. DEMONSTRARE)
// ============================================================================
// (function(exports, require, module, __filename, __dirname) {


// ============================================================================
// (0.1) AFISAREA 'ARGUMENTULUI' - '__FILENAME' (NUMELE FISIERULUI)
// ============================================================================
console.log(__filename);



// ============================================================================
// (0.2) AFISAREA 'ARGUMENTULUI' - '__DIRNAME' (NUMELE FISIERULUI)
// ============================================================================
console.log(__dirname);



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
// (3) EXPORTAM FUNCTIEI 'LOG'
// ===========================================================================
// module.exports.log = log;
module.exports = log;



// ===========================================================================
// (4.1) ADAUGAREA UNEI 'FUNCTII' => 'MODULULUI' CARE 'EXPORTA OBIECTE'
// ===========================================================================
// module.exports.log = log;
// exports.log = log;


// ===========================================================================
// (4.2) DAR 'NU POATE' FI 'SCRIS'
// (PT. CA 'EXPORTS' ESTE O REFERINTA CATRE 'MODULUL' CARE 'EXPORTA'):
// ===========================================================================
// exports = log;
// });