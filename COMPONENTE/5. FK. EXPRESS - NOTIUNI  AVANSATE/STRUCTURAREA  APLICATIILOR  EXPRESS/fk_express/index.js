/*____________________________________________________________________________
    EXPRESS JS.COM -- Node.js Web Application Framework:
    https://expressjs.com/

    API REFERENCES (VEZI 'METODE' & 'PROPRIETATI'):
    https://expressjs.com/en/5x/api.html
____________________________________________________________________________*/


// ============================================================================
//          (I) INCARI (IMPORTARI)
// ============================================================================
// ____________________________________________________________________________
// (IMP-10) IMPORTAREA PACHETULUI 'DEBUG'  (PT. 'DEPANAREA  APLICATIEI')
// ____________________________________________________________________________
// (DEP.1) DEPANAREA 'LA PORNIURE':
// const depanareLaPornire = require('debug')('app:pornire');
const debug = require('debug')('app:debug');

// (DEP.2) 'MESAJE DE DEPANARE' -> LEGATE DE 'BAZA DE DATE'
// const depanareDB = require('debug')('app:DB');


// (IMP-9) IMPORTAREA MODULULUI 'CONFIG'  (PT. 'MG. CONFIGURARII APLICATIEI')
const config = require('config');

// (IMP-8) IMPORTAREA MIDLEWARE-ULUI 'MORGAN'  (PT. INREG. 'REQ. HTTP')
const morgan = require('morgan');

// ____________________________________________________________________________
// (IMP-7) IMPORTAREA MIDLEWARE-ULUI 'HELMET'  (PT. SETAREA 'HTTP HEARERS')
const helmet = require('helmet');

// ____________________________________________________________________________
// (IMP-6) IMPORTAREA PACHETULUI 'JOI'  (PT. 'VALIDAREA INPUT'-URILOR)
const Joi = require('joi');

// ____________________________________________________________________________
// (IMP-5) IMPORTARE FISIER 'MIDDLEWARE/INREGISTRARE.JS' 
const inregistrare = require('./middleware/inregistrare');

// ____________________________________________________________________________
// (IMP-4) IMPORTARE FISIER 'AUTENTIFICARE.JS' 
// const autentificare = require('./middleware/autentificare');

// ____________________________________________________________________________
// (IMP-3.2) IMPORTAREA FISIERULUI 'ROUTE/CURSURI.JS'
const cursuri = require('./routes/cursuri');

// ____________________________________________________________________________
// (IMP-3.1) IMPORTAREA FISIERULUI 'ROUTE/ACASA.JS'
const acasa = require('./routes/acasa');

// ____________________________________________________________________________
// (IMP-1) IMPORTAREA MODULULUI 'EXPRESS'
const express = require('express');
// const { urlencoded } = require('express');

// ____________________________________________________________________________
// (IMP-3) OBIECTUL 'APP' - APELAREA FUNC. 'EXPRESS()'
const app = express();
// ============================================================================







// ============================================================================
//           (II) SETAREA & INCARCAREA
// ============================================================================
// ____________________________________________________________________________
// (SET-1) SETAREA 'TEMPLATE/VIEW  ENGINE' PT. 'APLICATIE'
// ____________________________________________________________________________
// METODA 'SET('NUME_PROP', 'NUMELE_tEMPLATE_ENGINE')'
// (>> EXPRES VA 'INCARCA INTERN' MODULUL 'PUG' & NU TREBUIE 'IMPORTAT' PRIN'REQUIRE')
app.set('view engine', 'pug');


// ____________________________________________________________________________
// (SET-2) SETARE PT. 'SUPRASCRIEREA' TRECERI CATRE UN 'TEMPLATE' PT. 'APLICATIE'
// ____________________________________________________________________________
// METODA 'SET('NUME_PROP', 'VALOAREA_ESTE_LOCUL_IN_CARE_STOCAM_TEMPLETE-UL')'
app.set('views', './views');
// ============================================================================







// ============================================================================
// ACTIVAREA 'HTTP REQUEST' PT. 'INREGISTRAREA' IN 'MEDIUL  DE  DEZVOLTARE'
//  PRIN VARIABILA  GLOBALAa 'NODE_ENV'
//  DACA NU ESTE 'SETATA' = RASPUNSUL VA FI 'UNDEFINE'
// ============================================================================
// DEFINIM 'TEMPLATE STRING' (PRIN CARACTERUL 'BACKTICK')
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);


