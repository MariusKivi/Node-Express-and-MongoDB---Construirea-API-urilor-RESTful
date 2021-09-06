// ==============================================================
// (0) INCARCAREA / IMPORTAREA (PT. CONECTAREA LA 'MONGODB')
const mongoose = require('mongoose');



// ==============================================================
// (1) CREAREA & CONECTAREA LA BAZA DE DATE 'LOC DE JOACA' - 'LOC DE JOACA')
//     PRIN MET. 'CONNECT()' (CARE RETURNEAZA 'PROMISIUNI')
mongoose.connect('mongodb://localhost/locdejoaca')
    .then(() => console.log('Conectat la MongoDB ...'))
    .catch(err => console.error('Nu s-a putut conecta la MongoDB ...', err));




// ==============================================================
// (2.1) MODELUL 'AUTOR' CU 'SCHEMA'  
const Autor = mongoose.model('Autor', new mongoose.Schema({
    nume: String,
    biografie: String,
    website: String
}));



// ==============================================================
// (2.2) MODELUL 'CURS' CU 'SCHEMA'  
const Curs = mongoose.model('Curs', new mongoose.Schema({
    nume: String,
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Autor'
    }
}));



// ==============================================================
// (3.1) FUNC. ASINCRONE 'CREAREAUTOR()' 
//       (PT. CREAREA 'DOCUMENTELOR' IN 'MONGODB')
// ==============================================================
async function creareAutor(nume, biografie, website) {
    // CREAREA OBIECTULUI 'AUTOR' (INSTANTA A CLASEI):
    const autor = new Autor({
        nume: nume,
        biografie,
        website
    });

    // SALVAREA OBIECTULUI 'AUTOR' IN 'BAZA DE DATE' - IN 'REZULTAT'
    // PRIN MET. 'SAVE()' -> CARE  RETURNEAZA O 'PROMISIUNE':
    // 'OPERATII  ASINCRONE & ASTEPTARE'
    const rezultat = await autor.save();

    // AFISARE 'REZULTAT':
    console.log(rezultat);
}


// ==============================================================
// (3.2) FUNC. ASINCRONE 'CREARECURS()' 
//       (PT. CREAREA 'DOCUMENTELOR' IN 'MONGODB')
// ==============================================================
async function creareCurs(nume, autor) {
    // CREAREA OBIECTULUI 'CURS' (INSTANTA A CLASEI):
    const curs = new Curs({
        nume,
        autor
    });

    // SALVAREA OBIECTULUI 'CURS' IN 'BAZA DE DATE' - IN 'REZULTAT'
    // PRIN MET. 'SAVE()' -> CARE  RETURNEAZA O 'PROMISIUNE':
    // 'OPERATII  ASINCRONE & ASTEPTARE'
    const rezultat = await curs.save();

    // AFISARE 'REZULTAT':
    console.log(rezultat);
}


// ==============================================================
// (3.3) FUNC. ASINCRONE 'LISTACURSURI()' 
//       (PT. CITIREA 'DOCUMENTELOR' IN 'MONGODB')
// ==============================================================
async function listaCursuri() {
    const cursuri = await Curs
        // PRELUAREA 'CURSURILOR'  
        .find()
        // SELECTAREA ATRIBUTULUI 'NUME'
        .select('nume');

    // AFISARE 'CURSURI':
    console.log(cursuri);
}




// ==============================================================
// (4.1) APELARE FUNC. PT. 'CREARE AUTOR' 
// ==============================================================
// creareAutor('Marius', 'Biografia mea', 'Website-ul Meu');



// ==============================================================
// (4.2) APELARE FUNC. PT. 'CREARE CURS' 
// ==============================================================
creareCurs('Cursul Node', '6135de1276a6cb20409d18ca');



// ==============================================================
// (4.3) APELARE FUNC. PT. AFISARE 'LIZTA CURSURI' 
// ==============================================================
// listaCursuri();