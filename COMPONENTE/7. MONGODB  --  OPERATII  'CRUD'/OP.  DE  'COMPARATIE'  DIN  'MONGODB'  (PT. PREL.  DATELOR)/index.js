/*
    <> 'PROMISIUNIILE' AU 2 METODE:
            (1) MET. 'THEN()' => PT. A 'PRELUA  UN  REZULTAT' AL UNEI OP. 'ASINCRON' 
            (2) MET. 'CATCH()' => PT. 'PRINDEREA  ERORILOR' 
           
            
            
    NB!
    ____________________________________________________________________
    <> 'Colectia 'in 'MongoDB' = 'Tabelul' din 'RDBMS'

    <> 'Documentul' in 'MongoDB' = 'Randul' din 'RDBMS'

    <> 'Documentul':
        => este un 'Container' de "Perechi 'Cheie':'Valoare'"


    <> Pachetul 'Mongopse' contine 'Schema':
        => pe care o utilizam 
        => pt. a Defini 'Forma Documentului (Randului)'
        => dintr-o 'Colectie' ('Tabel') - 'MongoDB'
        => adica 'Proprietatile' existente in 'Document'

    <>  'Tipul de Date' al 'Schemei':
        (1) 'String'
        (2) 'Number'
        (3) 'Date'
        (4) 'Buffer'
        (5) 'Boolean'
        (6) 'ObjectID'
        (7) 'Array'
    ____________________________________________________________________


    Opreatorii ($) de 'Comparatie' din 'MongoDB':

        (1) 'eq' = 'equal' (egal)
        (2) 'ne' = 'not equal' (nu este egal)
        (3) 'gt' = 'greater than' (mai mare ca)
        (4) 'gte'= 'greater than or equal to' (greater than or equal to)
        (5) 'lt' = 'less than' (mai putin de)
        (6) 'lte' = 'less than  or  equal to'(mai mic sau egal cu)
        (7) 'in' = 'in' (in)
        (8) 'nin' = 'not in'(nu)

*/

// ==============================================================
// (0) INCARCAREA / IMPORTAREA (PT. CONECTAREA LA 'MONGODB')
const mongoose = require('mongoose');




// ==============================================================
// (1) OBIECTUL  ARE  MET. 'CONNECT()' 
// (PT. CONECTAREA LA BAZA DE DATE 'MONGODB' - 'LOC DE JOACA')
// METODA -> RETURNEAZA 'PROMISIUNI'
mongoose.connect('mongodb://localhost/locdejoaca')
    .then(() => console.log('Conectat la MongoDB ...'))
    .catch(err => console.error('Nu s-a putut conecta la MongoDB...', err));



// ==============================================================
// (2) CREAREA 'SCHEMEI' - 'SCHEMACURS' 
// (PRIN PK 'MONGOOSE' & CLASA 'Schema()'):
const schemaCurs = new mongoose.Schema({
    nume: String,
    autor: String,
    tags: [String],
    data: { type: Date, default: Date.now },
    estePublicat: Boolean
});


// ==============================================================
// (3.1) CREAREA 'MODELULUI' PRIN COMPILAREA 'SCHEMEI'  
// CE OFERA CLASA 'CURS'
// MET. 'MODEL(COLECTIA, SCHENA_CE_DEF_FORMA_DOC_COLECTIEI)' A OBIECTULUI 'MONGOOSE'
const Curs = mongoose.model('Curs', schemaCurs);




// ==============================================================
// (5.1) CREAREA 'DOCUMENTELOR' IN BAZA DE DATE 'MONGODB'
// PRIN FUNC. ASINCRONE 'CREARECURS()' 
// ==============================================================
async function creareCurs() {

    // (3.2) CREAREA OBIECTULUI 'CURS' (INSTANTA A CLASEI):
    const curs = new Curs({
        nume: 'Curs Angular',
        autor: 'Marius Chivu',
        tags: ['angular', 'frontend'],
        estePublicat: true
    });



    // (4.1) SALVAREA OBIECTULUI 'CURS' IN 'BAZA DE DATE'
    // PRIN MET. 'SAVE()' -> CARE  RETURNEAZA O 'PROMISIUNE':
    // 'OPERATII  ASINCRONE & ASTEPTARE'
    const rezultat = await curs.save();


    // (4.2) AFISARE  'REZULTAT':
    console.log(rezultat);
}


// (5.2) APELAREA FUNCTIEI:
// creareCurs();





// ==============================================================
// (6.1) PRELUAREA 'DOCUMENTELOR' DIN BAZA DE DATE 'MONGODB'
// PRIN FUNC. ASINCRONE 'GETCURSURI()' 
// ==============================================================
async function getCursuri() {

    // METODA 'FIND(FILTRU)' -> RETURNEAZA OBIECTUL 'DOCUMENT QUERY' (CARE ESTE CA O 'PROMISIUNE'):
    // PRELUAREA 'TUTUROR DOCUMENTELOR' DIN BAZA DE DATE:
    const cursuri = await Curs
        // ________________________________________
        // (1) PRELUAREA 'TUTUROR CURSURILOR' cu 
        // 'AUTORUL' CU NUMELE 'MARIUS CHIVU' &
        // CU VALOAREA 'ESTE PUBLICAT' = 'ACTIVA': 
        // .find({ autor: 'Marius Chivu', estePublicat: true })
        // ________________________________________
        // (2) PRELUAREA 'TUTUROR CURSURILOR' CE AU 
        // 'PRETUL' MAI MARE SAU EGAL CU '40 LEI' 
        // & 'MAI MIC SAU EGAL CU 80 LEI'
        // UTILIZAM 'OBIECTUL' PT. 'FILTRARE':
        // .find({ pret: { $gte: 40, $lte: 80 } })
        // ________________________________________
        // (3)PRELUAREA 'TUTUROR CURSURILOR' CE AU 'PRETUL' DE
        // '40 LEI' SAU
        // '60 LEI' SAU
        // '80 LEI':
        .find({ pret: { $in: [40, 60, 80] } })
        .limit(10)
        .sort({ nume: 1 })
        .select({ nume: 1, tags: 1 });

    // AFISARE:
    console.log(cursuri);
}


// (6.2) APELAREA FUNCTIEI:
getCursuri();