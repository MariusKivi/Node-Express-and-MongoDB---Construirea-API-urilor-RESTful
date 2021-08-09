// ==============================================================
//  PROMISIUNI ([RPMISES])
// ==============================================================

/*
    <> Promisiunea 
        => este un 'Obiect' 
        => ce Contine si Furnizeaza 'Rezultatul' 
        => unei Operatiuni 'Asincrone'/'Fara Blocare'.
 


   <> Obiectul poate avea '3 Stari':
        (1) 'Asteptare'/'Pending' => la Crearea 'Promisiunii'
        (2) 'Implinit'/'Fulfiled' => cand 'Rezultatul' este 'Gata'
        (3) 'Respins'/'Rejected' => cand ceva este 'Gresit' in 'Executie', avand o 'Eroare'.



    <> 'Promisiunile' au '2 Metode':
            (1) Metoda 'catch()' => pt. 'Prinderea  Erorilor'.         
            (2) Metoda 'then()' => pt. a 'Prelua un  Rezultat' al unei Operatii 'Asincrone'.     
*/


// ==============================================================
//  (1) 'CREAREA  PROMISIUNII' - PRIN 'OBIECTUL' = 'P'
// ==============================================================
const p = new Promise((rezolva, respinge) => {

    // FUNCTIA 'SETTIMEOUT( ()=>{}, TIMP_DE_ASTEPTARE)'
    setTimeout(() => {

        // APELAM FUNC. 'REZOLVARE(VALOARE)' A OP. 'ASINCRONE':
        // rezolva(1);

        // APELAM FUNC. 'RESPINGE(VALOARE)'
        respinge(new Error('Exista o eroare in executarea fisierului'));
    }, 2000);


});



// ==============================================================
//  (2) 'CONSUMAREA  PROMISIUNII':
//       MET. 'THEN()' - PT. 'PRELUAREA REZULTATULUI'  OP. 'ASINCRON' &
//       MET. 'CATCH()' -  'PRINDEREA  ERORILOR' 
// ==============================================================
p
    .then(rezultat => console.log('Rezultat: ', rezultat))
    .catch(err => console.log('Eroarea: ', err.message));