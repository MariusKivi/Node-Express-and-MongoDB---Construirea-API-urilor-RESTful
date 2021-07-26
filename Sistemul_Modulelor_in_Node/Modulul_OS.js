/* ================================================================================
    SISTEMUL  MODULELOR  IN  NODE:
    MODULUL  -  'OS' ('SISTEMULUI  DE  OPERARE')
 ==================================================================================*/

/*
    MODULUL 'OS'
        => OFERA 'METODE' & 'PROPRIETATI'
        => LEGATE DE 'SISTEMUL DE OPERARE'.

   (#) MODULUL  -  'OS':
        https://nodejs.org/dist/latest-v14.x/docs/api/os.html
*/

/*
     (#) 'TEMPLATE STRING'
               => PERMITE CREAREA DE 'SIRURI DE CARACTERE' 
               => FARA 'CONCATENARE'
               => PRIN UTILIZAREA `BACKTICK`-URILOR
               => POATE FI UTILIZAT DIN 2015 PRIN 'ES6'
*/



// ================================================================================
// (0) IMPORTAREA OBIECTULUI 'OS'
// ================================================================================
const os = require('os');



// ================================================================================
// (1) APELAREA METODEI  'TOTALMEM()'
// ================================================================================
var memorieTotala = os.totalmem();



// ================================================================================
// (2) APELAREA METODEI  'FREEMEM()'
// ================================================================================
var memorieLibera = os.freemem();


// ================================================================================
// (2.0) AFISAREA 'OBIECTULUI' 
// ================================================================================
// console.log('Memoria Totala: ' + memorieTotala);


// ================================================================================
// (2.1) 'TEMPLATE STRING' - `BACKTICK` CU OBIECTE DINAMICE '${}'
// ================================================================================
console.log(`Memoria Totala: ${memorieTotala}`);


// ================================================================================
// (2.2) 'TEMPLATE STRING' -  `BACKTICK ` CU OBIECTE DINAMICE '${}'
// ================================================================================
console.log(`Memoria Libera: ${memorieLibera}`);