/*  	
    GENERAREA 'EXPLICITA' A UNUI ' OBIECT ID'
*/

// IMPORTARE 'MONGOOSE':
const mongoose = require('mongoose');


// CREAM OBIECTUL 'ID' - 'ObjectId()':
const id = new mongoose.Types.ObjectId();

// AFISAREA 'ID':
// console.log(id);

// AFISAREA METODEI '.GETTIMESTAMP()' A 'ID'-ULUI:
console.log(id.getTimestamp());

// VALIDAREA 'OBJECTID' PRIN MET. 'ISVALID()':
const esteValid = mongoose.Types.ObjectId.isValid('1234');

// AFISARE 'ESTEVALID()':
console.log(esteValid);