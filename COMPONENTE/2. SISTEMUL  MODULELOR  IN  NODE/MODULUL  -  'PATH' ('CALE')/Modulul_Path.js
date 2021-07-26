/* ================================================================================
    SISTEMUL  MODULELOR  IN  NODE:
    MODULUL  INCORPORAT -  'PATH' ('CALE')
 ==================================================================================*/

/*
    MODULUL 'PATH'
        => OFERA 'UTILITATI' PENTRU 'LUCRUL' CU
        => 'FISIERE' & 'DIRECTOARE'.


   (#) MODULELE INCORPORATE IN NODE:
        https://nodejs.org/dist/latest-v14.x/docs/api/

   (#) modulul INCORPORAT IN NODE - 'path' :
        https://nodejs.org/dist/latest-v14.x/docs/api/path.html
*/


/*
     UTILIZAREA FUNCTIEI 'PARSE(__NAMEFILE)' - PT. 'NUMELE FISIERULUI' 
          => VA 'AFISA':
          _____________________________________________________________
          {
               root: 'C:\\',
               dir: 'C:\\Users\\mariu\\OneDrive\\Desktop\\Node-Express-and-MongoDB---Construirea-API-urilor-RESTful\\Sistemul_Modulelor_in_Node',
               base: 'Modulul_Path.js',
               ext: '.js',
               name: 'Modulul_Path'
          }
          _____________________________________________________________
*/



// ================================================================================
// (0) IMPORTAREA OBIECTULUI 'PATH'
// ================================================================================
const path = require('path');


// ================================================================================
// (1) UTILIZAREA  METODEI  'PARSE(ARGUMENT)'
// ================================================================================
var caleObiect = path.parse(__filename);


// ================================================================================
// (2) AFISAREA 'OBIECTULUI'
// ================================================================================
console.log(caleObiect);