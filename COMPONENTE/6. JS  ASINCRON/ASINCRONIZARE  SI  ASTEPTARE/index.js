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


     <> 'PROMISIUNIILE' AU 2 METODE:
            (1) MET. 'CATCH()' => PT. 'PRINDEREA  ERORILOR'          
            (2) MET. 'THEN()' => PT. A 'PRELUA  UN  REZULTAT' AL UNEI OP. 'ASINCRON' 
    
            

    <> 'Asincronizarea si Asteptarea'
            => permite Scrierea Condului 'Asincron'
            => ca si Codul 'Sincron'
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
getUser(1, (user) => {

    // AELAREA FUNC. 'ASINCRONE' - 'GETREPOSITORIES()':
    getRepositories(user.gitHubUsername, (depozite) => {

        // FUNC. 'GETCOMMITS(ELEMENT, FUNC_INVERSA)':
        getCommits(depozite[0], (commits) => {
            console.log(commits);
        })
    });
});



// ==============================================================
// (1.2) APELAREA FUNC. 'ASINCRONE' - 'GETUSER(ID, FUNCTION(USER)( OBT_ACCESUL_ASUPRA_USERULUI_DIN_DB))':
// ==============================================================
// getUser(1, getRepositories);




// ==============================================================
// (1.3) 'ASINCRON':
// ==============================================================
// console.log('Dupa');






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
// function getRepositories(user) {
//     getRepositories(user.gitHubUsername, getCommits);
// }




// ==============================================================
// (3.2) FUNC. 'GETCOMMITS()'
// ==============================================================
// function getCommits(depozite) {
//     getCommits(depozit, displayCommits);
// }




// ==============================================================
// (3.3) FUNC. 'DISPLAYCOMMITS()'
// ==============================================================
// function displayCommits(commits) {
//     console.log(commits);
// }



// ==============================================================
// (4.1.1) FUNC. 'GETUSER(ID)' - CU  'CREAREA  PROMISIUNII'
// ==============================================================
function getUser(id) {

    // RETURNAREA 'FUNCTIEI CONSTRUCTOR' A 'PROMISIUNII':
    return new Promise((rezolvare, respingere) => {

        // EX. DE 'FUNCTIE  ASINCRON / FARA BLOCARE'
        // FUNCTIA 'SETTIMEOUT( ()=>{}, TIMP_DE_ASTEPTARE)'
        setTimeout(() => {
            // AFISARE:
            console.log('Citirea unui Utilizator din Baza de Date...');

            // 'REZOLVARE()' CU 'OBIECTUL' - 'USER':
            rezolvare({ id: id, gitHubUsername: 'marius' });
        }, 2000);
    });

}



// ==============================================================
// (4.1.2)  CONSUMAREA  'PROMISIUNII' PRIN:  APELARE' A FUNC. 'GETUSER(ID)' &
// MET. 'THEN()' - PT. 'PRELUAREA REZULTATULUI'  OP. 'ASINCRON' &
// MET. 'CATCH()' - 'PRINDEREA  ERORILOR' 
// ==============================================================
// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(depozite => getCommits(depozite[0]))
//     .then(connits => console.log('Comite: ', commits))
//     .catch(err => console.log('Eroare: ', err.message));



// ==============================================================
// (4.1.3)  CONSUMAREA  PRIN  FUNCTIA DECORATA CU 'ASYNC' SI
//          PRIN 'RESCRIEREA PROMISIUNII' 
//          PRIN ABORDAREA 'ASINCRONIZARE  SI  ASTEPTARE'  ('ASYNC  AND  ARAIT')
//   UTIL. BLOCURILOR 'TRY{} CATCH{}' -- PT. 'PRINDEREA  ERORILOR' 
// ==============================================================
async function displayCommits() {

    try {
        // APELAM FUNC.:
        const user = await getUser(1);

        // APELAM FUNC.:
        const depozite = await getRepositories(user.gitHubUsername);

        // APELAM FUNC.:
        const commits = await getCommits(depozite[0]);

        // AFISARE:
        console.log(commits);
    } catch (err) {
        console.log('Eroare: ', err.message);
    }
}


// APELAREA FUNCTIEI:
displayCommits();



console.log('Dupa');







// ========================================================================
// (4.2) FUNC. 'SINCRONA' - 'GETREPOSITORIES(USERNAME)' (PT. 'PRELUAREA DEPOZITELOR')
// ========================================================================
// function getRepositories(username) {
//     // RETURNAREA 'MATRICEI' CU LISTA DE 'DEPOZITE':
//     return ['depozit1', 'depozit2', 'depozit3'];
// }






// ========================================================================
// (4.2.1) FUNC. 'ASINCRONA' - 'GETREPOSITORIES(USERNAME)' 
//       (PT. 'PRELUAREA DEPOZITELOR' & RETURNAREA CA 'REZULTAT')
// ========================================================================
function getRepositories(username) {

    // RETURNAREA 'FUNCTIEI CONSTRUCTOR' A 'PROMISIUNII':
    return new Promise((rezolvare, respingere) => {

        // FUNCTIA 'SETTIMEOUT( ()=>{}, TIMP_DE_ASTEPTARE)'
        setTimeout(() => {
            // AFISARE:
            console.log('Apelarea API-ului GitHun...');

            // 'REZOLVARE()' CU 'MATRICEA' - 'USER':
            rezolvare(['depozit1', 'depozit2', 'depozit3']);

        }, 2000);
    });
}




// ========================================================================
// (4.2.2) FUNC. 'ASINCRONA' - 'GETREPOSITORIES(USERNAME)' 
//       (PT. 'PRINDEREA  ERORILOR' )
// ========================================================================
function getRepositories(username) {

    // RETURNAREA 'FUNCTIEI CONSTRUCTOR' A 'PROMISIUNII':
    return new Promise((rezolvare, respingere) => {

        // FUNCTIA 'SETTIMEOUT( ()=>{}, TIMP_DE_ASTEPTARE)'
        setTimeout(() => {
            // AFISARE:
            console.log('Apelarea API-ului GitHun...');

            // 'REZOLVARE()' CU 'MATRICEA' - 'USER':
            respingere(new Error('Nu s-au putut obține depozitele ...'));

        }, 2000);
    });
}






// ========================================================================
// (4.3) FUNC. 'ASINCRONA' - 'GETCOMMITS(USERNAME)' 
//       (PT. 'PRELUAREA DEPOZITELOR' & RETURNAREA CA 'REZULTAT')
// ========================================================================
function getCommits(depozite) {

    // RETURNAREA 'FUNCTIEI CONSTRUCTOR' A 'PROMISIUNII':
    return new Promise((rezolvare, respingere) => {

        // FUNCTIA 'SETTIMEOUT( ()=>{}, TIMP_DE_ASTEPTARE)'
        setTimeout(() => {
            // AFISARE:
            console.log('Apelarea API-ului GitHun...');

            // 'REZOLVARE()' CU 'MATRICEA': - 'USER':
            rezolvare(['commit']);

        }, 2000);
    });
}