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


// INCARCAREA / IMPORTAREA (PT. CONECTAREA LA 'MONGODB')
const mongoose = require('mongoose');

// OBIECTUL  ARE  MET. 'CONNECT()' 
// (PT. CONECTAREA LA BAZA DE DATE 'MONGODB' - 'LOC DE JOACA')
// METODA -> RETURNEAZA 'PROMISIUNI'
mongoose.connect('mongodb://localhost/locdejoaca')
    .then(() => console.log('Conectat la MongoDB ...'))
    .catch(err => console.error('Nu s-a putut conecta la MongoDB...', err));



// CREAREA 'SCHEMEI' - 'SCHEMACURS' 
// (PRIN PK 'MONGOOSE' & CLASA 'Schema()'):
const schemaCurs = new mongoose.Schema({
    nume: String,
    autor: String,
    tags: [String],
    data: { type: Date, default: Date.now },
    estePublicat: Boolean
});