/*
    MET. 'THEN()' - PT. 'PRELUAREA REZULTATULUI'  OP. 'ASINCRON' &
    MET. 'CATCH()' -  'PRINDEREA  ERORILOR' 
*/



// ========================================================================================
//  (1.1) CREAREA 'PROMISIUNII 1' - PT. 'APELAREA API-ULUI FACEBOOK'
//  (PT. 'PRELUAREA REZULTATULUI'  OP. 'ASINCRON')
// ========================================================================================
const p1 = new Promise((resolve) => {



    setTimeout(() => {
        console.log('Operațiune asincronizată 1 ...');
        resolve(1);
    }, 2000);
});




// ========================================================================================
//  (1.1) CREAREA 'PROMISIUNII 1' - PT. 'APELAREA API-ULUI FACEBOOK'
//  (PT. 'PRINDEREA  ERORILOR' )
// ========================================================================================
// const p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('Operațiune asincronizată 1 ...');
//         reject(new Error('Pentru că ceva a eșuat ...'));
//     }, 2000);
// });





// ========================================================================================
//  (1.2) CREAREA 'PROMISIUNII 2' - PT. 'APELAREA API-ULUI TWITTER'
//  (PT. 'PRELUAREA REZULTATULUI'  OP. 'ASINCRON')
// ========================================================================================
const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Operațiune asincronizată 2 ...');
        resolve(2);
    }, 2000);
});





// ========================================================================================
// (2.1) CONSUMAREA DUPA CE 'TOATE PROMISIUNIILOR' SUNT 'REZOLVATE'
//      -> PRIN MET. 'ALL().THEN().CATCH()':
// ========================================================================================
// Promise.all([p1, p2])
//     .then(result => console.log(result))
//     .catch(err => console.log('Eroare: ', err.message));





// ========================================================================================
// (2.1) CONSUMAREA DUPA CE 'CEL PUTIN 1 PROMISIUNE' ESTE 'REZOLVATA'
//      -> PRIN MET. 'RACE().THEN().CATCH()':
// ========================================================================================
Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('Eroare: ', err.message));