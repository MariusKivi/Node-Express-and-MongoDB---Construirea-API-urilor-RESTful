/*
    RESTAURAM DEPENDENTELE PROIECTULUI
        => RULAM COMANDA IN TERMINAL(IN PROIECT):
    _________________________________________________________

        npm i
    _________________________________________________________
            >> SE VOR RESTAURA TOATE  DEPENDENTELE
*/



// INCARCARI (IMPORTURI):
const mongoose = require('mongoose');
const genuri = require('./routes/genuri');



// ____________________________________________________________________________
// CONECTAREA  LA  'BAZA DE DATE' - 'MONGODB':
mongoose.connect('mongodb://localhost/video-rent')
    // 'PROMISIUNEA' - IN 'CAZ DE SUCCES':
    .then(() => console.log('Conectat cu succes la Baza de Date MongoDB'))
    // 'PROMISIUNEA' - IN 'CAZ DE EROARE':
    .catch(err => console.error('Nu s-a putut conecta la MongoDB.'));



// ____________________________________________________________________________
// IMPORTAREA MODULULUI 'EXPRESS'
const express = require('express');



// ____________________________________________________________________________
// OBIECTUL 'APP' - APELAREA FUNC. 'EXPRESS()'
const app = express();





// ____________________________________________________________________________
// UTILIZARE
app.use(express.json());
app.use('/api/genuri', genuri);



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