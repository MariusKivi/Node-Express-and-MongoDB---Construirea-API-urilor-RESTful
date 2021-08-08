// ==============================================================
//  'PROGRAM' DE 'SINCRONIZARE' / 'BLOCARE'
// ==============================================================

/*
    (1) IN 'PROGRAMUL' DE 'SINCRONIZARE' / CU 'BLOCARE':
            => CAND 'PRIMA LINIE' SE 'EXECUTA',
            => PROGRAMUL ESTE 'BLOCAT',
            => IAR 'LINIA A 2-A' TREBUIE SA 'ASTEPTE',
            => PANA CAND 'PRIMA LINIE' ESTE 'EXECUTATA'



    (2) IN 'PROGRAMUL' DE 'ASINCRONIZARE' / 'FARA  BLOCARE':
            => CAND 'PRIMA LINIE' SE 'EXECUTA',
            => 'PROGRAMUL' NU ESTE 'BLOCAT',
            => IAR 'LINIA A 2-A' sE 'EXECUTA',
            => DUPA 'PRIMA LINIE', 
            => FARA A MAI ASTEPTA 'RASPUNSUL PT. PRIMA LINIE'

    
     <> Exisa '3 Pattern'-uri pentru a 'Trata' un 'Cod Asincron':

            (1) CallBacks (Apelare Inversa)
            (2) Pronises (Promisiuni)
            (3) Async/Await (Asincron/Asteapta)
                 => care este 'Syntactical Suger' peste 'Promisuni'

     <> 'Callback':
            => este o Functie, 
            => pe care o vom 'Apela'
            => cand 'Rezultatul' unei Operatiuni 'Asincron'
            => este 'Pregatit'.

*/

// ==============================================================
// (1) AFISARE 1:
// ==============================================================
console.log('Inainte');

// ==============================================================
// (4) APELAREA FUNC. 'GETUSER(ID, FUNCTION(USER)( OBT_ACCESUL_ASUPRA_USERULUI_DIN_DB))':
// ==============================================================
// getUser(1, function(user) {
getUser(1, (user) => {
    // AFISARE:
    // console.log('Utilizator: ', user);

    // AELAREA FUNC. 'ASINCRONE' - 'GETREPOSITORIES()':
    getRepositories(user.gitHubUsername, (depozite) => {
        console.log('Depozite: ', depozite);
    });
});


// ==============================================================
// (2) AFISARE 2:
// ==============================================================
console.log('Dupa');



// ==============================================================
// (3) FUNC. 'GETUSER(ID)'
// ==============================================================
function getUser(id, callback) {
    // EX. DE 'FUNCTIE  ASINCRON / FARA BLOCARE'
    // FUNCTIA 'SETTIMEOUT( ()=>{}, TIMP_DE_ASTEPTARE)'
    setTimeout(() => {
        // AFISARE:
        console.log('Citirea unui Utilizator din Baza de Date...');

        // 'CALLBACK' CU 'OBIECTUL' - 'USER':
        callback({ id: id, gitHubUsername: 'marius' });
    }, 2000);
}





// ========================================================================
// (5.1) FUNC. 'SINCRONA' - 'GETREPOSITORIES(USERNAME)' (PT. 'PRELUAREA DEPOZITELOR')
// ========================================================================
// function getRepositories(username) {
//     // RETURNAREA 'MATRICEI' CU LISTA DE 'DEPOZITE':
//     return ['depozit1', 'depozit2', 'depozit3'];
// }



// ========================================================================
// (5.2) FUNC. 'ASINCRONA' - 'GETREPOSITORIES(USERNAME, CALLBACK)' 
//       (PT. 'PRELUAREA DEPOZITELOR' & RETURNAREA CA 'REZULTAT')
// ========================================================================
function getRepositories(username, callback) {

    // FUNCTIA 'SETTIMEOUT( ()=>{}, TIMP_DE_ASTEPTARE)'
    setTimeout(() => {
        // AFISARE:
        console.log('Apelarea API-ului GitHun...');

        // 'CALLBACK' CU 'MATRICEA' - 'USER':
        callback(['depozit1', 'depozit2', 'depozit3']);

    }, 2000);
}