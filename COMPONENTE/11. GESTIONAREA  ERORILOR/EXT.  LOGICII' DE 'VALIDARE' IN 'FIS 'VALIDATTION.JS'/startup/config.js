// (IMP-9) IMPORTAREA  MODULULUI 'CONFIG':
const config = require('config');





// EXPORTAM FUNCTIA ANONIMA:
module.exports = function() {

    // CONDITIE:
    if (!config.get('cheiaPrivataJWT')) {

        // AFISAREA 'ERORI':
        // console.error('EROARE FATALA: cheiaPrivataJWT nu este definita.');

        // ARUNCAM O EXCEPTIE:
        throw new Error('EROARE FATALA: cheiaPrivataJWT nu este definita.');

        // IESIREA DIN OBIECTUL GLOBAL - 'PROCESS'
        // MET. 'EXIT(0 = SUCCES, ALT_NR = ESEC)':
        // process.exit(1);
    }
}