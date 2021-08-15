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

*/


// (0) INCARCAREA / IMPORTAREA (PT. CONECTAREA LA 'MONGODB')
const mongoose = require('mongoose');



// (1) OBIECTUL  ARE  MET. 'CONNECT()' 
// (PT. CONECTAREA LA BAZA DE DATE 'MONGODB' - 'LOC DE JOACA')
// METODA -> RETURNEAZA 'PROMISIUNI'
mongoose.connect('mongodb://localhost/locdejoaca')
    .then(() => console.log('Conectat la MongoDB ...'))
    .catch(err => console.error('Nu s-a putut conecta la MongoDB...', err));



// (2) CREAREA 'SCHEMEI' - 'SCHEMACURS' 
// (PRIN PK 'MONGOOSE' & CLASA 'Schema()'):
const schemaCurs = new mongoose.Schema({
    nume: String,
    autor: String,
    tags: [String],
    data: { type: Date, default: Date.now },
    estePublicat: Boolean
});



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
        .find({ autor: 'Marius Chivu', estePublicat: true })
        .limit(10)
        .sort({ nume: 1 })
        .select({ nume: 1, tags: 1 });

    // AFISARE:
    console.log(cursuri);
}


// (6.2) APELAREA FUNCTIEI:
getCursuri();