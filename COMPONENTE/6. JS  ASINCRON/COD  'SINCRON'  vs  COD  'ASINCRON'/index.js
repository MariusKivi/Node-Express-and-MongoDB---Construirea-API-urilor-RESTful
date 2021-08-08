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
*/

// ==============================================================
// INSTRUCTIUNI DE AFISARE IN CONSOLA:
// ==============================================================
// AFISARE 'LINIA 1'
console.log('Inainte');

// EX. DE 'FUNCTIE  ASINCRON / FARA BLOCARE'
// FUNCTIA 'SETTIMEOUT( ()=>{}, TIMP_DE_ASTEPTARE)'
setTimeout(() => {
    console.log('Citirea unui Utilizator din Baza de Date');
}, 2000);

// AFISARE 'LINIA 2'
console.log('Dupa');