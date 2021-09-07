// ==============================================================
// (0) INCARCAREA / IMPORTAREA (PT. CONECTAREA LA 'MONGODB')
const mongoose = require('mongoose');



// ==============================================================
// (1) CREAREA & CONECTAREA LA BAZA DE DATE 'LOC DE JOACA' - 'LOC DE JOACA')
//     PRIN MET. 'CONNECT()' (CARE RETURNEAZA 'PROMISIUNI')
mongoose.connect('mongodb://localhost/incorporare-documente')
    .then(() => console.log('Conectat la MongoDB ...'))
    .catch(err => console.error('Nu s-a putut conecta la MongoDB ...', err));



// ==============================================================
// (2.1.1) SCHEMA 'AUTOR'  
const schemaAutor = new mongoose.Schema({
    nume: String,
    biografie: String,
    website: String
});



// ==============================================================
// (2.1.2) MODELUL 'AUTOR' CU 'SCHEMA'  
const Autor = mongoose.model('Autor', schemaAutor);



// ==============================================================
// (2.2) MODELUL 'CURS' CU 'SCHEMA'  
const Curs = mongoose.model('Curs', new mongoose.Schema({
    nume: String,
    // VALIDARE - DOCUMENT INCORPORAT / SUBDOCUMENT:
    autor: {
        type: schemaAutor,
        required: true
    }
}));







// ==============================================================
// (3.1) FUNC. ASINCRONE 'CREARECURS()' 
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
// (3.2) FUNC. ASINCRONE 'LISTACURSURI()' 
//       (PT. CITIREA 'DOCUMENTELOR' IN 'MONGODB')
// ==============================================================
async function listaCursuri() {
    const cursuri = await Curs
        // MET. FIND - PRELUAREA 'CURSURILOR'  
        .find();


    // AFISARE 'CURSURI':
    console.log(cursuri);
}







// ==============================================================
// (3.3) FUNC. ASINCRONE 'UPGRADAREAUTOR()' 
//       (PT. UPGRADAREA 'DOCUMENTELOR' IN 'MONGODB')
// ==============================================================
async function upgradareAutor(idCurs) {
    // GASIREA 'CURSULUI' DUPA 'ID':
    // const curs = await Curs.findById(idCurs);

    // UPGRADAREA DIRECTA A 'OBIECTULUI DE INTEROGARE'
    const curs = await Curs.update({ _id: idCurs }, {
        // OPERATORUL '$SET':
        // $set: {
        //     // UPGRADAREA 'NUMELUI AUTORULUI' UNUI 'CURS':
        //     'autor.nume': 'Jeanine Alexandra'
        // }

        // STERGEREA 'SUBDOCUMENTULUI' - PRIN OPERATORUL '$UNSET'
        $unset: {
            // UPGRADAREA 'NUMELUI AUTORULUI' UNUI 'CURS':
            // 'autor.nume': ''
            'autor': ''
        }
    });

    // MODIFICAM 'NUMELE  AUTORULUI':
    // curs.autor.nume = 'Marius Chivu';

    // SALVAM IN 'CURS':
    // curs.save();
}



// ==============================================================
// (4.1) APELARE FUNC. PT. 'CREARE CURS' 
// ==============================================================
// creareCurs('Curs Node', new Autor({ nume: 'Marius' }));



// ==============================================================
// (4.2) APELARE FUNC. 'UPGRADAREAUTOR('ID')' 
// ==============================================================
upgradareAutor('6137294c1853c624783b0bd8');