// ============================================================================
// ACTIVAREA 'HTTP REQUEST' PT. 'INREGISTRAREA' IN 'MEDIUL  DE  DEZVOLTARE'
// PRIN  METODA  OBIECTULUI  'APP.GET()'
// DACA VARIABILA 'ENV' NU ESTE 'SETATA' = VA RETURNA IMPLICIT 'MEDIUL DE DEVELOPMENT'
// ============================================================================
// DEFINIM 'TEMPLATE STRING' (PRIN CARACTERUL 'BACKTICK')
// console.log(`app: ${app.get('env')}`);







// ============================================================================
//           (III) UTILIZARI (APELARI)
// ============================================================================
// ____________________________________________________________________________
// (USE-1) ACTIVARE 'PARSAREA' OBIECTULUI 'JSON' PT. CORPUL 'REQUEST'-ULUI  [IMPLICIT = 'DEZACTIVAT']:
app.use(express.json());

// ____________________________________________________________________________
//  (USE-2) FUNCTIA 'MIDDLEWARE BUILT-IN' - 'EXPRESS.URLENCODED()':
app.use(express.urlencoded({ extend: true }));

// ____________________________________________________________________________
//  (USE-3) FUNCTIA 'MIDDLEWARE BUILT-IN' - 'EXPRESS.STATIC('NUME_FOLDER')'
//  (IN FOLDERUL 'PUBLIC' PLASAM ASSET-URILE  STATICE 'CSS', 'IMG'):
app.use(express.static('public'));

// ____________________________________________________________________________
//  (USE-4) APELAREA 'MIDDLEWARE'-ULUI (BUILT-IN) - 'HELMET'
app.use(helmet());


// ____________________________________________________________________________
//  (USE-5) UTILIZAREA FISIERULUI 'CURSURI.JS' PT. ORCE  PATH '/API/CURSURI'
app.use('/api/cursuri', cursuri);


// ____________________________________________________________________________
//  (USE-6) UTILIZAREA FISIERULUI 'ACASA.JS' PT. ORCE  PATH '/'
app.use('/', acasa);


// ____________________________________________________________________________
//   CONFIGURARE
// ____________________________________________________________________________
// (CFG-1) AFISARE - MET. 'CONGIG.GET('NUMELE_PROP_DE_CONFIG')':
console.log('Nume Aplicatie: ' + config.get('nume'));
console.log('Server de Mail: ' + config.get('mail.host'));
console.log('Parola de Mail: ' + config.get('mail.parola'));


// ____________________________________________________________________________
// 'ACTIVAREA  MIDDLEWARE-ULUI' -  'MORGAN' PT. 'MEDIUL DE DEZVOLTARE':
// ____________________________________________________________________________
if (app.get('env') === 'development') {

    // ____________________________________________________________________________
    //  (USE-5) UTILIZAREA / APELAREA 'MIDDLEWARE'-ULUI (BUILT-IN) - 'MORGAN('OPT)'
    app.use(morgan('tiny'));

    // AFISARE IN CONSOLA:
    console.log('Morgan Activat...');

    // AFISAREA  PRIN PACHETUL 'DEBUG'
    debug('Morgan Activat...');
}



// ____________________________________________________________________________
//    'FUNCTII  MIDDLEWARE PERSONALIZATE'
// ____________________________________________________________________________
//  (MW-1) CTREARE  FUNCTIE 'MIDDLEWARE PERSONALIZATA' - PT. 'CONECTARE'
// ____________________________________________________________________________
app.use(inregistrare);

// ____________________________________________________________________________
//  (MW-2) CTREARE  FUNCTIE 'MIDDLEWARE PERSONALIZATA' - PT. 'REALIZAREA AUTENTIFICARII'
// ____________________________________________________________________________
// app.use(autentificare);

// ============================================================================








// ============================================================================
// ____________________________________________________________________________
// VARIABILA 'ENVIRONMENT' - 'PORT'  SAu  PORTUL '3000':
// (IN OBIECTUL GLOBAL 'PROCESS', IN PROP. 'ENV')
const port = process.env.PORT || 3000;



// ____________________________________________________________________________
// MET. 'LISTEN(NR_PORT, CALLBACK FUNC*())' 
// ASCULTAREA 'VARIABILEI ENVIRONMENT':
app.listen(port, () => {
    // 'TEMPLATE  STRING' (PRIN UTIL. 'BACKTICK')
    console.log(`Port de Ascultare ${port}...`);
});
// ============================================================================