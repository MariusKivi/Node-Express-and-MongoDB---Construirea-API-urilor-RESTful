/*
     <> Validarea aceasta este Inteleasa doar de 'Mongoose'

     
     <> Stim ca in Bazele de Date Relationale 
	        => Validarea poate fi facuta in Baza de Date
	        => prin Birarea Keyword-ului 'required'


	<> Avem 2 Tipuri de Validare:
		        (1) Validarea 'Mongoose'

		        (2) Validarea 'Joi'

 	        => Ambele pot fi Utilizate, intrucat se Completeaza Reciproc.

    

    _____________________________________________________________________
    <> Pt. 'String' avem 3 Proprietati Aditionale pe care le putem utiliza:
            (1) 'lowercase' => prin care Mongoose Converteste Valoarea Proprietatii in 'Litere Mici';
            (2) 'uppercase' => pt. Convertirea in 'Litere Mari'
            (3) 'trim'=> pentru 'Eliminarea Spatiilor' din 'Sirul de Caractere'



    <> Pt. 'Orice Tip de Date' avem Proprietatile:
            (1) 'get' => este Apelat -> pt. Citirea Valoarei unei Proprietati
            (2) 'set' => este Apelat -> pt. Setarea Valoarei unei Proprietati
    _____________________________________________________________________
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

    // VALIDATOARELE: 'REQUIRED', 'MINLENGTH' & 'MAXLENGTH' & 'MATCH':
    nume: {
        type: String,

        // VALIDATOARE 'BUILT-IN'
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /expresie_regulara/
    },

    // VALIDATORUL 'ENUM' & 'REQUIRED':
    categorie: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'retea'],
        lowercase: true,
        // uppercase: true,
        trim: true
    },

    autor: String,

    tags: {
        type: Array,

        // PROP. - VALIDATOR PERSONALIZAT:
        validate: {

            // ACTIVAREA 'ASINCRONIZARI':
            isAsync: true,

            validator: function(valoare, callback) {

                // IMPLEMENTAREA 'VALIDATATORULUI ASINCRON'
                // PRIN FUNC. 'SETTIMEOUT()':
                setTimeout(() => {
                    // LOGICA - VALIDARII PERSONALIZATE:
                    const rezultat = valoare && valoare.length > 0;
                    // APELAREA FUNC.:
                    callback(rezultat);
                }, 4000);

            },
            message: 'Un curs trebuie sa aiba cel putin un tag.'
        }
    },

    data: { type: Date, default: Date.now },
    estePublicat: Boolean,

    // VALIDATORUL 'REQUIRED' & 'MIN' & 'MAX':
    pret: {
        type: Number,

        // SETARE 'REQUIRED' PT. O FUNC. CE RETURNEAZA VALOARE 'BOOLEAN'-A:
        required: function() {
            // NU PUTEM UTILIZA FUNC. 'SAGEATA'
            // (PT. CA ACEASTA NU ARE KEYWORD-UL 'THIS')
            return this.estePublicat;
        },

        // VALIDARE NUMERICA:
        min: 40,
        max: 800,

        get: valoare => Math.round(valoare),
        set: valoare => Math.round(valoare)
    }
});


// ==============================================================
// (3) CREAREA 'MODELULUI' PRIN COMPILAREA 'SCHEMEI'  
// CE OFERA CLASA 'CURS'
// MET. 'MODEL(COLECTIA, SCHENA_CE_DEF_FORMA_DOC_COLECTIEI)' A OBIECTULUI 'MONGOOSE'
const Curs = mongoose.model('Curs', schemaCurs);




// ==============================================================
// (4.1) CREAREA 'DOCUMENTELOR' IN BAZA DE DATE 'MONGODB'
// PRIN FUNC. ASINCRONE 'CREARECURS()' 
// ==============================================================
async function creareCurs() {

    // (A) CREAREA OBIECTULUI 'CURS' (INSTANTA A CLASEI):
    const curs = new Curs({
        nume: 'Curs Angular',
        categorie: ' web ',
        autor: 'Marius',
        tags: ['frontend'],
        estePublicat: true,
        pret: 60.8
    });


    // GESTIONAREA 'ERORILOR':
    try {

        // MET. DE VALIDARE 'VALIDATE()'
        // (RETURNEAZA O 'PROMISIUNE AWAIT'):
        // await curs.validate();


        // (B) SALVAREA OBIECTULUI 'CURS' IN 'BAZA DE DATE'
        // PRIN MET. 'SAVE()' -> CARE  RETURNEAZA O 'PROMISIUNE':
        // 'OPERATII  ASINCRONE & ASTEPTARE'
        const rezultat = await curs.save();


        // (4.2) AFISARE  'REZULTAT':
        console.log(rezultat);

    } catch (except) {
        // ITERAREA PRIN TOATE PROPRIETATILE OBIECTULUI 'EROARE'
        // PT. A OBTINE 'DETALII DESPRE 'ERORILE DE VALIDARE':
        for (camp in except.errors)
            console.log(except.errors[camp].message);
    }
}


// (4.2) APELAREA FUNCTIEI:
// creareCurs();





// ==============================================================
// (5.1) PRELUAREA 'DOCUMENTELOR' DIN BAZA DE DATE 'MONGODB'
// PRIN FUNC. ASINCRONE 'GETCURSURI()' 
// ==============================================================
async function getCursuri() {

    // CONSTANTE:
    // IN  REALITATE FUNCTIONEAZA ASA:  /api/cursuri?numarPagina=3&simensiunePagina=10
    const numarPagina = 2;
    const dimensiunePagina = 10;


    // METODA 'FIND(FILTRU)' -> RETURNEAZA OBIECTUL 'DOCUMENT QUERY' (CARE ESTE CA O 'PROMISIUNE'):
    // PRELUAREA 'TUTUROR DOCUMENTELOR' DIN BAZA DE DATE:
    const cursuri = await Curs
        // ________________________________________
        // (1) PRELUAREA 'CURSULUI' DUPA '_UD':       
        .find({ _id: '611dfe15e539253874d1bb88' })
        // ________________________________________
        // CREAREA 'PAGINARI' PRIN MET. 'SKIP()':
        // .skip((numarPagina - 1) * dimensiunePagina)
        // ________________________________________
        // OBTINEM 'PAGINA DOCUMENTULUI':
        // .limit(dimensiunePagina)
        // ________________________________________
        .sort({ nume: 1 })
        // ________________________________________
        // PRELUAREA 'PROPRIETATILOR'
        .select({ nume: 1, tags: 1, pret: 1 });


    // AFISARE 'PRET' PT. CURSUL 14:
    console.log(cursuri[0].pret);
}


// (5.2) APELAREA FUNCTIEI:
getCursuri();







// ==============================================================
// (6.1) UPGRADAREA 'DOCUMENTULUI' DIN 'MONGODB' -- UTIL. 'QUERY  FIRST'
// PRIN FUNC. ASINCRONE 'UPGRADARECURS()' 
// ==============================================================
// async function upgradareCurs(id) {
//     // --------------------------------------------------------
//     // (PAS-1) GASIREA 'DOUMENTULUI' DUPA 'ID': 'FINDBYID()'
//     //         (RETURNEAZA O 'PROMISIUNE')
//     const curs = await Curs.findById(id);

//     // VERIFICAM - DACA 'NU EXISTA CURS':
//     if (!curs) return;


//     // --------------------------------------------------------
//     // (PAS-2) MODIFICAREA & UPGRADAREA'PROPRIETATILOR DOCUMENTULUI'
//     curs.estePublicat = true;
//     curs.autor = 'Alt Autor';
//     // curs.set({
//     //     estePublicat: true,
//     //     autor: 'Alt Autor'
//     // });


//     // --------------------------------------------------------
//     // (PAS-3) APELAREA MET. 'SAVE()' PT. 'UPGRADAREA' IN 'BAZA DE DATE'
//     //         (RETURNEAZA O 'PROMISIUNE')
//     const rezultat = await curs.save();

//     // AFISARE IN CONSOLA:
//     console.log(rezultat);
// }




// ==============================================================
// (6.2.1) UPGRADAREA 'DOCUMENTULUI' DIN 'MONGODB' -- UTIL. 'UPDATE  FIRST'
// PRIN FUNC. ASINCRONE 'UPGRADARECURS()' 
// ==============================================================
// async function upgradareCurs(id) {

//     // UPG. DIRECTA PRIN METODA 'UPGRADE(ARG_ID, OBIECT_UPGRADAT)':
//     const rezultat = await Curs.update({ _id: id }, {
//         // OPERATORII MONGODB DE 'UPDATE' ($nume):
//         // OP. MONGODB $SET()'':
//         $set: {
//             autor: 'Marius',
//             estePublicat: false
//         }
//     });


//     // AFISARE IN CONSOLA:
//     console.log(rezultat);
// }


// ==============================================================
// (6.2.2) UPGRADAREA 'DOCUMENTULUI' DIN 'MONGODB' -- UTIL. 'UPDATE  FIRST'
// AFISAREA 'OBIECTULUI NEUPGRADAT'
// PRIN FUNC. ASINCRONE 'UPGRADARECURS()' - MET. 'FIBDBYIDANDUPDATE()'
// ==============================================================
// async function upgradareCurs(id) {

//     // GASIREA DOC. UPG. & UPGRADARE DIRECTA PRIN METODA 'UPGRADE(ARG_ID, OBIECT_UPGRADAT)':
//     const curs = await Curs.findByIdAndUpdate(id, {
//         // OPERATORII MONGODB DE 'UPDATE' ($nume):
//         // OP. MONGODB $SET()'':
//         $set: {
//             autor: 'Nicholas',
//             estePublicat: true
//         }
//     });


//     // AFISARE IN CONSOLA:
//     console.log(curs);
// }






// ==============================================================
// (6.2.3) UPGRADAREA 'DOCUMENTULUI' DIN 'MONGODB' -- UTIL. 'UPDATE  FIRST'
// AFISAREA 'OBIECTULUI UPGRADAT'
// PRIN FUNC. ASINCRONE 'UPGRADARECURS()' - MET. 'FIBDBYIDANDUPDATE()'
// ==============================================================
async function upgradareCurs(id) {

    // GASIREA DOC. UPG. & UPGRADARE DIRECTA PRIN METODA 'UPGRADE(ARG_ID, OBIECT_UPGRADAT)'
    // ARISAREA 'OB. UPGRADAT' IN TERMINAL:
    const curs = await Curs.findByIdAndUpdate(id, {
        // OPERATORII MONGODB DE 'UPDATE' ($nume):
        // OP. MONGODB $SET()'':
        $set: {
            autor: 'Jeanine',
            estePublicat: false
        }

        // ADAUGAM 'ARGUMENTUL 2' - PT. AFISAREA 'OBIECTULUI UPGRADAT'
    }, { new: true });


    // AFISARE IN CONSOLA:
    console.log(curs);
}



// (6.3) APELAREA FUNCTIEI:
// upgradareCurs('6112885abaeb0649f0100743');







// ==============================================================
// (7.1) STERGEREA ' 1 DOCUMENT' DIN 'MONGODB' 
// PRIN FUNC. ASINCRONE 'STERGERECURS()' & MET. 'DELETEONE()'
// & MET. 'DELETEONE()':
// ==============================================================
// async function stergereCurs(id) {
//     // MET. 'DELETEONE(OBIECT_QUERY)' 
//     // (RETURNEAZA O 'PROMISIUNE')
//     const rezultat = await Curs.deleteOne({ _id: id });

//     // AFISARE:
//     console.log(rezultat);
// }



// ==============================================================
// (7.2) STERGEREA ' 1 DOCUMENT' DIN 'MONGODB' 
// PRIN FUNC. ASINCRONE 'STERGERECURS()' & MET. 'DELETEONE()'
// & MET. 'DELETEMANY()' & AFISAREA 'DOC. STERS':
// ==============================================================
// async function stergereCurs(id) {

//     // MET. 'DELETEMANY(OBIECT_QUERY)' 
//     // (RETURNEAZA O 'PROMISIUNE')
//     const rezultat = await Curs.deleteMany({ _id: id });


//     // AFISARE:
//     console.log(rezultat);
// }






// ==============================================================
// (7.3) STERGEREA ' 1 DOCUMENT' DIN 'MONGODB' 
// PRIN FUNC. ASINCRONE 'STERGERECURS()' & MET. 'DELETEONE()'
// & MET. 'FINDBYIDANDREMOVE()' & AFISAREA 'DOC. STERS':
// ==============================================================
async function stergereCurs(id) {

    // AFISAREA 'DOCUNEBTULUI STERS':
    const curs = await Curs.findByIdAndRemove(id);

    // AFISARE:
    console.log(curs);
}

// (7.4) APELAREA FUNCTIEI:
// stergereCurs('6113e871be6e024548aa43a9');