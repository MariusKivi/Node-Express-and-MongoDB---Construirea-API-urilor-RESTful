/*
    MET. 'THEN()' - PT. 'PRELUAREA REZULTATULUI'  OP. 'ASINCRON' &
    MET. 'CATCH()' -  'PRINDEREA  ERORILOR' 
*/



// ========================================================================================
//  (1.1) CREAREA 'PROMISIUNII CE PREIA DEJA REZULTATUL'
//  APELAREA CLASEI 'PROMISE' & A MET. STATICE 'RESOLVE()'
//  (CARE  RETURNEAZA O 'PROMISIUNE  DEJA  REZOLVATA'):
// ========================================================================================
const p = Promise.resolve({ id: 1 });


// ========================================================================================
// (1.2) CONSUMAREA 'PROMISIUNII':
// ========================================================================================
p.then(result => console.log(result));







// ========================================================================================
// (2.1) CREAREA 'PROMISIUNII DEJA RESPINSE'
// APELAREA CLASEI 'PROMISE' & A MET. STATICE 'RESOLVE()'
// (CARE  RETURNEAZA O 'PROMISIUNE  DEJA  REZOLVATA'):
// ========================================================================================
// const p2 = Promise.reject(new Error('Motivul respingerii ...'));

// FARA 'STIVA  DE  APELURI':
const p2 = Promise.reject('Motivul respingerii ...');


// ========================================================================================
// (2.2) CONSUMAREA 'PROMISIUNII':
// ========================================================================================
p2.catch(error => console.log(error));