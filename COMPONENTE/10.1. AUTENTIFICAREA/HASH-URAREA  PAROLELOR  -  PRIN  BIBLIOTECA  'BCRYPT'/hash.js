// IMPORTAREA BIBLIOTECI 'BCRYPT':
const bcrypt = require('bcrypt');


// FUNCT. ASINCRON 'RUN()':
async function run() {

    // MET. ASINCRON 'GENSALT(NR_CARACTERE, CALLBACK_FUNC)' SAU 'PROMISIUNE'
    // (STRING RENDOM - ADAUGAT INAINTE / DUPA PAROLA):
    const salt = await bcrypt.genSalt(10);

    // MET. 'HASH('PAROLA', SALT, CALLBACK)' SAu 'PROMISIUNE'  PT HASURAREA PAROLEI:
    const hashed = await bcrypt.hash('1234', salt);

    // AFISARE 'SALT' IN CONSOLA:
    console.log(salt);

    // AFISARE 'HASHED' IN CONSOLA:
    console.log(hashed);
}


// APELAREA FUNCTIEI:
run();