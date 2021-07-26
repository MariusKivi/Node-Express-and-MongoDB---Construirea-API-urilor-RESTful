/* ================================================================================
    SISTEMUL  MODULELOR  IN  NODE:
    OBIECTUL  'GLOBAL'  IN  'NODE'
 ==================================================================================*/

/*
    (#) 'OBIECTUL  GLOBAL':
            => PERMITE 'ACCESAREA' DE 'ORIUNDE' 
            => A 'FUNCTIILOR' & 'VARIABILELOR'.


    (#) 'OBIECTUL  GLOBAL':
            => IN 'BROWSER' ==> AVEM 'WINDOW'
            => IN 'NODE' ==> AVEM 'GLOBAL'
*/


// ================================================================================
//  (1) OBIECTUL 'CONSOLE' => ESTE UN 'OBIECT GLOBAL' (SCOP GLOBAL)
//  <= PUTAND FI 'ACCESAT ORIUND', IN ORICE 'FISIER'
// ================================================================================
// console.log();



// ================================================================================
//  (2) OBIECTE  &  FUNCTII -> DISPONIBILE 'GLOBAL' IN 'NODE':
// ================================================================================


// ================================================================================
//  (2.1) FUNC. 'SET TIMEOUT()'  <= APARTINE 'STANDARDULUI  JAVASCRIPT'
//         FOLOSIT PT. 'APELAREA' UNEI 'FUNCTII' -> DUPA UN 'DELAY' (O 'INTARZIERE')
// ================================================================================
// setTimeout();


// ================================================================================
//  (2.2) FUNC. 'CLEAR TIMEOUT()'  <= APARTINE 'STANDARDULUI  JAVASCRIPT'
// ================================================================================
// clearTimeout();


// ================================================================================
//  (2.3) FUNC. 'SET INTERVAL()'  <= APARTINE 'STANDARDULUI  JAVASCRIPT'
//  UTILIZAT PT. 'APELAREA REPETITIVA' A UNEI 'FUNCTII' -> DUPA UN 'DELAY' DAT.
// ================================================================================
// setInterval();


// ================================================================================
//  (2.4) FUNC. 'SET INTERVAL()'  <= APARTINE 'STANDARDULUI  JAVASCRIPT'
//        UTILIZAT PT. OPRIREA 'FUNCTII' DIN A MAI FI 'APELAREA REPETITIVA'
// ================================================================================
// clearInterval();




// ================================================================================
//  (3) OBIECUL 'GLOBAL' IN 'BROWSERE':
// ================================================================================

// ================================================================================
//  (3.1) OBIECTUL 'WINDOW'  
//        REPREZINTA 'SCOPUL GLOBAL'
// ================================================================================
// window


// 'VARIABILELE' & 'FUNCTIILE' DEFINITE 'GLOBAL'
//  => POT FI 'ACCESATE' PRIN ACEST OBIECT 'WINDOW'
// window.console.log();


// SAU 'PUR SI SIMPLU' DOAR
//  <= PT. CA 'JS ENGINE' VA ADAUGA SINGUR 'PREFIXUL' = 'WINDOW':
// console.log();

// ================================================================================
// TOATE  'FUNCTIILE' DE MAI SUS 'APARTIN' OBIECTULUI 'WINDOW':
// ================================================================================
// window.setTimeout();
// window.clearTimeout();
// window.setInterval();
// window.clearInterval();



// ================================================================================
// IN "BROWSERE" -> 'VARIABILELE' LAFEL 'APARTIN' DE OBIECTUL 'WINDOW':
// ================================================================================
// var mesaj = '';
// window.mesaj;



// ================================================================================
//  (4) OBIECUL 'GLOBAL' IN 'NODE':
// ================================================================================
// global



// PT. CONSOLA:
// global.console.log();



// ================================================================================
// PT. globalTOATE  'FUNCTIILE' DE MAI SUS 'APARTIN' OBIECTULUI 'WINDOW':
// ================================================================================
// global.setTimeout();
// globaldow.setInterval();
// global.clearInterval();



// ================================================================================
// IN "NODE" -> 'VARIABILELE' NU APARTIN  DE OBIECTUL 'GLOBAL':
// ================================================================================
var mesaj2 = 'Variabilele nu apartin Obictului global';
console.log(global.mesaj2);