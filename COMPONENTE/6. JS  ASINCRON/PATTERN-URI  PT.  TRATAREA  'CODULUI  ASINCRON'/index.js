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

    
     (#) Exisa '3 Pattern'-uri pentru a 'Trata' un 'Cod Asincron':

            (1) CallBacks (Apelare Inversa)
            (2) Pronises (Promisiuni)
            (3) Async/Await (Asincron/Asteapta)
                 => care este 'Syntactical Suger' peste 'Promisuni'

*/

// ==============================================================
// (1) INSTRUCTIUNI DE AFISARE IN CONSOLA:
// ==============================================================
// AFISARE 'LINIA 1'
console.log('Inainte');

// APELAREA FUNC.:
const user = getUser(1);
console.log(user);

// AFISARE 'LINIA 2'
console.log('Dupa');


// (1) CALLBACK (APELARI  INVERSE)
// (2) PROMISES (PROMISIUNI)
// (3) ASYNC/AWAIT (ASINCRON/ASTEPTARE)



// ==============================================================
// (2) FUNC. 'GETUSER(ID)'
// ==============================================================
function getUser(id) {
    // EX. DE 'FUNCTIE  ASINCRON / FARA BLOCARE'
    // FUNCTIA 'SETTIMEOUT( ()=>{}, TIMP_DE_ASTEPTARE)'
    setTimeout(() => {
        console.log('Citirea unui Utilizator din Baza de Date');
        // RETURNAM 'OBIECTUL':
        return { id: id, gitHubUsername: 'marius' }
    }, 2000);

    return 1;
}