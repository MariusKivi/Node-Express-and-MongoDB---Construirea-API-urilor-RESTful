/*
    <> 'PROMISIUNIILE' AU 2 METODE:
            (1) MET. 'THEN()' => PT. A 'PRELUA  UN  REZULTAT' AL UNEI OP. 'ASINCRON' 
            (2) MET. 'CATCH()' => PT. 'PRINDEREA  ERORILOR' 
           
            
            
    ____________________________________________________________________
    <> 'Colectia 'in 'MongoDB' = 'Tabelul' din 'RDBMS'
    
    ____________________________________________________________________
    <> 'Documentul' in 'MongoDB' = 'Randul' din 'RDBMS'
    
    ____________________________________________________________________
    <> 'Documentul':
    => este un 'Container' de "Perechi 'Cheie':'Valoare'"
        
    ____________________________________________________________________
    <> Pachetul 'Mongopse' contine 'Schema':
    => pe care o utilizam 
    => pt. a Defini 'Forma Documentului (Randului)'
    => dintr-o 'Colectie' ('Tabel') - 'MongoDB'
    => adica 'Proprietatile' existente in 'Document'
    
    ____________________________________________________________________
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
    
    
    ____________________________________________________________________
    Opreatorii ($) 'Logici' din 'MongoDB':
    
        (1) 'or' = 'sau' 
        (2) 'and' = 'si' 
    
    
    
    ____________________________________________________________________
    <> Sintaxa 'Expresiei Regulate':	
        /caractere/
    
    
    ____________________________________________________________________
    <> Un 'Sir' care 'Incepe' cu Anumite Sir
        => se specifica prin Caracterul '/^/' 
            /^sir/

    ____________________________________________________________________
    <> Un 'Sir' care se 'Termina' cu Anumit Sir
        => se specifica prin Caracterul '/$/' 
            /sir$/
    
    
    ____________________________________________________________________
    <> 'Sirurile' in 'MongoDB' 
    => sunt 'Case Sensitive'.
    
    
    ____________________________________________________________________
    <> Transformarea 'Sirurilor' din 'MongoDB' 
        => in 'Case Insensitive'
        => se specifica prin Caracterul '/sir/i':
            /sir/i


    <> Un 'Sir' plasat in 'Interiorul' unui Alt Sir
	    => se specifica prin Caracterul '.*sir.*'


    <> Caracterele '.*' intr-o 'Expresie Regulata'
        => specifica ca Putem Avea '0 sau Mai Multe Caractere'
        => 'Inaintea Sirului' sau 'Dupa Sirul' dat.


   <> Exista 2 Cai de 'Upgradare' a unui 'Document' in 'MongoDB':
        (1) 'Query First' ('Interogarea Intai'):
                => Gasirea 'Documentului' dupa 'Id': 'findById()'
                => Modificarea si Upgradarea 'Proprietatilor Documentului'
                => Apelarea Metodei 'save()' pt Upgradarea in Baza de Date


       (2) 'Update First' ('Upgradareaa Intai'):
	            => Upgradarea 'Directa' prin Metoda 'update()'
	            => Optional: se poate 'Prelua Upgradare'.


        <> Operatori de Upgradare in Mongodb
	        https://docs.mongodb.com/manual/reference/operator/update/
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
        autor: 'Marius',
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

    // CONSTANTE:
    // IN  REALITATE FUNCTIONEAZA ASA:  /api/cursuri?numarPagina=3&simensiunePagina=10
    const numarPagina = 2;
    const dimensiunePagina = 10;


    // METODA 'FIND(FILTRU)' -> RETURNEAZA OBIECTUL 'DOCUMENT QUERY' (CARE ESTE CA O 'PROMISIUNE'):
    // PRELUAREA 'TUTUROR DOCUMENTELOR' DIN BAZA DE DATE:
    const cursuri = await Curs
        // ________________________________________
        // (1) PRELUAREA 'TUTUROR CURSURILOR' cu 
        // 'AUTORUL' CU NUMELE 'MARIUS' &
        // CU VALOAREA 'ESTE PUBLICAT' = 'ACTIVA': 
        .find({ autor: 'Marius', estePublicat: true })
        // ________________________________________
        //   EXPRESII REGULATE  IN  JS
        // ________________________________________
        // (1) PRELUAREA 'CURSURILOR' IN CARE
        // NUMELE 'AUTOR' INCEPE (^) CU SIRUL 'MARIUS'
        // (IN CARE TRECEM UN 'OBIECT'
        //  IAR IN LOCUL 'STRING'-ULUI
        //  TRECEM O 'EXPRESIE REGULARA'):
        // .find({ autor: /^Marius/ })
        // ________________________________________
        // (2.1) PRELUAREA 'CURSURILOR' IN CARE
        // NUMELE 'AUTOR' SE TERMINA (/$/) CU SIRUL 'CHIVU'
        // .find({ autor: /Chivu$/ })
        // ________________________________________
        // (2.2) TRANSFORMAREA SIRULUI IN 'CASE INSENSITIVE' PRIN '/SIR/i' 
        // IN PRELUAREA 'CURSURILOR' IN CARE
        // NUMELE 'AUTOR' SE TERMINA (/$/) CU SIRUL 'CHIVU'
        // .find({ autor: /Chivu$/i })
        // ________________________________________
        // (3) PRELUAREA 'CURSURILOR' IN CARE
        // NUMELE 'AUTOR' CONTINE (/.*sir.*/) SIRUL 'MARIUS'
        // TRANSFORMAT IN 'CASE INSENSITIVE' (/SIR/i):
        // .find({ autor: /.*Marius.*/i })
        // ________________________________________
        //   OPERATORII DE 'COMPARATIE'
        // ________________________________________
        // (1) PRELUAREA 'TUTUROR CURSURILOR' CE AU 
        // 'PRETUL' MAI MARE SAU EGAL CU '40 LEI' 
        // & 'MAI MIC SAU EGAL CU 80 LEI'
        // UTILIZAM 'OBIECTUL' PT. 'FILTRARE':
        // .find({ pret: { $gte: 40, $lte: 80 } })
        // ________________________________________
        // (2) PRELUAREA 'TUTUROR CURSURILOR' CE AU 'PRETUL' DE
        // '40 LEI' SAU
        // '60 LEI' SAU
        // '80 LEI':
        // .find({ pret: { $in: [40, 60, 80] } })
        // ________________________________________
        // OPERATORII 'LOGICI'
        // ________________________________________
        // .find()
        // UTIL. 'MATRICEI' CU '2 OBIECTE' SI CU 'FILTRARE':
        // .or([{ autor: 'Marius' }, { estePublicat: true }])
        // UTIL. 'MATRICEI' CU 'OBIECTE FILTRATE':
        // .and([])
        // ________________________________________
        // CREAREA 'PAGINARI' PRIN MET. 'SKIP()':
        .skip((numarPagina - 1) * dimensiunePagina)
        // OBTINEM 'PAGINA DOCUMENTULUI':
        .limit(dimensiunePagina)
        // ________________________________________
        // .limit(10)
        .sort({ nume: 1 })
        // .select({ nume: 1, tags: 1 });
        // ________________________________________
        // PRELUAREA 'NR. DE  DOCUMENTE'
        // PRIN MET. 'COUNT()'
        .count();

    // AFISARE:
    console.log(cursuri);
}


