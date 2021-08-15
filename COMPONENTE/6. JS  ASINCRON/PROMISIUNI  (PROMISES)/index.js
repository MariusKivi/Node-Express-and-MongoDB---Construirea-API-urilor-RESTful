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
//          (I) ASINCRONA
// ==============================================================
// (1.1) 'ASINCRONE'l
// ==============================================================
console.log('Inainte');

// ==============================================================
// (1.2) APELAREA FUNC. 'ASINCRONE' - 'GETUSER(ID, FUNCTION(USER)( OBT_ACCESUL_ASUPRA_USERULUI_DIN_DB))':
// ==============================================================
getUser(1, getRepositories);




// ==============================================================
// (1.3) 'ASINCRON':
// ==============================================================
console.log('Dupa');






// ==============================================================
//          (II) SINCRONA
// ==============================================================
// (2.1) 'SINCRON':
// ==============================================================
// console.log('Dupa');

// ==============================================================
// (2.2) APELAREA FUNC. 'SINCRON':
// ==============================================================
// const user = getUser(1);

// ==============================================================
// (2.3) APELAREA FUNC. 'SINCRON':
// ==============================================================
// const depozite = getRepositories(user.gitHubUsername);

// ==============================================================
// (2.4) APELAREA FUNC. 'SINCRON':
// ==============================================================
// const commits = getCommits(depozite[0]);


// ==============================================================
// (2.5) 'SINCRON':
// ==============================================================
// console.log('Inainte');




// ==============================================================
// (3.1) FUNC. 'GETCOMMITS()'
// ==============================================================
function getRepositories(user) {
    getRepositories(user.gitHubUsername, getCommits);
}




// ==============================================================
// (3.2) FUNC. 'GETCOMMITS()'
// ==============================================================
function getCommits(depozite) {
    getCommits(depozit, displayCommits);
}




// ==============================================================
// (3.3) FUNC. 'DISPLAYCOMMITS()'
// ==============================================================
function displayCommits(commits) {
    console.log(commits);
}



// ==============================================================
// (3.4) FUNC. 'GETUSER(ID)'
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
// (4.1) FUNC. 'SINCRONA' - 'GETREPOSITORIES(USERNAME)' (PT. 'PRELUAREA DEPOZITELOR')
// ========================================================================
// function getRepositories(username) {
//     // RETURNAREA 'MATRICEI' CU LISTA DE 'DEPOZITE':
//     return ['depozit1', 'depozit2', 'depozit3'];
// }



// ========================================================================
// (4.2) FUNC. 'ASINCRONA' - 'GETREPOSITORIES(USERNAME, CALLBACK)' 
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