/* ================================================================================
    SISTEMUL  MODULELOR  IN  NODE:
    CREAREA  'MODULULUI' - 'LOGGER.JS'
 ==================================================================================*/

/*
       CREAM UN 'MODUL' PT 'AUTENTIFICAREA  MESAJELOR'
*/

/*
     NB!
        (#) 'MODULUL' 
                => TREBUIE SA REPREZINTE O 'INTERFATA  PUBLICA' 
                   (SIMPLA & USOR DE UTILIZAT) 

        (#) 'CONTINUTUL MODULULUI' 
                => REPREZINTA UN 'DETALIU DE IMPLEMENTARE' (VAZUT DOAR DE DEZVOLTATORI)   
*/


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
//       => PRIN OBIECTUL 'EXPORT' --> METODA 'LOG'  
// ===========================================================================
module.exports.log = log;


// ===========================================================================
// (3.2) EXPORTAM VARIABILEI 'URL' 
//       => PRIN OBIECTUL 'EXPORT' --> VARIABILA 'LOG'  
//          PE CARE O PUTEM DENUMI DUPA CUM DORIM (LA EXPORT) - 'ENDPOINT' 
// ===========================================================================
// (NB!) 'URL'-UL => ESTE UN 'DETALIU DE IMPLEMENTARE' 
//       (CELELALTE 'MODULE' NU TREBUIE SA 'STIE' DESPRE EL)
// ===========================================================================
// module.exports.endPoint = url;