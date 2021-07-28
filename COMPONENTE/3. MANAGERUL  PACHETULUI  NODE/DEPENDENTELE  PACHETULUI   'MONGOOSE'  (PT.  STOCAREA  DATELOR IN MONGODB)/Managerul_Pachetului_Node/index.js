/*
    BIBLIOTECA 'UNDERSCORE':
    https://underscorejs.org/
*/


// =========================================================
//  (0) IMPORTAREA BIBLIOTECI 'UNDERSCORE'
// =========================================================
var _ = require('underscore');


// MODULUL DE BAZA
// POATE '_' FI -> UN 'FISIER' SAU UN 'FOLDER' IN ACEST 'PROIECT'. 
// ACESTEA EXISTA IN 'NODE_MODULES'


// =========================================================
//  (1) METODA 'CONTAINS(MATRICE, CE_CAUTAM)'
// =========================================================
var rezultat = _.contains([1, 2, 3], 1);


// =========================================================
//  (2) AFISARE
// =========================================================
console.log(rezultat);


/*
    RULAM 'COMANDA' IN 'TERMINAL':
        npm index.js


    AFISARE IN TERMINAL:
    _________________________________________________________
    PS C:\Users\mariu\OneDrive\Desktop\Node-Express-and-MongoDB---Construirea-API-urilor-RESTful\Managerul_Pachetului_Node> node index.js
    true
    _________________________________________________________
*/