// (6.2) APELAREA FUNCTIEI:
// getCursuri();







// ==============================================================
// (7.1) UPGRADAREA 'DOCUMENTULUI' DIN 'MONGODB' -- UTIL. 'QUERY  FIRST'
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
// (7.2.1) UPGRADAREA 'DOCUMENTULUI' DIN 'MONGODB' -- UTIL. 'UPDATE  FIRST'
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
// (7.2.2) UPGRADAREA 'DOCUMENTULUI' DIN 'MONGODB' -- UTIL. 'UPDATE  FIRST'
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
// (7.2.3) UPGRADAREA 'DOCUMENTULUI' DIN 'MONGODB' -- UTIL. 'UPDATE  FIRST'
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



// (7.3) APELAREA FUNCTIEI:
upgradareCurs('6112885abaeb0649f0100743');







// ==============================================================
// (8.1) STERGEREA ' 1 DOCUMENT' DIN 'MONGODB' 
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
// (8.2) STERGEREA ' 1 DOCUMENT' DIN 'MONGODB' 
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
// (8.3) STERGEREA ' 1 DOCUMENT' DIN 'MONGODB' 
// PRIN FUNC. ASINCRONE 'STERGERECURS()' & MET. 'DELETEONE()'
// & MET. 'FINDBYIDANDREMOVE()' & AFISAREA 'DOC. STERS':
// ==============================================================
async function stergereCurs(id) {

    // AFISAREA 'DOCUNEBTULUI STERS':
    const curs = await Curs.findByIdAndRemove(id);

    // AFISARE:
    console.log(curs);
}

// (8.4) APELAREA FUNCTIEI:
stergereCurs('6113e871be6e024548aa43a9');